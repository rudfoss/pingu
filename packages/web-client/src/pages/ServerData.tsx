import React from "react"
import { useServerData } from "features/ServerData"

export const ServerData = () => {
	const { serverData } = useServerData()
	return (
		<>
			<h1>Server data</h1>
			{!serverData ? (
				<p>No server data present</p>
			) : (
				<pre>
					<code>{JSON.stringify(serverData, null, 2)}</code>
				</pre>
			)}
		</>
	)
}

export default ServerData
