/**
 * Merges a set with any interable of the same type. The source set is mutated.
 * The function returns a recursive adder that takes one iterable and adds it to
 * the original set. `mergeSets(set)(["one", "two"])(["two", "three"]).set`
 * When done call .set to get the resulting set of unique values.
 * @param source
 */
export const mergeSets = <TValue>(source: Set<TValue> = new Set<TValue>()) => {
	const adder = (additions: Iterable<TValue> = []) => {
		for (const addition of additions) {
			source.add(addition)
		}
		return adder
	}
	adder.set = source
	return adder
}
