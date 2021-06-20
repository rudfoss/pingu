type IfEquals<X, Y, A, B> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2
	? A
	: B

/**
 * Given a type will return only those properties which are not readonly (not getters)
 */
export type OnlyWritablePropertyNames<T> = {
	[P in keyof T]: IfEquals<{ [Q in P]: T[P] }, { -readonly [Q in P]: T[P] }, P, never>
}[keyof T]

/**
 * Give a type will return only those property names that are not functions
 */
export type OnlyNonFunctionPropertyNames<T> = {
	// eslint-disable-next-line @typescript-eslint/ban-types
	[K in keyof T]: T[K] extends Function ? never : K
}[keyof T]

export type OnlyWritable<T> = Pick<T, OnlyWritablePropertyNames<T>>
export type OnlyNonFunction<T> = Pick<T, OnlyNonFunctionPropertyNames<T>>

/**
 * Given a class or interface will only return those properties that are plain fields (no getters
 * or functions).
 *
 * @example
 * ```
 * class Example {
 * public firstName: string
 * 	public lastName: string
 * 	public get fullName() {
 * 		return `${this.firstName} ${this.lastName}`
 * 	}
 * 	public greet() {
 * 		return `Hello ${this.fullName}`
 * 	}
 * }
 *
 * const fieldsOfExample: OnlyFields<Example> = new Example()
 *
 * fieldsOfExample.firstName // Exists
 * fieldsOfExample.lastName // Exists
 * fieldsOfExample.fullName // Does not exist
 * fieldsOfExample.greet // Does not exist
 * ```
 */
export type OnlyFields<T> = OnlyNonFunction<OnlyWritable<T>>
