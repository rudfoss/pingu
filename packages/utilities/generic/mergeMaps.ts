/**
 * Merges a map with others of the same type. Mutates the source map.
 *
 * `const mergedMap = mergeMaps(sourceMap)(mapA)(mapB)(mapC).map`
 *
 * @param source
 * @see mergeSets
 */
export const mergeMaps = <TValue, TKeyType = any>(source: Map<TKeyType, TValue> = new Map()) => {
	const adder = (additions: Map<TKeyType, TValue>) => {
		for (const [key, value] of additions.entries()) {
			source.set(key, value)
		}
		return adder
	}
	adder.map = source

	return adder
}
