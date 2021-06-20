import { browserBundleDev } from "@radtools/vitebundle/src/test"

export const start = async () => {
	await browserBundleDev()
}

start().catch((error) => {
	console.error(error.message, error.stack)
	process.exit(1)
})
