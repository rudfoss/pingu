/**
 * Return only optional properties of a type i.e. properties marked with ?.
 */
export type OptionalPropertyOf<T extends object> = Exclude<
	{
		[K in keyof T]: T extends Record<K, T[K]> ? never : K
	}[keyof T],
	undefined
>
