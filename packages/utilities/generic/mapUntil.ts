/**
 * Maps each element of the array to a new value until the condition returns false or
 * the end of the array.
 *
 * The condition is evaluated before the iteratee is run so a false condition will
 * not add an item to the resulting array.
 * @param arr The array to map,
 * @param iteratee The function to execute for each item.
 * @param condition The condition function to evaluate for each item.
 */
export const mapUntil = (
	arr: any[],
	iteratee: (value: any, index: number, arr: any[]) => any,
	condition: (value: any, index: number, arr: any[], newArr: any[]) => boolean = () => true
) => {
	const newArr: any[] = []

	for (const [index, value] of arr.entries()) {
		if (!condition(value, index, arr, newArr)) {
			break
		}
		newArr.push(iteratee(value, index, arr))
	}

	return newArr
}
