import { isObject } from './typed'

/**
 * 在指定位置插入字符串
 *
 * insertString('hello world', 6, 'my ') -> 'hello my world'
 */
export function insert(str: string, index: number, insertStr: string): string {
  return str.substring(0, index) + insertStr + str.substring(index)
}

/**
 * 将反斜杠替换为斜杠
 */
export function slash(str: string) {
  return str.replace(/\\/g, '/')
}

/**
 * 首字母大写
 *
 * capitalize('hello')   -> 'Hello'
 */
export function capitalize(str: string): string {
  if (!str || str.length === 0)
    return ''
  const lower = str.toLowerCase()
  return lower.substring(0, 1).toUpperCase() + lower.substring(1, lower.length)
}

/**
 * 首字母大写
 *
 * pascal('hello world')   -> 'HelloWorld'
 */
export function pascal(str: string): string {
  const parts = str?.split(/[.\-\s_]/).map(x => x.toLowerCase()) ?? []
  if (parts.length === 0)
    return ''
  return parts
    .map(str => str.charAt(0).toUpperCase() + str.slice(1))
    .join('')
}

/**
 * 转驼峰命名
 *
 * camel('hello world')   -> 'helloWorld'
 */
export function camel(str: string): string {
  const parts
    = str
      ?.replace(/([A-Z])+/g, capitalize)
      ?.split(/(?=[A-Z])|[.\-\s_]/)
      .map(x => x.toLowerCase()) ?? []
  if (parts.length === 0)
    return ''
  if (parts.length === 1)
    return parts[0]
  return parts.reduce((acc, part) => {
    return `${acc}${part.charAt(0).toUpperCase()}${part.slice(1)}`
  })
}

/**
 * @link https://github.com/antfu/utils/blob/main/src/string.ts
 * Dead simple template engine, just like Python's `.format()`
 * Support passing variables as either in index based or object/name based approach
 * While using object/name based approach, you can pass a fallback value as the third argument
 *
 * @category String
 * @example
 * ```
 * const result = template(
 *   'Hello {0}! My name is {1}.',
 *   'Inès',
 *   'Anthony'
 * ) // Hello Inès! My name is Anthony.
 * ```
 *
 * ```
 * const result = namedTemplate(
 *   '{greet}! My name is {name}.',
 *   { greet: 'Hello', name: 'Anthony' }
 * ) // Hello! My name is Anthony.
 * ```
 *
 * const result = namedTemplate(
 *   '{greet}! My name is {name}.',
 *   { greet: 'Hello' }, // name isn't passed hence fallback will be used for name
 *   'placeholder'
 * ) // Hello! My name is placeholder.
 * ```
 */
export function template(
  str: string,
  object: Record<string | number, any>,
  fallback?: string | ((key: string) => string),
): string
export function template(
  str: string,
  ...args: (string | number | bigint | undefined | null)[]
): string
export function template(str: string, ...args: any[]): string {
  const [firstArg, fallback] = args

  if (isObject(firstArg)) {
    const vars = firstArg as Record<string, any>
    return str.replace(
      /{([\w\d]+)}/g,
      (_, key) =>
        vars[key]
        || ((typeof fallback === 'function' ? fallback(key) : fallback) ?? key),
    )
  }
  else {
    return str.replace(/{(\d+)}/g, (_, key) => {
      const index = Number(key)
      if (Number.isNaN(index))
        return key
      return args[index]
    })
  }
}

let idCounter: number = 0

/**
 * 递增 Id
 * @param prefix
 */
export function uniqueId(prefix?: string) {
  const id = ++idCounter
  return (prefix || '') + id
}

/**
 * 伪随机 Id
 * @param length
 */
export function randomId(length: number): string {
  let result = ''
  const characters
    = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  let counter = 0
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
    counter += 1
  }
  return result
}

/**
 * 转对象路径数组
 */
export function toPathArray(path: string): string[] {
  const regex = /\[(\d+)]/g
  return path.replace(regex, (_, number) => `.${number}.`).split('.').filter(s => s.trim())
}
