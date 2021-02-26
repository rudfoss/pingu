import { Application } from "express"
import http from "http"
import https from "https"

import { generateCerts } from "./generateCerts"

const getCertificates = async (): Promise<{ key: string; cert: string }> => {
  const keyPair = generateCerts()
  return keyPair
}

interface ICreateHTTPServerOptions {
  expressApp: Application
  secure?: boolean
  port?: string | number
}

const defaultOptions = (
  options: ICreateHTTPServerOptions
): Required<Pick<ICreateHTTPServerOptions, "secure" | "port">> & ICreateHTTPServerOptions => ({
  secure: false,
  port: process.env.PORT ?? 1337,
  ...options
})

/**
 * Creates an HTTP(S) server for the specified Express Application
 * If specified as secure, configures express with certificates and runs over https
 * @param {ICreateHTTPServerOptions} options
 * @returns
 */
export const createHttpServer = async (options: ICreateHTTPServerOptions) => {
  const { expressApp: express, secure, port } = defaultOptions(options)
  const server = secure ? https.createServer(await getCertificates(), express) : http.createServer(express)

  return new Promise((resolve, reject) => {
    try {
      server.on("error", reject)
      server.on("listening", resolve)
      server.listen(port)
    } catch (error) {
      reject(error)
    }
  })
}
