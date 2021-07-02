import { useDevMode } from "features/DevMode"
import React, { useState } from "react"
import { QueryClient, QueryClientProvider } from "react-query"
import { Hydrate } from "react-query/hydration"
import { ReactQueryDevtools } from "react-query/devtools"
import { useServerData } from "features/ServerData"

export interface ReactQueryProps {
	/**
	 * Configure the query client on initial mount. Changes to the config object are ignored.
	 */
	config?: ConstructorParameters<typeof QueryClient>[0]
	children: React.ReactNode
}

export const ReactQuery = ({ config, children }: ReactQueryProps) => {
	const { devModeEnabled } = useDevMode()
	const { serverData } = useServerData()
	const [queryClient] = useState(() => new QueryClient(config))

	return (
		<QueryClientProvider client={queryClient}>
			<Hydrate state={serverData?.reactQueryCache}>
				{devModeEnabled && <ReactQueryDevtools />}
				{children}
			</Hydrate>
		</QueryClientProvider>
	)
}

export default React.memo(ReactQuery, (p, n) => Object.is(p.children, n.children))
