import path from "path"
import webpack, { DefinePlugin } from "webpack"

import ForkTsCheckerPlugin from "fork-ts-checker-webpack-plugin"
import TsConfigPathsPlugin from "tsconfig-paths-webpack-plugin"
import HtmlPlugin from "html-webpack-plugin"
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer"

const SRC_ROOT_PATH = path.resolve(__dirname, "../src")
const OUTPUT_PATH = path.resolve(__dirname, "../dist")
const STATS_OUTPUT_PATH = path.resolve(__dirname, "../.stats")
const TS_CONFIG_FILE = path.resolve(__dirname, "../tsconfig.json")

const START_FILE = path.resolve(SRC_ROOT_PATH, "index.tsx")
const INDEX_HTML_FILE = path.resolve(SRC_ROOT_PATH, "index.html")

export default async () => {
  const config: webpack.Configuration = {
    mode: "production",
    target: "web",
    devtool: "source-map",

    entry: [START_FILE],

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
      path: OUTPUT_PATH
    },

    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx"],
      plugins: [
        new TsConfigPathsPlugin({
          configFile: TS_CONFIG_FILE
        }) as any // This is correct, but at the time of writing the type files were incompatible
      ]
    },

    plugins: [
      new DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify("production")
      }),
      new HtmlPlugin({
        template: INDEX_HTML_FILE,
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
        reportFilename: path.resolve(STATS_OUTPUT_PATH, "./report.html"),
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
                      debug: false
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
