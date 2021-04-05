import { getConfig } from "getConfig"

import setupAI from "@radtools/logging/server/setupAI"
setupAI({ instrumentationKey: process.env.APPINSIGHTS_INSTRUMENTATIONKEY })

import express from "express"
import { createHttpServer } from "utilities/node/createHttpServer"
import Logger from "@radtools/logging/server"

const start = async () => {
	const app = express()
	const config = getConfig()
	const logger = Logger.createAppLogger(config.appName)

	app.get("/_health", (_, res) => {
		res.send({ ok: true, time: new Date().toISOString() })
	})

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
