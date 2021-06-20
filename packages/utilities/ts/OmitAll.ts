/**
 * Omits all properties in `TOmitters` from `TFrom`
 */
export type OmitAll<TFrom, TOmitters> = Omit<TFrom, keyof TOmitters>
