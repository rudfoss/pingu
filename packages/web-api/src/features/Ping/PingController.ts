import { Controller, Get, Route } from "tsoa"

@Route("ping")
export class PingController extends Controller {
	@Get()
	public async ping() {
		return { pong: new Date().toISOString() }
	}
}
