import Home from "pages/Home"
import { PostRouter } from "pages/Post"
import { Route, Switch } from "react-router"

export const AppRouter = () => (
  <Switch>
    <Route path="/post/:postId">
      <PostRouter />
    </Route>
    <Route path="/post">
      <PostRouter />
    </Route>
    <Route path="/" exact>
      <Home />
    </Route>

    <Route>
      <h1>Not found</h1>
    </Route>
  </Switch>
)

export default AppRouter
