/**
 * Returns true if the value is not undefined or null.
 * @param value
 */
const isDefined = (value: any) => value !== undefined && value !== null

/**
 * Returns the first value for which the delegate returns true within the given
 * set of keys.
 * @param obj The object to search
 * @param keys The keys whose values will be checked by the delegate
 * @param finderDelegate A function that checks the value or key for each specified key. Defaults to `isNotEmpty`
 */
export const findValueWithKey = (
	obj: Record<string, any>,
	keys: string[],
	finderDelegate: (value: any, key: string) => boolean = isDefined
) => {
	for (const key of keys) {
		if (finderDelegate(obj[key], key)) return obj[key]
	}
	return undefined
}
