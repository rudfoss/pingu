export const prepareDefines = (defines?: Record<string, any>) => {
	if (!defines) return {}
	return Object.keys(defines).reduce<Record<string, any>>((acc, key) => {
		acc[key] = JSON.stringify(defines[key])
		return acc
	}, {})
}
