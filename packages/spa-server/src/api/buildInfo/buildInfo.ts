import { RouteHandlerMethod } from "fastify"

export interface BuildInfo {
	nodeEnv: string
	time: string
}

export const buildInfo: RouteHandlerMethod = async (): Promise<BuildInfo> => {
	return {
		nodeEnv: process.env.NODE_ENV ?? "production",
		time: new Date().toISOString()
	}
}
