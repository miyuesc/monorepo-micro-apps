/**
 * @categoryDescription Typed
 * 类型判断相关方法
 * @showCategories
 * @module
 */

/**
 * @category Typed
 * 基础类型
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
 * @category Typed
 * 获取类型字符串
 * @param value 待判断的值
 */
export const toTypeString = (value: unknown): string => Object.prototype.toString.call(value)
/**
 * @category Typed
 * 获取类型
 * @param value 待判断的值
 */
export function getRawType(value: unknown): RawType {
  return toTypeString(value).slice(8, -1).toLowerCase() as RawType
}

/**
 * @category Typed
 * 判断是否为 null
 * @param val 待判断的值
 */
export const isNull = (val: unknown): val is null => val === null
/**
 * @category Typed
 * 判断是否为 undefined
 * @param val 待判断的值
 */
export const isUndefined = (val: unknown): val is undefined => typeof val === 'undefined'
/**
 * @category Typed
 * 判断是否为 string
 * @param val 待判断的值
 */
export const isString = (val: unknown): val is string => typeof val === 'string'
/**
 * @category Typed
 * 判断是否为 boolean
 * @param val 待判断的值
 */
export const isBoolean = (val: unknown): val is boolean => typeof val === 'boolean'
/**
 * @category Typed
 * 判断是否为 number
 * @param val 待判断的值
 */
export const isNumber = (val: unknown): val is number => typeof val === 'number'
/**
 * @category Typed
 * 判断是否为 function
 * @param val 待判断的值
 */
export const isFunction = (val: unknown): val is Function => typeof val === 'function'
/**
 * @category Typed
 * 判断是否为 symbol
 * @param val 待判断的值
 */
export const isSymbol = (val: unknown): val is symbol => typeof val === 'symbol'
/**
 * @category Typed
 * 判断是否为 array
 * @param val 待判断的值
 */
export const isArray
  = Array.isArray || ((val: unknown): val is unknown[] => getRawType(val) === 'array')
/**
 * @category Typed
 * 判断是否为 Map
 * @param val 待判断的值
 */
export const isMap = (val: unknown): val is Map<any, any> => toTypeString(val) === '[object Map]'
/**
 * @category Typed
 * 判断是否为 Set
 * @param val 待判断的值
 */
export const isSet = (val: unknown): val is Set<any> => toTypeString(val) === '[object Set]'
/**
 * @category Typed
 * 判断是否为 Date
 * @param val 待判断的值
 */
export const isDate = (val: unknown): val is Date => toTypeString(val) === '[object Date]'
/**
 * @category Typed
 * 判断是否为 RegExp
 * @param val 待判断的值
 */
export const isRegExp = (val: unknown): val is RegExp => toTypeString(val) === '[object RegExp]'
/**
 * @category Typed
 * 判断是否为 WeakMap
 * @param val 待判断的值
 */
export const isWeakMap = (val: unknown): val is WeakMap<any, any> => toTypeString(val) === '[object WeakMap]'
/**
 * @category Typed
 * 判断是否为 WeakSet
 * @param val 待判断的值
 */
export const isWeakSet = (val: unknown): val is WeakSet<any> => toTypeString(val) === '[object WeakSet]'
/**
 * @category Typed
 * 判断是否为普通的 object
 * @param val 待判断的值
 */
export const isPlainObject = (val: unknown): val is object => toTypeString(val) === '[object Object]'
/**
 * @category Typed
 * 判断是否为 object 引用类型
 * @param val 待判断的值
 */
export const isObject = (val: unknown): val is Record<any, any> => val !== null && typeof val === 'object'

/**
 * @category Typed
 * 判断是否为 Promise
 * @param val 待判断的值
 */
export function isPromise<T = any>(val: unknown): val is Promise<T> {
  return (isObject(val) || isFunction(val))
    && isFunction((val as any).then)
    && isFunction((val as any).catch)
}

/**
 * @category Typed
 * 判断是否为非空原始值
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
 * @category Typed
 * 判断是否为 null 或 undefined
 * @param value 待判断的值
 */
export function isNullable(value: unknown): boolean {
  return isUndefined(value) || isNull(value)
}

/**
 * @category Typed
 * 判断是否为非 null 或 undefined
 * @param value 待判断的值
 */
export function isNoNullable(value: unknown): boolean {
  return !isUndefined(value) && !isNull(value)
}

/**
 * @category Typed
 * 判断是否为非空数组
 * @param value 待判断的值
 */
export function notEmptyArray(value: unknown): boolean {
  return isArray(value) && value.length > 0
}
