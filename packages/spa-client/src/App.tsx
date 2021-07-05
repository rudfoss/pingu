import Data from "Data"
import React from "react"
import { ServerData, QueryClientConfig } from "api"

const queryClientConfig: QueryClientConfig = {
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false
		}
	}
}

export const App = () => {
	return (
		<ServerData baseUrl="http://localhost:3001/api" queryClientConfig={queryClientConfig}>
			<h1>Hello</h1>
			<Data />
		</ServerData>
	)
}

export default App
