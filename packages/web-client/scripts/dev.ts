import getWebpackConfig from "../webpack/webpack.config.dev"
import webpack from "webpack"
import WebpackDevServer from "webpack-dev-server"
import rimraf from "rimraf"
import { promisify } from "util"

const start = async () => {
  const config = await getWebpackConfig()
  const distPath = config.output!.path!
  console.log(`Clearing output directory "${config.output!.path!}"...`)
  await promisify(rimraf)(distPath)

  const server = new WebpackDevServer(webpack(config), config.devServer)
  console.log(`
  Server starting @ https://localhost:${config.devServer?.port}
`)
  server.listen(config.devServer?.port || 3010, (err) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }
  })
}

start().catch((error) => {
  console.error(error.message, error.stack)
  process.exit(1)
})
