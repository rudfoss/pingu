import path from "path"
import { nodeBundleProd, NodeBundleDevOptions } from "@radtools/bundle/src/nodeBundle"
import { ArrayTypes } from "@radtools/utilities/ts"

type SwaggerPattern = ArrayTypes<Required<NodeBundleDevOptions>["copyPluginOptions"]["patterns"]>

const start = async () => {
	const output = path.resolve(__dirname, "../dist")

	const swaggerDir = path.dirname(require.resolve("swagger-ui-dist"))
	const swaggerFiles = [
		"swagger-ui.css",
		"swagger-ui-bundle.js",
		"swagger-ui-standalone-preset.js",
		"favicon-16x16.png",
		"favicon-32x32.png"
	].map(
		(file): SwaggerPattern => ({
			from: path.resolve(swaggerDir, `./${file}`),
			to: path.join(output, "./swagger")
		})
	)

	console.log("Building server...")
	await nodeBundleProd({
		paths: {
			entry: path.resolve(__dirname, "../src/index.ts"),
			tsconfig: path.resolve(__dirname, "../tsconfig.json"),
			output
		},
		defines: {
			"process.env.APPINSIGHTS_INSTRUMENTATIONKEY": "a117db64-f046-4743-b6e7-456acd24cf33"
		},
		copyPluginOptions: {
			patterns: swaggerFiles
		}
	})

	console.log("Done")
	process.exit(0)
}

start().catch((error) => {
	console.error(error.message, error.stack)
	process.exit(1)
})
