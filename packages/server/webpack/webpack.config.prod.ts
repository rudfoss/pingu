import path from "path"
import webpack from "webpack"

import TsConfigPathsPlugin from "tsconfig-paths-webpack-plugin"

const SRC_ROOT_PATH = path.resolve(__dirname, "../src")
const OUTPUT_PATH = path.resolve(__dirname, "../dist")
const SERVER_START_FILE = path.resolve(SRC_ROOT_PATH, "index.ts")
const TS_CONFIG_FILE = path.resolve(__dirname, "../tsconfig.json")

export default async () => {
  const config: webpack.Configuration = {
    mode: "production",
    target: "node",
    devtool: "source-map",

    entry: [SERVER_START_FILE],

    node: {
      __dirname: false
    },

    output: {
      filename: "server.js",
      path: OUTPUT_PATH
    },

    resolve: {
      extensions: [".ts", ".tsx"],
      plugins: [
        new TsConfigPathsPlugin({
          configFile: TS_CONFIG_FILE
        }) as any // This is correct, but at the time of writing the type files were incompatible
      ]
    },

    optimization: {
      minimize: false
    }
  }
}
