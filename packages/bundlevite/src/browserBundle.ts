import { createServer } from "vite"
import tsConfigPaths from "vite-tsconfig-paths"
import reactRefresh from "@vitejs/plugin-react-refresh"

export interface BrowserBundleViteDevOptions {
	/**
	 * The path to the root of the project where index.html can be found.
	 */
	root: string
	/**
	 * Define any constants you want to replace during bundling.
	 */
	define?: Record<string, any>
}

export const browserBundleDev = async ({ root, define = {} }: BrowserBundleViteDevOptions) => {
	const devServer = await createServer({
		plugins: [reactRefresh(), tsConfigPaths()],
		define: {
			"process.env.BUILD_TIME": JSON.stringify(new Date().toISOString()),
			"process.env.NODE_ENV": JSON.stringify("development"),
			...define
		},
		root,
		server: {
			https: true,
			port: 3010
		}
	})

	await devServer.listen()
}
