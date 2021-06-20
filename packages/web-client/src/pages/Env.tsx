import React from "react"
import { useEnvironmentCtx } from "contexts/Environment"
import { omit } from "@radtools/utilities/generic/omit"

export const Env = () => {
	const env = useEnvironmentCtx()
	const lessEnv = omit(env, ["buildTime"]) // Example of using external util
	return (
		<>
			<pre>
				<code>{JSON.stringify(env, null, 2)}</code>
			</pre>
			<pre>
				<code>{JSON.stringify(lessEnv, null, 2)}</code>
			</pre>
		</>
	)
}

export default Env
