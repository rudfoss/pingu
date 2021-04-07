import { Request as ERequest } from "express"
import { Controller, Get, Request, Route } from "@tsoa/runtime"

@Route("echo")
export class EchoController extends Controller {
	@Get()
	public async echo(@Request() request: ERequest) {
		return { message: request.body }
	}
}
