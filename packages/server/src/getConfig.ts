export const getConfig = () => ({
  appName: process.env.APP_NAME ?? "Webapp",
  port: process.env.PORT ?? 1337,
  useHTTPS: process.env.USE_HTTPS === "true"
})

export type Config = ReturnType<typeof getConfig>
