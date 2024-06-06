/**
 * Promise, or maybe not
 */
export type Awaitable<T> = T | PromiseLike<T>

/**
 * Null or whatever
 */
export type Nullable<T> = T | null | undefined

/**
 * Array, or not yet
 */
export type Arrayable<T> = T | Array<T>

/**
 * Constructor
 */
export type Constructor<T = void> = new (...args: any[]) => T

/**
 * Infers the element type of an array
 */
export type ElementOf<T> = T extends (infer E)[] ? E : never
