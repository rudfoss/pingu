/**
 * A key for an entry in the cache.
 */
type CacheKey = string | symbol

export class CacheError<TInnerError extends Error, TData> extends Error {
	public constructor(public innerError: TInnerError, public data: TData) {
		super(innerError.message)
	}
}

export type TimeoutCallback<TData = any> = (opts: {
	key: CacheKey
	data: TData
	cache: MemoryCache
}) => void | Promise<void>

interface CachePutOptions<TData> {
	/**
	 * If true an expired value is not automatically deleted and will result in
	 * cache hits if fetched.
	 */
	keepExpired?: boolean
	/**
	 * The number of milliseconds to keep the entry in cache.
	 */
	lifetime?: number
	/**
	 * An optional function that is called when the entry expires.
	 * Note that the entry is deleted BEFORE this callback is called
	 * (unless keepExpired is true).
	 */
	onExpire?: TimeoutCallback<TData>
}

interface CachePut<TData> extends CachePutOptions<TData> {
	/**
	 * The unique cache key for this entry.
	 */
	key: CacheKey
	/**
	 * The data to cache.
	 */
	data: TData
}

interface CacheEntry<TData = any> {
	key: CacheKey
	data: TData

	options: CachePutOptions<TData> & {
		_expireTimeoutId?: ReturnType<typeof setTimeout>
		_isExpired?: boolean
	}
}

/**
 * A really simple memory cache that supports running a function once a cache
 * entry times out.
 */
export class MemoryCache {
	/**
	 * Contains actual cached data
	 */
	private _store: Map<CacheKey, CacheEntry> = new Map()
	/**
	 * Contains promises for fetching data for specific keys
	 */
	private _fetchStore: Map<CacheKey, Promise<any>> = new Map()

	public get size() {
		return this._store.size
	}
	public get keys() {
		return this._store.keys()
	}

	private _expire(key: CacheKey, triggerOnExpire = true) {
		const entry = this._store.get(key)
		if (!entry) return false
		const { options, data } = entry
		options._isExpired = true
		if (options._expireTimeoutId) {
			clearTimeout(options._expireTimeoutId)
		}
		if (!options.keepExpired) {
			this._store.delete(key)
		}
		if (triggerOnExpire && options.onExpire) {
			options.onExpire({ key, data, cache: this })
		}
		return true
	}

	public get<TData>(key: CacheKey, includeExpired = false) {
		if (!this.has(key, includeExpired)) return undefined
		return this._store.get(key)!.data as TData
	}
	/**
	 * Returns true if the cache contains an entry for the cache key that is not
	 * expired (stale)
	 * @param key
	 * @param includeExpired If true an expired value will also result in true
	 */
	public has(key: CacheKey, includeExpired = false) {
		const has = this._store.has(key)
		if (!has) return false
		const entry = this._store.get(key)!
		return includeExpired ? true : !entry.options._isExpired
	}
	public put<TData>(opts: CachePut<TData>) {
		const { key, data, lifetime, onExpire, keepExpired } = opts
		this._expire(key, false)
		const entry: CacheEntry<TData> = {
			key,
			data,
			options: {
				keepExpired,
				lifetime,
				onExpire
			}
		}
		if (lifetime && lifetime > 0) {
			entry.options._expireTimeoutId = setTimeout(() => this._expire(key), lifetime)
		}

		this._store.set(key, entry)
	}
	/**
	 * Remove a cache entry. Returns true if the entry was present, false if not.
	 * @param key The key to delete.
	 */
	public del(key: CacheKey) {
		return this._expire(key)
	}
	/**
	 * Removes all entries in the cache optionally triggering onExpire
	 * @param triggerOnExpire If true will trigger the onExpire listener for every entry upon clear
	 */
	public clear(triggerOnExpire = false) {
		const keys = Array.from(this.keys) // Ensures that keys added by onExpire handlers are not cleared.
		for (const key of keys) {
			this._expire(key, triggerOnExpire)
		}
	}

	/**
	 * Returns the data requested as soon as it is available. The following flow
	 * is used:
	 * 1. If data is in cache and not expired, return it
	 * 2. If data is in cache and expired, return it, trigger fetch and cache result
	 * 3. If data is not in cache, tirgger fetch return promise for data
	 * 4. If data is not in cache, but fetch triggered, return pending promise
	 *
	 * Exceptions in fetcher are swalloed! Must be logged elsewhere.
	 * @param opts
	 * @param fetcher
	 */
	public async getOrFetch<TData>(opts: Omit<CachePut<TData>, "data">, fetcher: () => TData | Promise<TData>) {
		const { key } = opts
		const entry: CacheEntry<TData> | undefined = this._store.get(opts.key)

		if (entry && !entry.options._isExpired) {
			return entry.data
		}

		// entry may be undefind or expired

		if (this._fetchStore.has(key)) {
			// There is a fetch operation running, return whatever data is fastest
			return entry?.data ?? (this._fetchStore.get(key)! as Promise<TData>)
		}

		const refetchWrapper = async () => {
			try {
				const data = await fetcher()
				this.put({ ...opts, data })
				this._fetchStore.delete(key)
				return data
			} catch (error) {
				this._fetchStore.delete(key)
				throw new CacheError(error, entry?.data)
			}
		}

		const refetchPromise = refetchWrapper()
		this._fetchStore.set(key, refetchPromise)
		return entry?.data ?? refetchPromise
	}
}
