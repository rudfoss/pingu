import path from "path"
import express, { Application } from "express"
import swaggerUI from "swagger-ui-express"
import swaggerDocs from "oas/swagger.json"

const swaggerPath = (subPath: string = "") => `/docs${subPath}`

export const setupSwaggerUI = (app: Application) => {
	app.get(swaggerPath(), (req, res, next) => {
		if (req.path === swaggerPath()) {
			res.redirect(swaggerPath("/"))
			return
		}
		next()
	})
	app.use(swaggerPath("/*"), (req, res, next) => {
		console.log("path", req.path)
		// express.static(path.resolve(__dirname, "swagger"), { index: false })
		next()
	})

	app.use(
		swaggerPath(),
		swaggerUI.serve,
		swaggerUI.setup(swaggerDocs, {
			customSiteTitle: swaggerDocs.info.title
		})
	)
}
