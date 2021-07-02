import React, { useCallback, createContext, useContext, useEffect } from "react"
import { useBrowserStore } from "@radtools/utilities/react/useBrowserStore"
import { useShortcut } from "@radtools/utilities/react/useShortcut"

interface DevModeContextProps {
	devModeEnabled: boolean
	toggleDevMode: (newValue?: boolean) => void
}

declare global {
	interface Window {
		_toggleDevMode?: DevModeContextProps["toggleDevMode"]
	}
}

const DevModeContext = createContext<DevModeContextProps>({
	devModeEnabled: false,
	toggleDevMode: () => {
		throw new Error("Cannot toggleDevMode. DevMode component not present.")
	}
})
DevModeContext.displayName = "DevTools"
export const useDevMode = () => useContext(DevModeContext)

interface DevModeProps {
	/**
	 * Set this to true to disable dev mode accross the react tree. This also ignores any toggleDevMode calls.
	 */
	disabled?: boolean
	/**
	 * Specify a hotkey that can toggle the dev mode.
	 * @default "Ctrl+Alt+D"
	 */
	shortcut?: string
	/**
	 * Specify the name of the localstorage key to use to save the devtool state between refreshes.
	 * @default "radtools-devmode-enabled"
	 */
	localStoreKey?: string
	children: React.ReactNode
}

/**
 * Provides a toggle for enabling/disabling developer tools in the application. Is basically just a boolean state value
 * that persists between refreshes which react components can listen to and mount/unmount developer utilities as needed.
 * @param param0
 * @returns
 */
export const DevMode = ({
	disabled,
	localStoreKey = "radtools-devmode-enabled",
	shortcut = "Ctrl+Alt+D",
	children
}: DevModeProps) => {
	const [devModeEnabled, setDevModeEnabled] = useBrowserStore(localStoreKey, false)
	const toggleDevMode = useCallback(
		(newValue?: boolean) => {
			setDevModeEnabled(newValue ?? !devModeEnabled)
		},
		[devModeEnabled]
	)

	useShortcut(shortcut, () => toggleDevMode())
	useEffect(() => {
		window._toggleDevMode = toggleDevMode
	}, [toggleDevMode])

	if (disabled) {
		return (
			<DevModeContext.Provider value={{ devModeEnabled: false, toggleDevMode }}>{children}</DevModeContext.Provider>
		)
	}
	return <DevModeContext.Provider value={{ devModeEnabled, toggleDevMode }}>{children}</DevModeContext.Provider>
}

export default React.memo(DevMode)
