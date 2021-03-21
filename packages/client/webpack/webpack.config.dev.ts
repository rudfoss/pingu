import path from "path"
import webpack, { DefinePlugin } from "webpack"

import ForkTsCheckerPlugin from "fork-ts-checker-webpack-plugin"
import TsConfigPathsPlugin from "tsconfig-paths-webpack-plugin"
import HtmlHarddiskPlugin from "html-webpack-harddisk-plugin"
import HtmlPlugin from "html-webpack-plugin"
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin"

// This does not have types so must be imported like this
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ReactRefreshBabel = require("react-refresh/babel")

const SRC_ROOT_PATH = path.resolve(__dirname, "../src")
const OUTPUT_PATH = path.resolve(__dirname, "../dist")
const TS_CONFIG_FILE = path.resolve(__dirname, "../tsconfig.json")

const START_FILE = path.resolve(SRC_ROOT_PATH, "index.tsx")
const INDEX_HTML_FILE = path.resolve(SRC_ROOT_PATH, "index.html")

export default async () => {
  const config: webpack.Configuration = {
    mode: "development",
    target: "web",
    devtool: "source-map",

    devServer: {
      compress: true,
      contentBase: OUTPUT_PATH,
      // clientLogLevel: "none",
      // quiet: true,

      historyApiFallback: true,
      hot: true,
      https: true,
      overlay: true,
      inline: true,
      writeToDisk: true,
      port: 3010,
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    },

    entry: [START_FILE],

    output: {
      filename: "js/[name]-[contenthash].js",
      chunkFilename: "js/[name]-chunk-[contenthash].js",
      publicPath: "https://localhost:3010/", // The last / is critical, without it hot-reloading breaks
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
        "process.env.NODE_ENV": JSON.stringify("development"),
        "process.env.APPINSIGHTS_INSTRUMENTATIONKEY": JSON.stringify("fb0b35c7-d41c-452c-a1e0-047a2d47ae9a")
      }),
      new HtmlHarddiskPlugin(),
      new HtmlPlugin({
        template: INDEX_HTML_FILE,
        alwaysWriteToDisk: true,
        minify: false
      }),
      new webpack.HotModuleReplacementPlugin(),
      new ReactRefreshWebpackPlugin(),
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
                      debug: false
                    }
                  ],
                  "@babel/preset-typescript",
                  "@babel/preset-react"
                ],
                plugins: [
                  "@babel/plugin-syntax-jsx",
                  ["@babel/plugin-transform-react-jsx", { runtime: "automatic" }],
                  ["@babel/plugin-proposal-class-properties", { loose: true }],
                  "@babel/plugin-transform-runtime",
                  ReactRefreshBabel
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
