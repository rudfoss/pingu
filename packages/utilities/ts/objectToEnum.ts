/**
 * Converts an object with known keys to an object where key = value for easy reference in code.
 *
 * @example
 * ```typescript
 * const obj = {
 * 	alpha: "one",
 * 	bravo: "two",
 * 	charlie: "three"
 * }
 * const enum = objectToEnum(obj)
 * enum.alpha = "alpha" // value is the same as the key
 * ```
 */
export const objectToEnum = <TObj>(obj: TObj): { [key in keyof TObj]: key } => {
	return Object.keys(obj).reduce<any>((acc, key) => {
		acc[key] = key
		return acc
	}, {})
}
