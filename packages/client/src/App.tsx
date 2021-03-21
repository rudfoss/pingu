import Nav from "features/Nav"
import { SSR } from "features/SSR/SSR"
import { BrowserRouter } from "react-router-dom"
import AppRouter from "router/AppRouter"

export const App = () => (
  <BrowserRouter>
    <SSR includeDevTools={true}>
      <Nav />
      <AppRouter />
    </SSR>
  </BrowserRouter>
)

export default App
