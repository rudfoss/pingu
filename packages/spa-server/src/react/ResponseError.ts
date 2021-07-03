export class ResponseError extends Error {
	public constructor(message: string, public reponse: Response) {
		super(message)
		this.name = "ResponseError"
	}
}
