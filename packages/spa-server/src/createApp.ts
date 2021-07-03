import { apis } from "api/apis"
import fastify from "fastify"

export const createApp = async () => {
	const f = fastify({ logger: true })

	f.register(apis, { prefix: "/api" })
	f.get("/", async () => ({ hello: "world", now: new Date().toISOString() }))

	return f
}
