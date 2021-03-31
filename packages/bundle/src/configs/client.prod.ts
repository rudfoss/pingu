import path from "path"
import webpack from "webpack"

import ForkTsCheckerPlugin from "fork-ts-checker-webpack-plugin"
import TsConfigPathsPlugin from "tsconfig-paths-webpack-plugin"
import HtmlPlugin from "html-webpack-plugin"
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer"

import { BROWSER_TARGETS } from "./targets"
import { prepareDefines } from "../utils/prepareDefines"

export interface BrowserBundleProdOptions {
	paths: {
		/**
		 * The ts entry file
		 */
		entry: string
		/**
		 * The index.html file
		 */
		indexHtml: string
		/**
		 *
		 */
		tsconfig: string
		/**
		 * The output folder
		 */
		output: string

		statsOutput?: string
	}
	defines?: Record<string, any>
}

export default async (options: BrowserBundleProdOptions) => {
	const { paths } = options
	const statsOutput = paths.statsOutput ?? path.resolve(paths.output, "../.stats")
	const config: webpack.Configuration = {
		mode: "production",
		target: "web",
		devtool: "source-map",

		entry: [paths.entry],

		optimization: {
			runtimeChunk: "multiple",
			minimize: true,
			splitChunks: {
				chunks: "all"
			}
		},

		output: {
			filename: "js/[name]-[contenthash].js",
			chunkFilename: "js/[name]-chunk-[contenthash].js",
			publicPath: "/", // The last / is critical, without it hot-reloading breaks
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

		plugins: [
			new webpack.DefinePlugin({
				"process.env.NODE_ENV": JSON.stringify("production"),
				...prepareDefines(options.defines)
			}),
			new HtmlPlugin({
				template: paths.indexHtml,
				minify: {
					collapseBooleanAttributes: true,
					collapseWhitespace: true,
					keepClosingSlash: true,
					removeRedundantAttributes: true,
					removeStyleLinkTypeAttributes: true,
					useShortDoctype: true
				}
			}),
			new ForkTsCheckerPlugin({
				async: true
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
											debug: true,
											targets: BROWSER_TARGETS
										}
									],
									"@babel/preset-typescript",
									"@babel/preset-react"
								],
								plugins: [
									["@babel/plugin-proposal-class-properties", { loose: true }],
									"@babel/plugin-transform-runtime"
								]
							}
						}
					]
				},
				{
					test: /\.(png|svg|jpg|jpeg|gif)$/i,
					type: "asset/resource"
				}
			]
		}
	}

	return config
}
