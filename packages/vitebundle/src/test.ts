import path from "path"
import { createServer } from "vite"
import tsConfigPaths from "vite-tsconfig-paths"
import reactRefresh from "@vitejs/plugin-react-refresh"

export const browserBundleDev = async () => {
	const devServer = await createServer({
		configFile: false,
		define: {
			"process.env.VITE_TEST": JSON.stringify(new Date().toISOString())
		},
		plugins: [reactRefresh(), tsConfigPaths()],
		root: path.resolve(__dirname, "../../vitewebclient"),
		server: {
			https: true
		}
	})

	await devServer.listen()
}
