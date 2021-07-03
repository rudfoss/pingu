import Data from "Data"
import React from "react"
import { ServerData } from "api"

export const App = () => {
	return (
		<ServerData baseUrl="http://localhost:3000/api">
			<h1>Hello</h1>
			<Data />
		</ServerData>
	)
}

export default App
