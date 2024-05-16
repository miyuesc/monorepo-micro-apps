import { isString, notEmptyArray } from './typed'

/**
 * 生成指定长度数组
 * @param length
 * @param formatter
 */
export function create<T>(length: number, formatter?: (idx?: number) => T): T[] {
  return Array.from({ length }, (_, index) => formatter ? formatter(index) : index as T)
}

/**
 * 随机打乱数组
 * @param array
 */
export function shuffle<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

export type PartitionFilter<T> = (i: T, idx: number, arr: readonly T[]) => any

/**
 * 根据条件拆分数组
 * @param array
 * @param filters
 */
export function partition<T>(array: readonly T[], ...filters: PartitionFilter<T>[]): Array<T[]> & { length: typeof filters['length'] } {
  const result: T[][] = Array.from({ length: filters.length + 1 }).fill(null).map(() => [])

  array.forEach((e, idx, arr) => {
    let i = 0
    for (const filter of filters) {
      if (filter(e, idx, arr)) {
        result[i].push(e)
        return
      }
      i += 1
    }
    result[i].push(e)
  })
  return result
}

export interface FlatProps {
  children?: string
  depth?: number
  currentDepth?: number
  removeChildren?: boolean
}
/**
 * 对象数组扁平化
 * @param data 源对象数组
 * @param props 配置项
 */
export function flat<T extends Record<string, unknown>>(data: T[], props: FlatProps = {}): T[] {
  const result: T[] = []

  const { children = 'children', depth = Number.POSITIVE_INFINITY, currentDepth = 0, removeChildren = false } = props

  for (const datum of data) {
    if (removeChildren)
      Reflect.deleteProperty(datum, children)

    result.push(datum)

    if (currentDepth < depth && notEmptyArray(datum[children]))
      result.push(...flat(datum[children] as T[], { children, depth, currentDepth: currentDepth + 1, removeChildren }))
  }

  return result
}

export interface ToMapProps {
  useBoolean?: boolean
  useFlat?: boolean
  flatOptions?: FlatProps
}
/**
 * 转成对象结构
 * @param data
 * @param key
 * @param props
 */
export function toMap<T extends Record<string, unknown>>(data: T[], key: string, props: ToMapProps = {}) {
  const { useBoolean = false, useFlat = false, flatOptions } = props

  const result: Record<string, T | boolean> = {}

  const sources = useFlat ? flat(data, flatOptions) : data

  for (const source of sources) {
    const itemKey = source[key]
    if (isString(itemKey))
      result[itemKey] = useBoolean ? true : source
  }

  return result
}

export interface GenerateLabelProps {
  key?: string
  label?: string
  children?: string
  splice?: boolean
  separator?: string
  hideFirst?: boolean
}
/**
 * 根据指定值，将指定属性名组装为字符串
 * @param data
 * @param value
 * @param props
 */
export function generateLabel<T extends Record<string, unknown>>(data: T[], value: unknown, props: GenerateLabelProps = {}): string | undefined {
  const { key = 'id', label = 'label', children = 'children', splice = true, separator = '/', hideFirst } = props

  for (const node of data) {
    if (node[key] === value)
      return node[label] as string

    if (notEmptyArray(node[children])) {
      const result = generateLabel(node[children] as T[], value, { ...props, hideFirst: false })
      if (result) {
        if (hideFirst)
          return result

        return splice ? `${node[label]}${separator}${result}` : result
      }
    }
  }

  return undefined
}
