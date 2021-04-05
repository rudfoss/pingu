import webpack from "webpack"
import path from "path"

import ForkTsCheckerPlugin from "fork-ts-checker-webpack-plugin"
import TsConfigPathsPlugin from "tsconfig-paths-webpack-plugin"
import { NODE_TARGETS } from "./targets"
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer"

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
		/**
		 * The output folder for stats. If not specified will use `{output}../.stats`
		 */
		statsOutput?: string
	}
	/**
	 * Define any constants you want to replace during bundling.
	 */
	defines?: Record<string, any>
}

export default async (options: NodeBundleDevOptions) => {
	const { paths } = options
	const statsOutput = paths.statsOutput ?? path.resolve(paths.output, "../.stats")
	const config: webpack.Configuration = {
		mode: "production",
		target: "node",
		devtool: "source-map",

		entry: [paths.entry],

		node: {
			__dirname: false
		},

		ignoreWarnings: [
			/critical dependency: the request of a dependency is an expression/i, // Ignore expression dependencies as they are used by express.js view library
			/can't resolve 'applicationinsights-native-metrics'/i, // Ignore appInsights optional dependency warning
			/can't resolve '@opentelemetry\/tracing'/i, // Ignore appInsights optional dependency warning
			/can't resolve '@opentelemetry\/api'/i // Ignore appInsights optional dependency warning
		],

		output: {
			filename: "index.js",
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
			splitChunks: false,
			runtimeChunk: false,
			minimize: false
		},

		plugins: [
			new webpack.DefinePlugin({
				"process.env.NODE_ENV": JSON.stringify("production")
			}),
			new ForkTsCheckerPlugin({
				async: true,
				typescript: {
					configFile: paths.tsconfig
				}
			}),
			new BundleAnalyzerPlugin({
				analyzerMode: "static",
				reportFilename: path.resolve(statsOutput, "./report.html"),
				openAnalyzer: false
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
											debug: false,
											targets: NODE_TARGETS
										}
									],
									[
										"@babel/preset-typescript",
										{
											onlyRemoveTypeImports: true
										}
									]
								],
								plugins: [
									["@babel/plugin-proposal-decorators", { legacy: true }], // Handles decorators like those required for tsoa
									["@babel/plugin-proposal-class-properties", { loose: true }]
								]
							}
						}
					]
				}
			]
		}
	}

	return config
}
