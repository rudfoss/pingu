import path from "path"
import fs from "fs-extra"

const swaggerFiles = [
	"swagger-ui.css",
	"swagger-ui-bundle.js",
	"swagger-ui-standalone-preset.js",
	"swagger-ui-init.js",
	"favicon-16x16.png",
	"favicon-32x32.png"
]

const start = async () => {
	const swaggerDir = path.dirname(require.resolve("swagger-ui-dist"))
	const destinationDir = path.resolve(__dirname, "../src/swagger")

	await fs.ensureDir(destinationDir)
	await fs.emptyDir(destinationDir)

	await Promise.all(
		swaggerFiles.map((file) => fs.copyFile(path.resolve(swaggerDir, file), path.resolve(destinationDir, file)))
	)
}

start().catch((error) => {
	console.error(error.message, error.stack)
	process.exit(1)
})
