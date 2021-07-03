import { createApp } from "createApp"

const start = async () => {
	const app = await createApp()
	await app.listen(3000)
	app.log.info("SPA-Server ready")
}

start().catch((error) => {
	console.error(error.message, error.stack)
	process.exit(1)
})
