import {
	Request as ExpressRequest,
	Response as ExpressResponse,
	NextFunction,
	RequestHandler,
	ErrorRequestHandler
} from "express"
import Logger from "@radtools/logging/server"

export type Request = {
	log: Logger
	spaState: Record<string, any>
} & ExpressRequest

export type Response = ExpressResponse

type Handler = (req: Request, res: Response, next: NextFunction) => void | Promise<void>
type ErrorHandler<TError = Error> = (
	error: TError,
	req: Request,
	res: Response,
	next: NextFunction
) => void | Promise<void>

/**
 * Wraps an express response handler and catches errors and passes them through the normal express
 * error handling chain. Also supports async handlers.
 * @param handler
 * @returns
 */
export const handle = (responseHandler: Handler): RequestHandler => {
	let nextArg: any = undefined
	let nextCalled = false
	const nextProxy = (arg?: any) => {
		nextCalled = true
		nextArg(arg)
	}

	return async (req: any, res: any, next: any) => {
		try {
			await responseHandler(req, res, nextProxy)
			if (nextCalled) {
				next(nextArg)
			}
		} catch (error) {
			next(error)
		}
	}
}

/**
 * Wraps an express middleware and automatically call next unless it was explicitly called by the middleware.
 * Alos supports async middleware
 * @param handler
 * @returns
 */
export const handleMW = (middlewareHandler: Handler): RequestHandler => {
	let nextArg: any = undefined
	let nextCalled = false
	const nextProxy = (arg?: any) => {
		nextCalled = true
		nextArg(arg)
	}

	return async (req: any, res: any, next: any) => {
		try {
			await middlewareHandler(req, res, nextProxy)
			if (nextCalled) {
				next(nextArg)
				return
			}
			next()
		} catch (error) {
			next(error)
		}
	}
}

/**
 * Worsk
 * @param errorHandler
 * @returns
 */
export const handleError = <TError = Error>(errorHandler: ErrorHandler<TError>): ErrorRequestHandler => {
	let nextArg: any = undefined
	let nextCalled = false
	const nextProxy = (arg?: any) => {
		nextCalled = true
		nextArg(arg)
	}

	return async (err: any, req: any, res: any, next: any) => {
		try {
			await errorHandler(err, req, res, nextProxy)
			if (nextCalled) {
				next(nextArg)
				return
			}
			next()
		} catch (error) {
			next(error)
		}
	}
}
