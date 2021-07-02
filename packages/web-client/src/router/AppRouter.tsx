import React, { Suspense, lazy } from "react"
import ServerData from "pages/ServerData"
import Home from "pages/Home"
import { PostRouter } from "pages/Post"
import { Route, Switch } from "react-router"

const Async = lazy(() => import("features/Async"))

export const AppRouter = () => (
	<React.Suspense fallback={<p>Loading...</p>}>
		<Switch>
			<Route path="/post/:postId">
				<PostRouter />
			</Route>
			<Route path="/post">
				<PostRouter />
			</Route>
			<Route path="/serverData">
				<ServerData />
			</Route>
			<Route path="/async">
				<Async />
			</Route>
			<Route path="/" exact>
				<Home />
			</Route>

			<Route>
				<h1>Not found</h1>
			</Route>
		</Switch>
	</React.Suspense>
)

export default AppRouter
