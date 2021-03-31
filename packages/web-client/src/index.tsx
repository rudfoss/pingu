import { StrictMode } from "react"
import { render } from "react-dom"
import App from "./App"

const analytics = () => import("analytics")

render(
	<StrictMode>
		<App />
	</StrictMode>,
	document.getElementById("app")
)
analytics()
