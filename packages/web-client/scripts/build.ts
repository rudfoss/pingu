import path from "path"
import { browserBundleProd } from "@radtools/bundle/src/browserBundle"

const start = async () => {
	console.log("Bundling web-client for production...")
	await browserBundleProd({
		paths: {
			entry: path.resolve(__dirname, "../src/index.tsx"),
			indexHtml: path.resolve(__dirname, "../src/index.html"),
			tsconfig: path.resolve(__dirname, "../tsconfig.json"),
			output: path.resolve(__dirname, "../dist")
		}
	})
}

start().catch((error) => {
	console.error(error.message, error.stack)
	process.exit(1)
})
