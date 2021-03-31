import { setupAI } from "@radtools/logging/client/setupAI"
import { ReportHandler } from "web-vitals"

export const initAnalytics = async () => {
	setupAI({ instrumentationKey: process.env.APPINSIGHTS_INSTRUMENTATIONKEY! })
	await reportWebVitals(console.log)
}

/**
 * Reports web vitals to the registered onPerfEntry handler.
 * (code borrowed from create-react-app)
 * @param onPerfEntry
 */
const reportWebVitals = async (onPerfEntry?: ReportHandler) => {
	if (onPerfEntry && onPerfEntry instanceof Function) {
		const { getCLS, getFID, getFCP, getLCP, getTTFB } = await import("web-vitals")
		getCLS(onPerfEntry)
		getFID(onPerfEntry)
		getFCP(onPerfEntry)
		getLCP(onPerfEntry)
		getTTFB(onPerfEntry)
	}
}
