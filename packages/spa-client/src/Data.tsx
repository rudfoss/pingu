import React from "react"
import { useBuildInfo } from "api"

/**
 * Example component for loading data from the spa-server.
 * Since the spa-server has all the necessary information it produces it's own hook that connects to the ServerData context
 * whic
 * @returns
 */
export const Data = () => {
	const { data: buildInfo, isFetching } = useBuildInfo()

	if (isFetching) {
		return <p>Loading...</p>
	}

	return (
		<pre>
			<code>{JSON.stringify(buildInfo, null, 1)}</code>
		</pre>
	)
}

export default Data
