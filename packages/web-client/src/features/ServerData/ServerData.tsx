import React, { createContext, useContext, useState } from "react"
import { ServerData as ServerDataObject } from "@radtools/web-server/src/serverData/ServerData"

declare global {
	interface Window {
		__RADTOOLS__SERVER__STATE___?: ServerDataObject
	}
}

interface ServerDataContextProps {
	serverData?: ServerDataObject
	setServerData: (newData?: ServerDataObject) => void
}

const ServerDataContext = createContext<ServerDataContextProps>({
	setServerData: () => {
		throw new Error("Cannot setServerData. ServerData component not present.")
	}
})
ServerDataContext.displayName = "ServerData"

export const useServerData = () => useContext(ServerDataContext)

interface ServerDataProps {
	/**
	 * Specify an initial value for the server data. This prop is only used on the first mount and any changes later
	 * are ignored.
	 */
	initialData?: ServerDataObject
	children: React.ReactNode
}

/**
 * Exposes server data in a context object.
 * @param param0
 * @returns
 */
export const ServerData = ({ initialData, children }: ServerDataProps) => {
	const [serverData, setServerData] = useState<ServerDataObject | undefined>(() => {
		// Hopefully handles environments where window is not defined.
		if (typeof window === "undefined") {
			return initialData
		}
		return window.__RADTOOLS__SERVER__STATE___
	})

	return <ServerDataContext.Provider value={{ serverData, setServerData }}>{children}</ServerDataContext.Provider>
}

export default React.memo(ServerData, (prevProps, nextProps) => Object.is(prevProps.children, nextProps.children))
