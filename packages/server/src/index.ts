import path from "path"
import dotenv from "dotenv"
dotenv.config({ path: path.resolve(__dirname, "../.env") })

import setupAI from "logging/server/setupAI"
setupAI({ instrumentationKey: process.env.APPINSIGHTS_INSTRUMENTATIONKEY })

import express from "express"
import { getConfig } from "getConfig"
import { createHttpServer } from "../utils/createHttpServer"
import Logger from "logging/server"

const start = async () => {
  const app = express()
  const config = getConfig()
  const logger = Logger.createAppLogger(config.appName)

  app.get("*", (_, res) => {
    res.send({ ok: true, time: new Date().toISOString() })
  })

  await createHttpServer({
    expressApp: app,
    secure: config.useHTTPS,
    port: config.port
  })
  logger.info("Server running", { config })
}

start().catch((error) => {
  console.error(error, error.message)
  process.exit(1)
})
