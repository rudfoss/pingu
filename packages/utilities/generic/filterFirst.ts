/**
 * Identical to `Array.prototype.filter` except that it only filters out the first
 * entry where the filter delegate returns false. All following instances are
 * kept.
 * @param arr
 * @param filter
 * @returns A new array with the first instance filtered out.
 */
export const filterFirst = <T>(arr: T[], filter: (item: T, index: number, originalArray: T[]) => boolean) => {
	const newArr: T[] = []
	let i = 0
	for (const item of arr) {
		if (!filter(item, i, arr)) {
			break
		}
		i++
		newArr.push(item)
	}
	return newArr.concat(arr.slice(i + 1))
}
