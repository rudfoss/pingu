/**
 *  * Allows easy attachment of state setters to change events on `<input>` elements. Wraps the event handler and triggers
 * the provided `onChange` function on every change. Optionally filter out unwanted changes using the filter function.
 *
 * Works with `<input>`, `<textarea>` and `<select>` elements.
 *
 * @example
 * ```
 * const [name, setName] = useState("")
 * <input type="text" value={name} onChange={onChangeState(setName)} />
 * ```
 *
 * @example
 * ```tsx
 * const [isSubscribed, setIsSubscribed] = useState(false)
 * <input type="checkbox" checked={isSubscribed} onChange={onChangeState(setIsSubscribed, "checked")} />
 * ```
 * @param onChange A function that will receive the new value on every (non-filtered) change
 * @param prop The property that contains the value on the event target. E.g.: `value` | `checked`
 * @param filter An optional filter to ignore certain changes
 * @returns
 */
export const onChangeState =
	<TValueType = string>(
		onChange: (
			newValue: TValueType,
			evt: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
		) => unknown,
		prop = "value",
		filter?: (
			newValue: TValueType,
			evt: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
		) => boolean
	) =>
	(evt: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
		const newValue: TValueType = (evt.target as any)[prop]
		if (filter && !filter(newValue, evt)) return
		onChange(newValue, evt)
	}
