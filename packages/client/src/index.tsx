import { setupAI } from "logging/client/setupAI"
setupAI({ instrumentationKey: process.env.APPINSIGHTS_INSTRUMENTATIONKEY! })

import { render } from "react-dom"
import App from "./App"

render(<App />, document.getElementById("app"))
