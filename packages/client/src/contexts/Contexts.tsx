import EnvironmentCtxProvider from "contexts/Environment"
import SSR from "contexts/SSR"
import { BrowserRouter } from "react-router-dom"

export interface IContextsProps {
  children: React.ReactNode
}

export const Contexts = ({ children }: IContextsProps) => (
  <BrowserRouter>
    <EnvironmentCtxProvider>
      <SSR includeDevTools>{children}</SSR>
    </EnvironmentCtxProvider>
  </BrowserRouter>
)

export default Contexts
