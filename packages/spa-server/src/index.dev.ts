import { createApp } from "createApp"
import fastify from "fastify"

// Typed separately because typing in fastify is outdated
// See https://github.com/pinojs/pino-pretty#options
const prettyPrintOptions: any = {
	singleLine: true
}

const start = async () => {
	const app = fastify({ logger: { level: "info", prettyPrint: prettyPrintOptions } })
	await createApp(app)
	await app.listen(3000)
	app.log.info("SPA-Server ready in Development mode")
}

start().catch((error) => {
	console.error(error.message, error.stack)
	process.exit(1)
})
