import { TelemetryClient, Contracts } from "applicationinsights"
import TransportStream from "winston-transport"
import { getClient } from "./setupAI"
import { LogMessage } from "./LogMessage"

export interface AppInsightsTransportConstructorOptions extends TransportStream.TransportStreamOptions {
  /**
   * Specify the App Insights client to use for this transport.
   * Defaults to the default App Insights client
   * @default getClient()
   */
  aiClient?: TelemetryClient
}

export class AppInsightsTransport extends TransportStream {
  public get aiClient() {
    return this.options.aiClient!
  }

  public constructor(public readonly options: AppInsightsTransportConstructorOptions = {}) {
    super(options)
    this.options.aiClient = this.options.aiClient ?? getClient()
  }

  public log(info: LogMessage, next: () => void) {
    const { level, message, time = new Date(), data, error, requestId, operationId, ...rest } = info
    const tagOverrides: Record<string, string> = {}
    const severity = AppInsightsTransport.mapLevel(level)

    // For some reason AppInsights looses track of operation id only on Azure servers
    // This ensures operation ids are attached correctly.
    const aiOperationId = requestId ?? operationId
    if (this.options.aiClient?.context.keys.operationId && aiOperationId) {
      tagOverrides[this.options.aiClient.context.keys.operationId] = aiOperationId
    }

    const properties = {
      ...rest,
      ...data,
      tagOverrides
    }

    if (error) {
      this.aiClient.trackException({
        time,
        severity,
        exception: error,
        properties,
        tagOverrides
      })
    } else {
      this.aiClient.trackTrace({
        time,
        message,
        severity,
        properties,
        tagOverrides
      })
    }

    next()
  }

  public static mapLevel(level: string): Contracts.SeverityLevel {
    switch (level) {
      case "debug":
        return Contracts.SeverityLevel.Verbose
      case "info":
        return Contracts.SeverityLevel.Information
      case "warn":
        return Contracts.SeverityLevel.Warning
      case "error":
        return Contracts.SeverityLevel.Error
    }

    return Contracts.SeverityLevel.Warning
  }
}
