import React from "react"
import { QueryClientProvider, QueryClient } from "react-query"
import { Hydrate } from "react-query/hydration"
import { ReactQueryDevtools } from "react-query/devtools"

declare global {
  interface Window {
    appState: any
  }
}

interface SSRProps {
  includeDevTools?: boolean
  children: React.ReactNode
}

/**
 * The SSR component provides a way to hydrate the react-query state from a server. It will attempt to read SSR state
 * from `window.appState` and populate the react-query client with this data.
 * @returns
 */
export const SSR = ({ children, includeDevTools = false }: SSRProps) => {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      {includeDevTools && <ReactQueryDevtools />}
      <Hydrate state={window.appState ?? {}}>{children}</Hydrate>
    </QueryClientProvider>
  )
}

export default React.memo(SSR)
