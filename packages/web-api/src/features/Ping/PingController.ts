import { Controller, Get, Route } from "@tsoa/runtime"

@Route("ping")
export class PingController extends Controller {
	@Get()
	public async ping() {
		return { pong: new Date().toISOString() }
	}
}
