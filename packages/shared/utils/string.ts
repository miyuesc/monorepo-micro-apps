/**
 * 在指定位置插入字符串
 *
 * insertString('hello world', 6, 'my ') -> 'hello my world'
 */
export function insert(str: string, index: number, insertStr: string): string {
  return str.substring(0, index) + insertStr + str.substring(index)
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
  return parts.map(str => str.charAt(0).toUpperCase() + str.slice(1)).join('')
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
