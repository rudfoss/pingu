import "../../../scripts/setupEnv"

import path from "path"
import { browserBundleDev } from "@radtools/bundlevite/src/browserBundle"

const start = async () => {
	console.log("Starting web-client Vite dev server...")
	await browserBundleDev({
		root: path.resolve(__dirname, "../"),
		define: {
			"process.env.APPINSIGHTS_INSTRUMENTATIONKEY": JSON.stringify(process.env.APPINSIGHTS_INSTRUMENTATIONKEY)
		}
	})
}

start().catch((error) => {
	console.error(error.message, error.stack)
	process.exit(1)
})
