/**
 * Returns a promise that will resolve after the given number of milliseconds with
 * the provided `resolveValue`
 * @param ms
 * @param resolveValue
 */
export const delayPromise = <TResolveValue>(ms: number, resolveValue?: TResolveValue) =>
	new Promise((resolve) => {
		setTimeout(() => {
			resolve(resolveValue)
		}, ms)
	})
