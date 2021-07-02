import { useEffect } from "react"

const isMetaKey = (str: string) => !!str.match(/^(ctrl|alt|shift|meta)$/i)

/**
 * Trigger callback on keyboard shortcut key. Specify a key combination using a
 * case-insensitive string. The following keys are supported:
 * - Character keys `q, w, e, r, ...`
 * - Number keys `1, 2, 3, ...`
 * - `Ctrl`
 * - `Shift`
 * - `Meta`
 * - `Alt`
 * - Star replaces any key `*`
 * 
 * Example:
 * ```
useShortcut("Ctrl+z", undoLast)
useShortcut("Ctrl+y", redoLast)
useShortcut("Ctrl+Alt+Del", lockMachine)
useShortcut("Meta+D", showDesktop)
useShortcut("Ctrl+Shift+*", doSomething)
 * ```
 * 
 * @param shortcut 
 * @param callback 
 */
export const useShortcut = (shortcut: string, callback: (evt: KeyboardEvent) => void) => {
	useEffect(() => {
		const keyset = shortcut.toLocaleLowerCase()
		const ctrl = keyset.indexOf("ctrl") >= 0
		const alt = keyset.indexOf("alt") >= 0
		const shift = keyset.indexOf("shift") >= 0
		const meta = keyset.indexOf("meta") >= 0
		const eachKey = keyset.split("+")
		const lastKey = eachKey[eachKey.length - 1]
		if (isMetaKey(lastKey)) throw new Error("The last key in a shortcut cannot be a meta key")

		const listener = (evt: KeyboardEvent) => {
			if (ctrl !== evt.ctrlKey) return
			if (alt !== evt.altKey) return
			if (shift !== evt.shiftKey) return
			if (meta !== evt.metaKey) return
			if (isMetaKey(evt.key)) return
			if (lastKey !== "*" && evt.key !== lastKey) return
			callback(evt)
		}

		window.addEventListener("keydown", listener)

		return () => {
			window.removeEventListener("keydown", listener)
		}
	}, [shortcut, callback])
}
