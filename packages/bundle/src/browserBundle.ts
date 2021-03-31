import webpack from "webpack"
import devConfig, { BrowserBundleDevOptions } from "./configs/client.dev"
import prodConfig, { BrowserBundleProdOptions } from "./configs/client.prod"
import fs from "fs-extra"
import WebpackDevServer from "webpack-dev-server"

/**
 * Starts the browser dev-tool for webpack.
 * @param options
 */
export const browserBundleDev = async (options: BrowserBundleDevOptions) => {
	console.log(`Clearing output directory "${options.paths.output}"`)
	await fs.emptyDir(options.paths.output)

	const configuration = await devConfig(options)
	const server = new WebpackDevServer(webpack(configuration), configuration.devServer)
	console.log(`Server starting @ https://localhost:${configuration.devServer.port}`)
	server.listen(configuration.devServer.port, (err) => {
		if (err) {
			console.error(err.message, err.stack)
			process.exit(1)
		}
	})
}

export const browserBundleProd = async (options: BrowserBundleProdOptions) => {
	console.log(`Clearing output directory "${options.paths.output}"`)
	await fs.emptyDir(options.paths.output)

	const configuration = await prodConfig(options)
	return new Promise((resolve, reject) => {
		webpack(configuration).run((err: any, stats: any) => {
			if (err) {
				console.warn(`Server errors during build`)
				reject(err)
				return
			}

			const statsJson = stats?.toJson()
			if (stats?.hasErrors()) {
				console.error(`Server errors during webpack build`)
				console.log(
					stats.toString({
						colors: true
					})
				)
				reject(statsJson?.errors)
				return
			}
			if (stats?.hasWarnings()) {
				console.warn(`Server warnings during build`)
				console.log(
					stats?.toString({
						colors: true
					})
				)
			}

			resolve(stats)
		})
	})
}
