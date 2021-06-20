const setAddMany =
	<TValue>(set: Set<TValue>) =>
	(valuesToAdd: Iterable<TValue>) => {
		for (const value of valuesToAdd) {
			set.add(value)
		}
	}

export type ValidIndices = string | number | symbol
export type Observer<TValue = any, TKeyType extends ValidIndices = ValidIndices> = (
	changedKeys: Iterable<TKeyType>,
	map: ObservableMap<TValue, TKeyType>
) => void | Promise<void>

/**
 * An observable map is an implementation on top of the regular JavaScript Map
 * that allows observer-functions to be notified once one or more keys in the map
 * change their value or are deleted. It implements the regular Map interface
 * functions which makes it work seamelessly as a normal Map with some additional
 * convenience functions for setting and deleting many keys.
 *
 * Listen for all changes:
```typescript
const map = new ObservableMap()
map.on((changedProps, map) => {console.log(changedProps[0], map.get(changedProps[0]))})
map.set("foo", "bar") // logs "foo bar" from listener
```
 * 
 * Listen for changes on specifc prop:
```typescript
const map = new ObservableMap()
map.on((changedProps, map) => {console.log(changedProps[0], map.get(changedProps[0]))}, ["foo"])
map.set("foobar", "foobar") // Does not log anything
map.set("foo", "bar") // logs "foo bar" from listener
```
 */
export class ObservableMap<TValue = any, TKeyType extends ValidIndices = ValidIndices>
	implements Map<TKeyType, TValue>
{
	private _map = new Map<TKeyType, TValue>()

	private _globalObservers = new Set<Observer<TValue, TKeyType>>()
	private _observersByKey = new Map<TKeyType, Set<Observer<TValue, TKeyType>>>()
	constructor() {
		this.entries = this.entries.bind(this)
	}
	public get size() {
		return this._map.size
	}
	public get [Symbol.iterator]() {
		return this._map[Symbol.iterator]
	}
	public get [Symbol.toStringTag]() {
		return this._map.toString()
	}

	public get(key: TKeyType) {
		return this._map.get(key)
	}
	public getMany(keys: TKeyType[]) {
		return keys.reduce<Record<TKeyType, TValue>>((acc, key) => {
			acc[key] = this.get(key)!
			return acc
		}, {} as any)
	}
	public has(key: TKeyType) {
		return this._map.has(key)
	}
	public getMap<TSubKey extends TKeyType = TKeyType>(keys?: TSubKey[]): Record<TSubKey, TValue> {
		const values: any = {}
		for (const key of keys ?? this._map.keys()) {
			values[key] = this._map.get(key)
		}
		return values
	}

	public keys() {
		return this._map.keys()
	}
	public values() {
		return this._map.values()
	}
	public entries() {
		return this._map.entries()
	}
	public forEach(callbackfn: (value: TValue, key: TKeyType, map: Map<TKeyType, TValue>) => void, thisArg?: any) {
		return this._map.forEach((value, key) => callbackfn(value, key, this), thisArg)
	}

	public set(key: TKeyType, value: TValue, notifyObservers = true) {
		this._map.set(key, value)
		if (notifyObservers) {
			this._notify([key])
		}
		return this
	}
	public setMany(keyValues: Record<TKeyType, TValue>, notifyObservers = true) {
		const keys = Object.keys(keyValues) as TKeyType[]
		for (const key of keys) {
			this.set(key, keyValues[key], false)
		}
		if (notifyObservers && keys.length > 0) {
			this._notify(keys)
		}
	}
	public setManyMap(keyValues: Map<TKeyType, TValue>, notifyObservers = true) {
		const keys = Array.from(keyValues.keys())
		for (const key of keys) {
			this.set(key, keyValues.get(key)!, false)
		}
		if (notifyObservers && keys.length > 0) {
			this._notify(keys)
		}
	}
	public delete(key: TKeyType, notifyObservers = true) {
		const result = this._map.delete(key)
		if (notifyObservers && result) {
			this._notify([key])
		}
		return result
	}
	public deleteMany(keys: Iterable<TKeyType>, notifyObservers = true) {
		const deletedKeys = new Set<TKeyType>()
		for (const key of keys) {
			if (this.delete(key, false)) {
				deletedKeys.add(key)
			}
		}
		if (notifyObservers && deletedKeys.size > 0) {
			this._notify(deletedKeys)
		}
	}
	public deleteAllBut(keys: Iterable<TKeyType>, notifyObservers = true) {
		const keysToConserve = new Set(keys)
		const deletedKeys = new Set<TKeyType>()

		for (const key of this._map.keys()) {
			if (keysToConserve.has(key)) continue
			deletedKeys.add(key)
			this.delete(key, false)
		}

		if (notifyObservers && deletedKeys.size > 0) {
			this._notify(deletedKeys)
		}
	}
	public clear(notifyObservers = true) {
		const keys = new Set(this._map.keys())
		this._map.clear()
		if (notifyObservers && keys.size > 0) {
			this._notify(keys)
		}
	}
	/**
	 * Manually trigger observers on the specified keys.
	 * @param keys
	 */
	public notify(keys?: Iterable<TKeyType>) {
		this._notify(keys ?? this.keys())
	}

	/**
	 * Adds an observer that listens for changes on each key specified. If the key array is empty the
	 * listener will not be registered. If the keys argument is undefined the listener will be registered
	 * for all current and future keys.
	 * @param observer
	 * @param keys The keys to observer. Empty to not observe any, `undefined` to observe all
	 * @returns
	 */
	public on(observer: Observer<TValue, TKeyType>, keys?: TKeyType[]) {
		if (!keys) {
			this._globalObservers.add(observer)
			return observer
		}

		for (const key of keys) {
			const observerList = this._observersByKey.get(key) ?? new Set()
			observerList.add(observer)
			this._observersByKey.set(key, observerList)
		}
		return observer
	}
	public off(observer: Observer<TValue, TKeyType>) {
		this._globalObservers.delete(observer)
		for (const observerList of this._observersByKey.values()) {
			observerList.delete(observer)
		}
		return observer
	}
	public offAll() {
		this._globalObservers.clear()
		this._observersByKey.clear()
	}

	private _notify(keys: Iterable<TKeyType>) {
		const observersToNotify = new Set(this._globalObservers)
		const addObservers = setAddMany(observersToNotify)
		for (const key of keys) {
			addObservers(this._observersByKey.get(key) ?? [])
		}

		for (const observer of observersToNotify) {
			observer(keys, this)
		}
	}
}
