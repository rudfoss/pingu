import path from "path"
import fs from "fs-extra"

import { generateRoutes, generateSpec, ExtendedSpecConfig } from "@tsoa/cli"
import { openAPIConfig } from "../src/openAPIConfig"

const SRC_ROOT = path.resolve(__dirname, "../src")
const entryFile = path.resolve(SRC_ROOT, "index.ts")
const specDir = path.resolve(SRC_ROOT, "./oas")
const routesDir = path.resolve(SRC_ROOT, "./routes")

const start = async () => {
	await Promise.all([fs.emptyDir(specDir), fs.emptyDir(routesDir)])
	await Promise.all([fs.ensureDir(specDir), fs.ensureDir(specDir)])

	const specConfig: ExtendedSpecConfig = {
		...openAPIConfig,

		basePath: "/",
		entryFile,
		specVersion: 3,
		outputDirectory: specDir,
		controllerPathGlobs: [`${SRC_ROOT}/**/*Controller.ts`],
		noImplicitAdditionalProperties: "throw-on-extras"
	}

	await generateSpec(specConfig)

	await generateRoutes({
		basePath: "/",
		entryFile,
		routesDir,
		controllerPathGlobs: specConfig.controllerPathGlobs,
		noImplicitAdditionalProperties: specConfig.noImplicitAdditionalProperties
	})

	process.exit(0)
}

start().catch((error) => {
	console.error(error.message, error.stack)
	process.exit(1)
})
