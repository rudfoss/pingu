import React from "react"
import Nav from "features/Nav"
import AppRouter from "router/AppRouter"
import { BrowserRouter } from "react-router-dom"
import DevMode from "features/DevMode"
import ServerData from "features/ServerData"
import ReactQuery from "features/ReactQuery"

export const App = () => (
	<DevMode>
		<BrowserRouter>
			<ServerData>
				<ReactQuery>
					<Nav />
					<AppRouter />
				</ReactQuery>
			</ServerData>
		</BrowserRouter>
	</DevMode>
)

export default App
