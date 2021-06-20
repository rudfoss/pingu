/**
 * Triggers the provided onBlur function once foucs leaves the HTML element
 * the onBlurDeep handler is attached to.
 * The container elmeent MUST have a tabIndex to work.
 *
 * Usage:
 * ```
 * <div tabIndex="-1" onBlur={onBlurDeep(onBlur)}>
 *   <div>
 *     <input type="text"/>
 *   </div>
 * </div>
 * ```
 */
export const onBlurDeep = (
	onBlur?: (event: React.FocusEvent<HTMLElement>) => void
) => (evt: React.FocusEvent<HTMLElement>) => {
	if (!onBlur) return
	const currentTarget = evt.currentTarget
	setTimeout(() => {
		if (!currentTarget.contains(document.activeElement)) {
			onBlur(evt)
		}
	}, 0)
}
