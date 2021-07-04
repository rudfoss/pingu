import { apis } from "api/apis"
import { FastifyInstance } from "fastify"

export const createApp = async (app: FastifyInstance) => {
	app.setErrorHandler(async (err, request, reply) => {
		request.log.error(err)
		reply.status(500)
		return { from: "root", internalError: true, statusCode: 500, message: err.message, name: err.name }
	})

	app.register(apis, { prefix: "/api" })
	app.get("/", async () => ({ hello: "world", now: new Date().toISOString() }))
	app.get("/oops", async () => {
		throw new Error("Ooops error")
	})

	app.get("/*", async () => ({ catchAll: true }))

	return app
}
