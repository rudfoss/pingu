/**
 * This file is meant to be a separate from the others because it has side effects.
 * Use this to set up AI using default settings.
 */

// This import needs to resolve in this way due to typing issues.
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ai = require("applicationinsights")

import { getCorrelationContext, TelemetryClient, setup as aiSetup, DistributedTracingModes } from "applicationinsights"

const setup = (instrumentationKey?: string): ReturnType<typeof aiSetup> => ai.setup(instrumentationKey)

export const getClient = (): TelemetryClient => require("applicationinsights").defaultClient // The default client does not exist before setup has been called so it must be defined like this.

export const getCorrelationData = (): ReturnType<typeof getCorrelationContext> => {
  return require("applicationinsights").getCorrelationContext()
}

export interface InitAppInsightsOptions {
  /**
   * The instrumentation key to use
   * @default process.env.APPINSIGHTS_INSTRUMENTATIONKEY ?? process.env.APPLICATIONINSIGHTS_CONNECTION_STRING
   */
  instrumentationKey?: string

  /**
   * Enables debug logging for Application Insights itself
   */
  enableDebugLogging?: boolean
  /**
   * Enables warning logging for Application Insights itself
   */
  enableWarningLogging?: boolean
}

/**
 * Initialize application insights for your application.
 * Only call this once per application.
 * @param param0
 * @return The default application insights client
 */
export const setupAI = ({
  instrumentationKey,
  enableDebugLogging = false,
  enableWarningLogging = false
}: InitAppInsightsOptions = {}) => {
  const coreClient = setup(instrumentationKey)
    .setAutoCollectConsole(false)
    .setAutoCollectDependencies(true)
    .setAutoCollectExceptions(true)
    .setAutoCollectHeartbeat(true)
    .setAutoCollectPerformance(true)
    .setAutoCollectRequests(true)
    .setAutoDependencyCorrelation(true)
    .setUseDiskRetryCaching(true)
    .setInternalLogging(enableDebugLogging, enableWarningLogging)
    .setSendLiveMetrics(true)
    .setDistributedTracingMode(DistributedTracingModes.AI_AND_W3C)

  coreClient.start()
  const client = getClient()
  client.config.samplingPercentage = 100
  console.log(`AppInsights started with "${client.config.instrumentationKey}"`)

  return client
}

export default setupAI
