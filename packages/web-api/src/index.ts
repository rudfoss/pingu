import { getConfig } from "getConfig"

import setupAI from "@radtools/logging/server/setupAI"
setupAI({ instrumentationKey: process.env.APPINSIGHTS_INSTRUMENTATIONKEY })

import express from "express"

const start = async () => {
	const app = express()
	const config = getConfig()
}

start().catch((error) => {
	console.error(error, error.message)
	process.exit(1)
})
