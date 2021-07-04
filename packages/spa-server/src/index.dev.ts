import { createApp } from "createApp"
import fastify from "fastify"

const start = async () => {
	const app = fastify({ logger: { level: "info", prettyPrint: true } })
	await createApp(app)
	await app.listen(3000)
	app.log.info("SPA-Server ready")
}

start().catch((error) => {
	console.error(error.message, error.stack)
	process.exit(1)
})
