/**
 * A small function that if given a unique prefix returns a function that when called generates id
 * strings that are unique for the duration of the app in memory.
 *
 * Format: `"{prefix}{counter}{suffix}"`
 *
 * Note: Reloading the page will reset the generator.
 * @param prefix A prefix string to prepend to every id.
 * @returns
 */
export const createIDGenerator = (prefix: string) => {
	let incrementor = 0
	return (suffix = "") => {
		return `${prefix}${incrementor++}${suffix}`
	}
}
