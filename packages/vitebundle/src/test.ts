import path from "path"
import { createServer } from "vite"
import tsConfigPaths from "vite-tsconfig-paths"
import reactRefresh from "@vitejs/plugin-react-refresh"

export const browserBundleDev = async () => {
	const devServer = await createServer({
		plugins: [reactRefresh(), tsConfigPaths()],
		define: {
			"process.env.VITE_TEST": JSON.stringify(new Date().toISOString())
		},
		root: path.resolve(__dirname, "../../vitewebclient"),
		server: {
			https: true
		}
	})

	await devServer.listen()
}
