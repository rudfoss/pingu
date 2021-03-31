import { createContext, useContext } from "react"

export interface EnvironmentCtxProps {
  nodeEnv: string
  buildTime: string
}

export const EnvironmentCtx = createContext<EnvironmentCtxProps>(undefined as any)

export const useEnvironmentCtx = () => {
  const ctx = useContext(EnvironmentCtx)
  if (!ctx) {
    throw new Error(`EnvironmentCtx must be provided before use`)
  }

  return ctx
}
