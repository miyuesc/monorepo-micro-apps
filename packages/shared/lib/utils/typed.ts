/**
 * @categoryDescription Typed
 * 类型判断相关方法
 * @showCategories
 * @module
 */

/**
 * 基础类型
 * @category Typed
 */
export type RawType =
  | 'string'
  | 'array'
  | 'boolean'
  | 'number'
  | 'object'
  | 'function'
  | 'regexp'
  | 'date'
  | 'symbol'
  | 'map'
  | 'set'
  | 'weakmap'
  | 'weakset'

/**
 * 获取类型字符串
 * @category Typed
 * @param value 待判断的值
 */
export const toTypeString = (value: unknown): string => Object.prototype.toString.call(value)
/**
 * 获取类型
 * @category Typed
 * @param value 待判断的值
 */
export function getRawType(value: unknown): RawType {
  return toTypeString(value).slice(8, -1).toLowerCase() as RawType
}

/**
 * 判断是否为 null
 * @category Typed
 * @param val 待判断的值
 */
export const isNull = (val: unknown): val is null => val === null
/**
 * 判断是否为 undefined
 * @category Typed
 * @param val 待判断的值
 */
export const isUndefined = (val: unknown): val is undefined => typeof val === 'undefined'
/**
 * 判断是否为 string
 * @category Typed
 * @param val 待判断的值
 */
export const isString = (val: unknown): val is string => typeof val === 'string'
/**
 * 判断是否为 boolean
 * @category Typed
 * @param val 待判断的值
 */
export const isBoolean = (val: unknown): val is boolean => typeof val === 'boolean'
/**
 * 判断是否为 number
 * @category Typed
 * @param val 待判断的值
 */
export const isNumber = (val: unknown): val is number => typeof val === 'number'
/**
 * 判断是否为 function
 * @category Typed
 * @param val 待判断的值
 */
export const isFunction = (val: unknown): val is Function => typeof val === 'function'
/**
 * 判断是否为 symbol
 * @category Typed
 * @param val 待判断的值
 */
export const isSymbol = (val: unknown): val is symbol => typeof val === 'symbol'
/**
 * 判断是否为 array
 * @category Typed
 * @param val 待判断的值
 */
export const isArray
  = Array.isArray || ((val: unknown): val is unknown[] => getRawType(val) === 'array')
/**
 * 判断是否为 Map
 * @category Typed
 * @param val 待判断的值
 */
export const isMap = (val: unknown): val is Map<any, any> => toTypeString(val) === '[object Map]'
/**
 * 判断是否为 Set
 * @category Typed
 * @param val 待判断的值
 */
export const isSet = (val: unknown): val is Set<any> => toTypeString(val) === '[object Set]'
/**
 * 判断是否为 Date
 * @category Typed
 * @param val 待判断的值
 */
export const isDate = (val: unknown): val is Date => toTypeString(val) === '[object Date]'
/**
 * 判断是否为 RegExp
 * @category Typed
 * @param val 待判断的值
 */
export const isRegExp = (val: unknown): val is RegExp => toTypeString(val) === '[object RegExp]'
/**
 * 判断是否为 WeakMap
 * @category Typed
 * @param val 待判断的值
 */
export const isWeakMap = (val: unknown): val is WeakMap<any, any> => toTypeString(val) === '[object WeakMap]'
/**
 * 判断是否为 WeakSet
 * @category Typed
 * @param val 待判断的值
 */
export const isWeakSet = (val: unknown): val is WeakSet<any> => toTypeString(val) === '[object WeakSet]'
/**
 * 判断是否为普通的 object
 * @category Typed
 * @param val 待判断的值
 */
export const isPlainObject = (val: unknown): val is object => toTypeString(val) === '[object Object]'
/**
 * 判断是否为 object 引用类型
 * @category Typed
 * @param val 待判断的值
 */
export const isObject = (val: unknown): val is Record<any, any> => val !== null && typeof val === 'object'

/**
 * 判断是否为 Promise
 * @category Typed
 * @param val 待判断的值
 */
export function isPromise<T = any>(val: unknown): val is Promise<T> {
  return (isObject(val) || isFunction(val))
    && isFunction((val as any).then)
    && isFunction((val as any).catch)
}

/**
 * 判断是否为非空原始值
 * @category Typed
 * @param value 待判断的值
 */
export function isPrimitive(value: unknown): boolean {
  return (
    value === undefined
    || value === null
    || (typeof value !== 'object' && typeof value !== 'function')
  )
}

/**
 * 判断是否为 null 或 undefined
 * @category Typed
 * @param value 待判断的值
 */
export function isNullable(value: unknown): boolean {
  return isUndefined(value) || isNull(value)
}

/**
 * 判断是否为非 null 或 undefined
 * @category Typed
 * @param value 待判断的值
 */
export function isNoNullable(value: unknown): boolean {
  return !isUndefined(value) && !isNull(value)
}

/**
 * 判断是否为非空数组
 * @category Typed
 * @param value 待判断的值
 */
export function notEmptyArray(value: unknown): boolean {
  return isArray(value) && value.length > 0
}
