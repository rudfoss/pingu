import path from "path"
import { getConfig } from "getConfig"

import setupAI from "@radtools/logging/server/setupAI"
setupAI({ instrumentationKey: process.env.APPINSIGHTS_INSTRUMENTATIONKEY })

import express from "express"
import { createHttpServer } from "utilities/node/createHttpServer"
import Logger from "@radtools/logging/server"
import { RegisterRoutes } from "routes/routes"
import swaggerUI from "swagger-ui-express"
import swaggerDocs from "oas/swagger.json"

const start = async () => {
	const app = express()
	const config = getConfig()
	const logger = Logger.createAppLogger(config.appName)

	RegisterRoutes(app)
	app.use("/swagger", swaggerUI.serve, swaggerUI.setup(swaggerDocs))
	app.get("*", (req, res) => res.send({ catchAll: true, path: req.path }))

	await createHttpServer({
		handler: app,
		secure: config.useHTTPS,
		port: config.port
	})
	logger.info("Server running", { config })
}

start().catch((error) => {
	console.error(error, error.message)
	process.exit(1)
})
