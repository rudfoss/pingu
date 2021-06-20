/**
 * Extracts the type from a promise value and returns it.
 * E.g.:
 * ```
 *                      |----------\/
 * ThenValue<Promise<string>> -> string
 * ```
 */
export type ThenValue<T> = T extends PromiseLike<infer U> ? U : T
