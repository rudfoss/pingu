import path from "path"
import express, { Application } from "express"
import swaggerUI from "swagger-ui-express"
import swaggerDocs from "oas/swagger.json"

const swaggerPath = (subPath: string = "") => `/docs${subPath}`

export const setupSwaggerUI = (app: Application) => {
	app.get(swaggerPath("/*"), express.static(path.resolve(__dirname, "swagger"), { index: false }))

	app.use(
		swaggerPath(),
		(req: any, res: any, next: any) => {
			console.log("serve swagger")
			next()
		},
		swaggerUI.serve,
		swaggerUI.setup(swaggerDocs, {
			customSiteTitle: swaggerDocs.info.title
		})
	)
}
