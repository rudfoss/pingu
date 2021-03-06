import "../../../scripts/setupEnv"

import path from "path"
import { browserBundleDev } from "@radtools/bundle/src/browserBundle"

const start = async () => {
	console.log("Starting web-client dev server...")
	await browserBundleDev({
		paths: {
			entry: path.resolve(__dirname, "../src/index.tsx"),
			indexHtml: path.resolve(__dirname, "../index.webpack.html"),
			tsconfig: path.resolve(__dirname, "../tsconfig.json"),
			output: path.resolve(__dirname, "../dist")
		},
		defines: {
			"process.env.APPINSIGHTS_INSTRUMENTATIONKEY": JSON.stringify(process.env.APPINSIGHTS_INSTRUMENTATIONKEY)
		}
	})
}

start().catch((error) => {
	console.error(error.message, error.stack)
	process.exit(1)
})
