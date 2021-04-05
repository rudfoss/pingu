/**
 * Given an object with an indexed value type e.g.:
 *
 * ```
 * interface Dummy {
 *   [key: string]: string | number
 * }
 * ```
 *
 * Will extract the types of the value of keys. E.g.:
 *
 * ```
 * ExtractValueTypes<Dummy> // => string | number
 * ```
 */
export type ExtractValueTypes<T> = T[keyof T]
