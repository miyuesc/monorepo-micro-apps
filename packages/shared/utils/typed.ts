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

export const toTypeString = (value: unknown): string => Object.prototype.toString.call(value)
export function getRawType(value: unknown): RawType {
  return toTypeString(value).slice(8, -1).toLowerCase() as RawType
}

export const isNull = (val: unknown): val is null => val === null
export const isUndefined = (val: unknown): val is undefined => typeof val === 'undefined'
export const isString = (val: unknown): val is string => typeof val === 'string'
export const isBoolean = (val: unknown): val is boolean => typeof val === 'boolean'
export const isNumber = (val: unknown): val is number => typeof val === 'number'
export const isFunction = (val: unknown): val is Function => typeof val === 'function'
export const isSymbol = (val: unknown): val is symbol => typeof val === 'symbol'
export const isArray
  = Array.isArray || ((val: unknown): val is unknown[] => getRawType(val) === 'array')
export const isMap = (val: unknown): val is Map<any, any> => toTypeString(val) === '[object Map]'
export const isSet = (val: unknown): val is Set<any> => toTypeString(val) === '[object Set]'
export const isDate = (val: unknown): val is Date => toTypeString(val) === '[object Date]'
export const isRegExp = (val: unknown): val is RegExp => toTypeString(val) === '[object RegExp]'
export const isPlainObject = (val: unknown): val is object => toTypeString(val) === '[object Object]'
export const isObject = (val: unknown): val is Record<any, any> => val !== null && typeof val === 'object'

export function isPromise<T = any>(val: unknown): val is Promise<T> {
  return (isObject(val) || isFunction(val))
    && isFunction((val as any).then)
    && isFunction((val as any).catch)
}

export function isPrimitive(value: any): boolean {
  return (
    value === undefined
    || value === null
    || (typeof value !== 'object' && typeof value !== 'function')
  )
}
