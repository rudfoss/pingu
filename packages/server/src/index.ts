import { VALUE } from "test"

const start = async () => {
	console.log("hello world", VALUE)
}

start().catch((error) => {
	console.error(error, error.message)
	process.exit(1)
})