import http from "http"
import https from "https"

import { generateCerts } from "../generic/generateCerts"

const getCertificates = async (): Promise<{ key: string; cert: string }> => {
	const keyPair = generateCerts()
	return keyPair
}

interface ICreateHTTPServerOptions {
	handler: http.RequestListener
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
	const { handler, secure, port } = defaultOptions(options)
	const server = secure ? https.createServer(await getCertificates(), handler) : http.createServer(handler)

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
