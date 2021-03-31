import webpack from "webpack"
import prodConfig, { NodeBundleDevOptions } from "./configs/server.prod"
import fs from "fs-extra"

export const nodeBundleProd = async (options: NodeBundleDevOptions) => {
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
