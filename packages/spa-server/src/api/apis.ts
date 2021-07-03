import { FastifyPluginCallback } from "fastify"
import { buildInfo } from "./buildInfo/buildInfo"
import fastifyCors from "fastify-cors"

export const apis: FastifyPluginCallback = (app, opts, done) => {
	app.register(fastifyCors)

	app.setErrorHandler(async (err, request, reply) => {
		request.log.error(err)
		reply.status(500)
		return { from: "api", internalError: true, statusCode: 500, message: err.message, name: err.name }
	})

	app.get("/health", async () => ({ ok: true, time: new Date().toISOString() }))
	app.route(buildInfo)
	app.get("/oops", async () => {
		throw new Error("Ooops from API")
	})

	app.get("/*", async () => ({ catchAllAPI: true }))

	done()
}
