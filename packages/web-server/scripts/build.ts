import path from "path"
import { nodeBundleProd } from "@radtools/bundle/src/nodeBundle"

const start = async () => {
	console.log("Building server...")
	await nodeBundleProd({
		paths: {
			entry: path.resolve(__dirname, "../src/index.ts"),
			tsconfig: path.resolve(__dirname, "../tsconfig.json"),
			output: path.resolve(__dirname, "../dist")
		},
		defines: {
			"process.env.APPINSIGHTS_INSTRUMENTATIONKEY": "a117db64-f046-4743-b6e7-456acd24cf33"
		}
	})

	console.log("Done")
	process.exit(0)
}

start().catch((error) => {
	console.error(error.message, error.stack)
	process.exit(1)
})
