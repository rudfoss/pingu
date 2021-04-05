import { Controller, Get, Route } from "tsoa"

@Route("_health")
export class HealthController extends Controller {
	@Get()
	public async health() {
		await new Promise((res) => setTimeout(res, 1000))
		return { ok: true, time: new Date().toISOString() }
	}
}
