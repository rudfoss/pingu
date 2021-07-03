import React, { createContext, useMemo, useContext, useState } from "react"
import { QueryClientProvider, QueryClient } from "react-query"

interface ServerDataContextProps {
	baseUrl: string
	serverData?: any
}

const ServerDataContext = createContext<ServerDataContextProps>(undefined as any)
ServerDataContext.displayName = "ServerDataContext"
export const useServerData = () => {
	const ctx = useContext(ServerDataContext)
	if (!ctx) {
		throw new Error("useServerData cannot be used outside of <ServerData>")
	}
	return ctx
}

export interface ServerDataProps {
	baseUrl?: string
	queryClientConfig?: ConstructorParameters<typeof QueryClient>[0]
	children: React.ReactNode
}

/**
 * Context provider for loading server data from global variable and preparing all react-query handlers for use.
 * @param param0
 * @returns
 */
export const ServerData = ({ baseUrl: baseUrlProp, queryClientConfig, children }: ServerDataProps) => {
	const [queryClient] = useState(() => new QueryClient(queryClientConfig))
	const baseUrl = useMemo(() => {
		return baseUrlProp ?? location.origin
	}, [baseUrlProp])

	return (
		<ServerDataContext.Provider value={{ baseUrl }}>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</ServerDataContext.Provider>
	)
}

export default React.memo(ServerData)
