import { Logger, transports as winstonTransports, format, createLogger } from "winston"
import { nanoid } from "nanoid"
import { TelemetryClient } from "applicationinsights"
import { getClient, getCorrelationData } from "./initAppInsights"
import TransportStream from "winston-transport"
import { AppInsightsTransport } from "./AppInsightsTransport"
import colors from "colors/safe"
import safeStringify from "fast-safe-stringify"
import { LogMessage } from "./LogMessage"
import { omit } from "./utils/omit"

const uid = (size?: number) => nanoid(size)
const extendId = (id?: string, extension?: string) => {
  const extender = extension ? extension : id ? uid(4) : uid()
  return `${id ? `${id}.` : ""}${extender}`
}

const formatTime = format((info: LogMessage) => {
  info.time = new Date()
  return info
})
const formatMessageWithData = format((info: LogMessage) => {
  const { taskName, error, ...rest } = info
  if (taskName) {
    info.message = `${colors.gray(taskName)}: ${info.message}`
  }
  if (error) {
    info.message = `${info.message} ${error.stack?.substr(error.toString().length)}\n`
  }
  info.message = `${info.message} ${colors.blue(
    safeStringify({ taskName, ...omit(rest, ["level", "time", "message"]) })
  )}`
  return info
})

export const LOG_LEVELS = ["debug", "info", "warn", "error"] as const
export type LogLevels = typeof LOG_LEVELS[number]
export type LogMethod = (message: string | Error, data?: Record<string, any>) => Promise<unknown>
export type LogMeta = Record<string, any>

/**
 * A wrapper class for a winston logger instance that normalizes log methods
 * and metadata and supports the UDI logging workflow with requests and tasks.
 */
export class WrappedLogger {
  /**
   * Metadata for this logger. You are free to add metadata to this object as needed.
   * When creating a child logger all metadata is copied.
   * TODO: Update typing so that it is more strict and extensible. E.g.: Supports looking up types defined in the constructor.
   */
  public readonly meta: LogMeta

  public constructor(public logger: Logger, meta?: LogMeta) {
    logger.defaultMeta = logger.defaultMeta ?? {}
    const ctx = getCorrelationData()
    this.meta = {
      ...(meta ?? logger.defaultMeta),
      operationId: ctx?.operation?.id,
      parentId: ctx?.operation?.parentId
    }
  }

  public debug: LogMethod = async (message, data) => this.log("debug", message, data)
  public info: LogMethod = async (message, data) => this.log("info", message, data)
  public warn: LogMethod = async (message, data) => this.log("warn", message, data)
  public error: LogMethod = async (message, data) => this.log("error", message, data)

  /**
   * @deprecated This method is here to conform to the log level "http" from winston. Do not use.
   */
  public http: LogMethod = async (message, data) => {
    this.log("info", message, data)
  }
  /**
   * @deprecated This method is here to conform to the log level "verbose" from winston. Do not use.
   */
  public verbose: LogMethod = async (message, data) => {
    this.log("info", message, data)
  }
  /**
   * @deprecated This method is here to conform to the log level "silly" from winston. Do not use.
   */
  public silly: LogMethod = async (message, data) => {
    this.log("debug", message, data)
  }

  public log = (level: LogLevels, message: string | Error, data?: LogMeta) =>
    new Promise((resolve) => {
      this.logger.log(
        level,
        message.toString(),
        { data, error: typeof message === "object" ? message : undefined },
        resolve
      )
    })

  /**
   * Creates a new logger based on this one intended to log request information.
   * @param extraMeta Any additional metadata to add to each log message.
   */
  public newRequestLogger = (extraMeta: LogMeta = {}) => {
    return this._newChildLogger({
      requestId: extendId(this.meta.requestId, getCorrelationData()?.operation?.id ?? uid()),
      ...extraMeta
    })
  }

  /**
   * Creates a new logger based on this one intended to log task specific information.
   * @param taskName The name of the task, is combined with the current task name meta if present.
   * @param extraMeta Any additional matadata to add to each log message.
   */
  public newTaskLogger = (taskName: string, extraMeta: LogMeta = {}) =>
    this._newChildLogger({
      taskName: extendId(this.meta.taskName, taskName),
      ...extraMeta
    })

  /**
   * Creates a new child logger for this one containing all current metadata as well as any additions you specify.
   * @param extraMeta Any additional matadata to add to each log message.
   */
  private _newChildLogger = (extraMeta: LogMeta = {}) => {
    const meta = {
      ...this.meta,
      ...extraMeta
    }
    return new WrappedLogger(this.logger.child(meta), meta)
  }

  /**
   * Creates a new logger instance for an application. You should usually only need to create one of these per
   * app and spawn child loggers from it for specific sub-loggers.
   * @param appName The name of the app
   * @param minLogLevel The minimum log level to report (defaults to `debug`)
   * @param client The AppInsights client to use (if not specified uses default)
   */
  public static createAppLogger(
    appName: string,
    minLogLevel: "debug" | "info" | "warn" | "error" = "debug",
    client?: TelemetryClient
  ) {
    const instanceId = uid(6)
    const aiClient = client ?? getClient()
    aiClient.commonProperties = {
      appName,
      instanceId
    }

    const transports: TransportStream[] = [new AppInsightsTransport({ level: minLogLevel, aiClient })]

    // if (process.env.NODE_ENV === "development") {
    transports.push(
      new winstonTransports.Console({
        format: format.combine(formatMessageWithData(), format.cli())
      })
    )
    // }

    const logger = createLogger({
      level: minLogLevel,
      format: format.combine(formatTime()),
      transports,
      exceptionHandlers: transports,
      defaultMeta: {
        appName,
        instanceId
      }
    })

    return new WrappedLogger(logger)
  }
}
