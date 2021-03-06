import { Handler } from "express"
import { SPAPage, SPAPageCreateOptions } from "./SPAPage"
import { SPARequest } from "./SPARequest"
import { createTimer } from "@radtools/utilities/node/createTimer"

type SPAOptions<TPageState> = SPAPageCreateOptions<TPageState>

/**
 * Creates a middleware function that renders the provided index page for requests.
 * Also supports injecting state using `req.spaState` object.
 * @param options
 * @returns
 */
export const spa = async <TPageState>(options: SPAOptions<TPageState>): Promise<Handler> => {
	const spaPage: SPAPage<TPageState> = await SPAPage.create(options)
	return async (req, res, next) => {
		try {
			const spaTimer = createTimer()
			const pageToRender = options.autoPrepare ? spaPage : await SPAPage.create(options)
			if (!pageToRender.isPrepared) {
				pageToRender.prepare()
			}
			const loadTime = spaTimer()

			pageToRender.state = ((req as any) as SPARequest<TPageState>).spaState ?? pageToRender.state
			const html = pageToRender.render()
			const renderTime = spaTimer()

			res.setHeader("X-SPA-PrepTime", loadTime.toString())
			res.setHeader("X-SPA-RenderTime", renderTime.toString())
			res.send(html)
		} catch (error) {
			next(error)
		}
	}
}
