const analytics = () => import("analytics")

import { render } from "react-dom"
import App from "./App"

render(<App />, document.getElementById("app"))
analytics()
