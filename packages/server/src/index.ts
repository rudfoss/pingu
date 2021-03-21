import { getConfig } from "getConfig"

import setupAI from "logging/server/setupAI"
setupAI({ instrumentationKey: process.env.APPINSIGHTS_INSTRUMENTATIONKEY })

import express from "express"
import { createHttpServer } from "../utils/createHttpServer"
import Logger from "logging/server"
import { spa } from "spa"

const start = async () => {
  const app = express()
  const config = getConfig()
  const logger = Logger.createAppLogger(config.appName)

  app.use((req: any, res, next) => {
    req.spaState = {
      foo: 42,
      bar: `Hey there ${'foo"bar'}`
    }
    next()
  })

  app.get("/_health", (_, res) => {
    res.send({ ok: true, time: new Date().toISOString() })
  })
  app.get("*", await spa({ indexHtmlPath: config.indexHtmlPath, initialState: {} }))

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
