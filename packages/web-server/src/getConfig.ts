import path from "path"
import dotenv from "dotenv"
dotenv.config({ path: path.resolve(__dirname, "../.env") })

export const getConfig = () => ({
	appName: process.env.APP_NAME ?? "web-server",
	port: process.env.PORT ?? 3000,
	useHTTPS: process.env.USE_HTTPS === "true",
	indexHtmlPath: path.resolve(process.cwd(), process.env.INDEX_HTML_PATH!),
	publicPath: path.dirname(path.resolve(process.cwd(), process.env.INDEX_HTML_PATH!))
})

export type Config = ReturnType<typeof getConfig>
