import webpack from "webpack"

import ForkTsCheckerPlugin from "fork-ts-checker-webpack-plugin"
import TsConfigPathsPlugin from "tsconfig-paths-webpack-plugin"
import { NODE_TARGETS } from "./targets"

export interface NodeBundleDevOptions {
	paths: {
		/**
		 * The ts entry file
		 */
		entry: string
		/**
		 *
		 */
		tsconfig: string
		/**
		 * The output folder
		 */
		output: string
	}
	defines?: Record<string, any>
}

export default async (options: NodeBundleDevOptions) => {
	const { paths } = options
	const config: webpack.Configuration = {
		mode: "production",
		target: "node",
		devtool: "source-map",

		entry: [paths.entry],

		node: {
			__dirname: false
		},

		output: {
			filename: "server.js",
			path: paths.output
		},

		resolve: {
			extensions: [".js", ".jsx", ".ts", ".tsx"],
			plugins: [
				new TsConfigPathsPlugin({
					configFile: paths.tsconfig
				})
			]
		},

		optimization: {
			runtimeChunk: false,
			minimize: false
		},

		plugins: [
			new webpack.optimize.LimitChunkCountPlugin({
				maxChunks: 1
			}),
			new webpack.DefinePlugin({
				"process.env.NODE_ENV": JSON.stringify("production")
			}),
			new ForkTsCheckerPlugin({
				async: true
			})
		],

		module: {
			rules: [
				{
					exclude: /node_modules/,
					test: /\.[jt]sx?$/,
					use: [
						{
							loader: "babel-loader",
							options: {
								babelrc: false,
								presets: [
									[
										"@babel/preset-env", // Adds dynamic imports of the necessary polyfills (see .browserslistrc for spec)
										{
											useBuiltIns: "usage",
											corejs: { version: 3, proposals: true },
											debug: true,
											targets: NODE_TARGETS
										}
									],
									"@babel/preset-typescript"
								],
								plugins: [["@babel/plugin-proposal-class-properties", { loose: true }]]
							}
						}
					]
				}
			]
		}
	}

	return config
}
