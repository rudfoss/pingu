import { SpecConfig } from "@tsoa/runtime"

const nowDate = new Date().toISOString().substr(0, 10)

export const openAPIConfig: Omit<SpecConfig, "outputDirectory"> = {
	host: "localhost:3001",
	schemes: ["https"],
	version: nowDate,
	name: "web-api example",
	description: "An example of using TSOA to build APIs with auto-generated OpenAPI spesifications",
	contact: {
		name: "Thomas Rudfoss",
		email: "thomas.rudfoss@gmail.com",
		url: "https://github.com/rudfoss/radtools"
	},
	license: "MIT"
}
