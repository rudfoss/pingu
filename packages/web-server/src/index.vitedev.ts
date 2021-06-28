import path from "path"
import express from "express"
import { createServer as createViteServer } from "vite"
import tsConfigPaths from "vite-tsconfig-paths"
import reactRefresh from "@vitejs/plugin-react-refresh"

const start = async () => {
	const app = express()
	const vite = await createViteServer({
		root: path.resolve(__dirname, "../../web-client"),
		plugins: [reactRefresh(), tsConfigPaths()],
		server: {
			middlewareMode: "html"
		}
	})

	app.use(vite.middlewares as any)

	app.listen(3010, () => {
		console.log("listening")
	})
}

start().catch((error) => {
	console.error(error.message, error.stack)
	process.exit(1)
})
