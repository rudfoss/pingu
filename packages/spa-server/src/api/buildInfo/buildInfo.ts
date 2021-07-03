import { RouteOptions } from "fastify"

export interface BuildInfo {
	query: any
	nodeEnv: string
	time: string
}

export const buildInfo: RouteOptions = {
	method: "GET",
	url: "/buildInfo",
	handler: async (request, reply): Promise<BuildInfo> => {
		return {
			query: request.query,
			nodeEnv: process.env.NODE_ENV ?? "undefined",
			time: new Date().toISOString()
		}
	}
}
