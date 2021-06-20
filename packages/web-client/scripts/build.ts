import path from "path"
import { browserBundleProd } from "@radtools/bundle/src/browserBundle"

const start = async () => {
	console.log("Bundling web-client for production...")
	await browserBundleProd({
		paths: {
			entry: path.resolve(__dirname, "../src/index.tsx"),
			indexHtml: path.resolve(__dirname, "../index.webpack.html"),
			tsconfig: path.resolve(__dirname, "../tsconfig.json"),
			output: path.resolve(__dirname, "../dist")
		},
		defines: {
			"process.env.APPINSIGHTS_INSTRUMENTATIONKEY": "a117db64-f046-4743-b6e7-456acd24cf33"
		}
	})
}

start().catch((error) => {
	console.error(error.message, error.stack)
	process.exit(1)
})
