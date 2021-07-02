import { Controller, Get, Route } from "@tsoa/runtime"
import { Test } from "../../types/constEnumTest"

@Route("_enum")
export class EnumController extends Controller {
	@Get()
	public async enum() {

		const enumTest = Test.a

		await new Promise((res) => setTimeout(res, 1000))
		return { ok: true, enum: enumTest }
	}
}
