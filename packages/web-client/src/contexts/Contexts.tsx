import React from "react"
import EnvironmentCtx from "contexts/Environment"
import ReactQueryCtx from "contexts/ReactQueryCtx"
import { BrowserRouter } from "react-router-dom"

export interface IContextsProps {
	children: React.ReactNode
}

export const Contexts = ({ children }: IContextsProps) => (
	<BrowserRouter>
		<EnvironmentCtx>
			<ReactQueryCtx>{children}</ReactQueryCtx>
		</EnvironmentCtx>
	</BrowserRouter>
)

export default Contexts
