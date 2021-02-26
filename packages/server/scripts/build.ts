import webpack from "webpack"
import serverConfig from "../webpack/webpack.config.prod"
import rimraf from "rimraf"
import { promisify } from "util"

export const buildWebpack = async (webpackConfig: webpack.Configuration) => {
  const distPath = webpackConfig.output!.path!
  console.log(`Clearing output directory "${webpackConfig.output!.path!}"...`)
  await promisify(rimraf)(distPath)

  console.log("Building with webpack...")
  return new Promise((resolve, reject) => {
    webpack(webpackConfig).run((err, stats) => {
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

export const start = async () => {
  console.log("Building server...")
  await buildWebpack(await serverConfig())

  console.log("Done")
  process.exit(0)
}

start().catch((error) => {
  console.error(error.message, error.stack)
  process.exit(1)
})
