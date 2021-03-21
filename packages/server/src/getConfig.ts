import path from "path"
import dotenv from "dotenv"
dotenv.config({ path: path.resolve(__dirname, "../.env") })

export const getConfig = () => ({
  appName: process.env.APP_NAME ?? "Webapp",
  port: process.env.PORT ?? 1337,
  useHTTPS: process.env.USE_HTTPS === "true",
  indexHtmlPath: path.resolve(process.cwd(), process.env.INDEX_HTML_PATH!)
})

export type Config = ReturnType<typeof getConfig>
