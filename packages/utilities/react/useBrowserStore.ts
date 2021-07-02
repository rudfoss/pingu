import { useState, useCallback, useMemo } from "react"

/**
 * Use local storage to store a value. Multiple hooks on the same key ARE NOT
 * synchronized.
 * @param key
 * @param defaultValue
 * @returns
 */
export const useBrowserStore = <TValueType>(
	key: string,
	defaultValue: TValueType,
	store: "local" | "session" = "local"
) => {
	const storeApi = useMemo(() => (store === "local" ? window.localStorage : window.sessionStorage), [store])

	const [value, setRawValue] = useState<TValueType>(() => {
		const rawValue = storeApi.getItem(key)
		if (rawValue !== null) {
			return JSON.parse(rawValue)
		}
		return defaultValue
	})

	const setValue = useCallback(
		(newValue: TValueType) => {
			storeApi.setItem(key, JSON.stringify(newValue))
			setRawValue(newValue)
		},
		[key]
	)

	return [value, setValue] as const
}
