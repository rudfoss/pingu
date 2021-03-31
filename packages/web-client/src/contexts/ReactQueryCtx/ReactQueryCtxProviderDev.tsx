import React, { useRef } from "react"
import { QueryClientProvider, QueryClient } from "react-query"
import { Hydrate } from "react-query/hydration"
import { ReactQueryDevtools } from "react-query/devtools"

declare global {
	interface Window {
		appState: any
	}
}

export interface ReactQueryCtxProviderProps {
	children: React.ReactNode
}

export const ReactQueryCtxProvider = ({ children }: ReactQueryCtxProviderProps) => {
	const queryClient = useRef(new QueryClient())
	return (
		<QueryClientProvider client={queryClient.current}>
			<ReactQueryDevtools />
			<Hydrate state={window.appState ?? {}}>{children}</Hydrate>
		</QueryClientProvider>
	)
}

export default React.memo(ReactQueryCtxProvider)
