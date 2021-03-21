import Nav from "features/Nav"
import { BrowserRouter } from "react-router-dom"
import AppRouter from "router/AppRouter"

export const App = () => (
  <BrowserRouter>
    <Nav />
    <AppRouter />
  </BrowserRouter>
)

export default App
