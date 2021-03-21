import React from "react"
import { EnvironmentCtxProps, EnvironmentCtx } from "./EnvironmentCtx"

const value: EnvironmentCtxProps = {
  buildTime: process.env.BUILD_TIME ?? "",
  nodeEnv: process.env.NODE_ENV ?? ""
}

export interface IEnvironmentCtxProviderProps {
  children: React.ReactNode
}

export const EnvironmentCtxProvider = ({ children }: IEnvironmentCtxProviderProps) => (
  <EnvironmentCtx.Provider value={value}>{children}</EnvironmentCtx.Provider>
)

export default React.memo(EnvironmentCtxProvider)
