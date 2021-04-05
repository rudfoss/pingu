import path from "path"
import dotenv from "dotenv"
dotenv.config({ path: path.resolve(__dirname, "../.env") })

export const getConfig = () => ({
	appName: process.env.APP_NAME ?? "web-api",
	port: process.env.PORT ?? 3001,
	useHTTPS: process.env.USE_HTTPS === "true"
})

export type Config = ReturnType<typeof getConfig>
