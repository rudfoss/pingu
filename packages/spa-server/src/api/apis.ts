import { FastifyPluginCallback } from "fastify"
import { buildInfo } from "./buildInfo/buildInfo"
import fastifyCors from "fastify-cors"

export const apis: FastifyPluginCallback = (app, opts, done) => {
	app.register(fastifyCors)

	app.get("/health", async () => ({ ok: true, time: new Date().toISOString() }))
	app.get("/buildInfo", buildInfo)

	done()
}
