import Nav from "features/Nav"
import AppRouter from "router/AppRouter"
import Contexts from "contexts"

export const App = () => (
	<Contexts>
		<Nav />
		<AppRouter />
	</Contexts>
)

export default App
