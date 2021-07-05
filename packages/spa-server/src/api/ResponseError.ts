/**
 * The base error returned from all API client queries and mutations.
 */
export class ResponseError extends Error {
	public constructor(message: string, public reponse: Response) {
		super(message)
		this.name = "ResponseError"
	}
}
