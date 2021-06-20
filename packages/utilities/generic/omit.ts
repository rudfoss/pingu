/**
 * Creates a shallow clone of the original object where all keys to omit are removed.
 *
 * Added because `omit` is removed from lodash 5. Ref: https://levelup.gitconnected.com/omit-is-being-removed-in-lodash-5-c1db1de61eaf
 * @param originalObject The original object to omit keys from
 * @param keysToOmit The list of keys to omit, if empty will simply clone the object.
 */
export const omit = <TObj extends Record<string, any>>(originalObject: TObj, keysToOmit: Array<keyof TObj> = []) => {
	const clonedObject = { ...(originalObject ?? {}) }

	for (const key of keysToOmit) {
		delete clonedObject[key]
	}

	return clonedObject
}
