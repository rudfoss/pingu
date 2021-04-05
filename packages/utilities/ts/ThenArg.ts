/**
 * Extracts the type from a promise value and returns it.
 * E.g.:
 * ```
 *                    |----------\/
 * ThenArg<Promise<string>> -> string
 * ```
 */
export type ThenArg<T> = T extends PromiseLike<infer U> ? U : T
