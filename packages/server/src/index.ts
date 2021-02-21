import { VALUE } from "test"

const start = async () => {
  console.log("hello world", VALUE)
  const out = ["foo", "bar"].map((v) => v + "changed")
  console.log(out)
}

start().catch((error) => {
  console.error(error, error.message)
  process.exit(1)
})
