const leadingRX = /^\/*(.*)/
const trailingRX = /(.*?)\/*$/
const eitherRX = /^\/*(.*?)\/*$/

/**
 * Concatenates url fragments ensuring there is only ever 1 single / between the segments.
 * Leading / in the first as well as trailing / in the last fragment are preserved.
 * @param fragments The fragments to concatenate
 */
export const concatUrls = (fragments: string[]): string => {
	const ln = fragments.length
	return fragments
		.map((fragment, idx) => fragment.replace(idx === 0 ? trailingRX : idx === ln - 1 ? leadingRX : eitherRX, "$1"))
		.join("/")
}
