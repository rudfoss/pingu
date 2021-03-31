import { useEnvironmentCtx } from "contexts/Environment"

export const Env = () => {
  const env = useEnvironmentCtx()
  return (
    <pre>
      <code>{JSON.stringify(env, null, 2)}</code>
    </pre>
  )
}

export default Env
