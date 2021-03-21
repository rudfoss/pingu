import path from "path"
import webpack, { DefinePlugin } from "webpack"

import ForkTsCheckerPlugin from "fork-ts-checker-webpack-plugin"
import TsConfigPathsPlugin from "tsconfig-paths-webpack-plugin"

const SRC_ROOT_PATH = path.resolve(__dirname, "../src")
const OUTPUT_PATH = path.resolve(__dirname, "../dist")
const START_FILE = path.resolve(SRC_ROOT_PATH, "index.ts")
const TS_CONFIG_FILE = path.resolve(__dirname, "../tsconfig.json")

export default async () => {
  const config: webpack.Configuration = {
    mode: "production",
    target: "node",
    devtool: "source-map",

    entry: [START_FILE],

    node: {
      __dirname: false
    },

    output: {
      filename: "server.js",
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

    optimization: {
      runtimeChunk: false,
      minimize: false
    },

    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1
      }),
      new DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify("production"),
        "process.env.APPINSIGHTS_INSTRUMENTATIONKEY": JSON.stringify("fb0b35c7-d41c-452c-a1e0-047a2d47ae9a")
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
                      targets: {
                        node: "12"
                      },
                      useBuiltIns: "usage",
                      corejs: { version: 3, proposals: true },
                      debug: false
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
