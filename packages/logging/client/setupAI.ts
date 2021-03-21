import { ApplicationInsights, IConfiguration } from "@microsoft/applicationinsights-web"

declare global {
  interface Window {
    appInsights: ApplicationInsights
  }
}

type RequiredInstrumentationKey = Required<Pick<IConfiguration, "instrumentationKey">>

export const setupAI = (config: IConfiguration & RequiredInstrumentationKey) => {
  if (window.appInsights) {
    throw new Error("setupAI() is only designed to be called once.")
  }

  const appInsights = new ApplicationInsights({
    config: {
      enableAjaxPerfTracking: true,
      enableAutoRouteTracking: true,
      autoTrackPageVisitTime: true,
      ...config
    }
  })
  appInsights.loadAppInsights()
  appInsights.trackPageView()
  window.appInsights = appInsights
  return appInsights
}
