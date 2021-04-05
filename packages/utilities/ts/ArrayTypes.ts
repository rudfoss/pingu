// Ref: https://github.com/microsoft/TypeScript/issues/28046

/**
 * Transforms array of types into distinct types with or relationship.
 * e.g.:
 * ElementType<(A | B | C)[]>
 *
 * A | B | C
 */
export type ArrayTypes<
	T extends ReadonlyArray<unknown>
> = T extends ReadonlyArray<infer ArrayTypes> ? ArrayTypes : never
