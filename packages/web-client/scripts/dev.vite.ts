import { browserBundleDev } from "@radtools/bundlevite/src/browserBundle"

const start = async () => {
	console.log("Starting web-client Vite dev server...")
	await browserBundleDev()
}

start().catch((error) => {
	console.error(error.message, error.stack)
	process.exit(1)
})
