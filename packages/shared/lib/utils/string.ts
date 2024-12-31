import { isObject } from './typed'

/**
 * @categoryDescription String
 * 字符串相关方法
 * @showCategories
 * @module
 */

/**
 * @category String
 * 在指定位置插入字符串
 *
 * insertString('hello world', 6, 'my ') -> 'hello my world'
 */
export function insert(str: string, index: number, insertStr: string): string {
  return str.substring(0, index) + insertStr + str.substring(index)
}

/**
 * @category String
 * 将反斜杠替换为斜杠
 */
export function slash(str: string) {
  return str.replace(/\\/g, '/')
}

/**
 * @category String
 * 首字母大写
 *
 * capitalize('hello')   -> 'Hello'
 */
export function capitalize(str: string): string {
  if (!str || str.length === 0)
    return ''
  const lower = str
  return lower.substring(0, 1).toUpperCase() + lower.substring(1, lower.length)
}

/**
 * @category String
 * 多单词首字母大写
 *
 * pascal('hello world')  -> 'HelloWorld'
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
 * @category String
 * 转驼峰命名
 *
 * camel('hello world')  -> 'helloWorld'
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
 * @category String
 *
 * @description
 * 非常简单的模板引擎，就像Python的`.format()`一样支持以基于索引或基于对象名的方法传递变量在使用基于对象名的方法时，
 * 您可以传递一个后备值作为第三个参数
 *
 * @link https://github.com/antfu/utils/blob/main/src/string.ts
 *
 * @example
 * ```
 * const result = template(
 *   'Hello {0}! My name is {1}.',
 *   'Inès',
 *   'Anthony'
 * ) // Hello Inès! My name is Anthony.
 *
 * const result = namedTemplate(
 *   '{greet}! My name is {name}.',
 *   { greet: 'Hello', name: 'Anthony' }
 * ) // Hello! My name is Anthony.
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
      /\{(\w+)\}/g,
      (_, key) =>
        vars[key]
        || ((typeof fallback === 'function' ? fallback(key) : fallback) ?? key),
    )
  }
  else {
    return str.replace(/\{(\d+)\}/g, (_, key) => {
      const index = Number(key)
      if (Number.isNaN(index))
        return key
      return args[index]
    })
  }
}

let idCounter: number = 0

/**
 * @category String
 * 递增 Id
 * @param prefix
 */
export function uniqueId(prefix?: string) {
  const id = ++idCounter
  return (prefix || '') + id
}

/**
 * @category String
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
 * @category String
 * 转对象路径数组
 * @param path 对象路径
 */
export function toPathArray(path: string): string[] {
  const regex = /\[(\d+)\]/g
  return path.replace(regex, (_, number) => `.${number}.`).split('.').filter(s => s.trim())
}
