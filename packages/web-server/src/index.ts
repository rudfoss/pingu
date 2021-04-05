import { getConfig } from "getConfig"

import setupAI from "@radtools/logging/server/setupAI"
setupAI({ instrumentationKey: process.env.APPINSIGHTS_INSTRUMENTATIONKEY })

import express from "express"
import { createHttpServer } from "utilities/node/createHttpServer"
import Logger from "@radtools/logging/server"
import { spa } from "spa"

const start = async () => {
	const app = express()
	const config = getConfig()
	const logger = Logger.createAppLogger(config.appName)

	app.use((req: any, res, next) => {
		req.spaState = {
			foo: 42,
			bar: `Hey there ${'foo"bar'}`
		}
		next()
	})

	app.get("/_health", (_, res) => {
		res.send({ ok: true, time: new Date().toISOString() })
	})

	app.get("/index.html", (_, res) => res.redirect("/", 302))
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
