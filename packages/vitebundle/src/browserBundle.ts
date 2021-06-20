import path from "path"
import { createServer } from "vite"
import tsConfigPaths from "vite-tsconfig-paths"
import reactRefresh from "@vitejs/plugin-react-refresh"

export const browserBundleDev = async () => {
	const devServer = await createServer({
		plugins: [reactRefresh(), tsConfigPaths()],
		define: {
			"process.env.BUILD_TIME": JSON.stringify(new Date().toISOString()),
			"process.env.NODE_ENV": JSON.stringify("development"),
			"process.env.APPINSIGHTS_INSTRUMENTATIONKEY": JSON.stringify("a117db64-f046-4743-b6e7-456acd24cf33")
		},
		root: path.resolve(__dirname, "../../web-client"),
		server: {
			https: true,
			port: 3010
		}
	})

	await devServer.listen()
}
