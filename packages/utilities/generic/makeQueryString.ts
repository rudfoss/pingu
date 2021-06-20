/**
 * Combines a url with or without existing query parameters with additional query
 * parameters encoded for a URI (if encode is not defined or true).
 * @param url The base url to combine with, will remain unchanged.
 * @param data The additional data to append.
 */
export const makeQueryString = (url: string, data?: { [key: string]: any }) => {
	if (!data) return url

	const propsAsKeyValues = Object.entries(data).reduce<string[]>((acc, [key, value]) => {
		if (value === undefined) return acc
		const safeName = encodeURIComponent(key)

		let safeValue = value
		if (typeof safeValue === undefined) {
			return acc
		}
		if (typeof safeValue === "object") {
			safeValue = JSON.stringify(safeValue)
		}

		acc.push(`${safeName}=${safeValue}`)
		return acc
	}, [])

	if (url.indexOf("?") >= 0) {
		return `${url}&${propsAsKeyValues.join("&")}`
	}

	return `${url}?${propsAsKeyValues.join("&")}`
}
