import { getConfig } from "getConfig"

import setupAI from "@radtools/logging/server/setupAI"
setupAI({ instrumentationKey: process.env.APPINSIGHTS_INSTRUMENTATIONKEY })

import express from "express"
import { createHttpServer } from "@radtools/utilities/node/createHttpServer"
import Logger from "@radtools/logging/server"
import { spa } from "spa"
import { handle, handleMW } from "Request"

const start = async () => {
	const app = express()
	const config = getConfig()
	const logger = Logger.createAppLogger(config.appName)

	app.set("trust proxy", true) // Trust Azure HTTPS termination proxy
	app.disable("x-powered-by")

	// Setup for all requests
	app.use(
		handleMW((req) => {
			req.log = logger.newRequestLogger()
			req.spaState = {
				foo: 42,
				bar: `Hey there ${'foo"bar'}`
			}
		})
	)

	app.get(
		"/_health",
		handle((req, res) => {
			req.log.info("Health endpoint")
			res.send({ ok: true, time: new Date().toISOString() })
		})
	)

	app.get(
		"/index.html",
		handle((req, res) => {
			req.log.info("Redirect to /")
			res.redirect("/", 302)
		})
	)
	app.use(express.static(config.publicPath, { index: false }))
	app.get("*", await spa({ indexHtmlPath: config.indexHtmlPath, initialState: {} }))

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
