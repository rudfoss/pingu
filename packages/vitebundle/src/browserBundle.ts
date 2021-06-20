import path from "path"
import { createServer } from "vite"
import tsConfigPaths from "vite-tsconfig-paths"
import reactRefresh from "@vitejs/plugin-react-refresh"

export const browserBundleDev = async () => {
	const devServer = await createServer({
		configFile: false,
		plugins: [
			reactRefresh(),
			tsConfigPaths({
				root: path.resolve(__dirname, "../../web-client")
			})
		],
		root: path.resolve(__dirname, "../../web-client"),
		server: {
			https: true,
			port: 3010
		}
	})

	await devServer.listen()
}
