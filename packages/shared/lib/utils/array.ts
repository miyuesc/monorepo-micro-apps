import { isString, notEmptyArray } from './typed'

/**
 * 生成指定长度数组
 * @category Array
 * @param length
 * @param formatter
 */
export function create<T>(length: number, formatter?: (idx?: number) => T): T[] {
  return Array.from({ length }, (_, index) => formatter ? formatter(index) : index as T)
}

/**
 * 数组去重
 * @category Array
 */
export function unique<T>(array: T[]): T[] {
  return [...new Set(array)]
}

/**
 * 数组差异项
 * @category Array
 */
export function diff<T>(source: T[] = [], target: T[] = []): T[] {
  if (!source.length)
    return target.slice()

  if (!target.length)
    return source.slice()

  return source.filter(item => !target.includes(item))
}

/**
 * 随机打乱数组
 * @category Array
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
 * @category Array
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

/**
 * @category Array
 */
export interface FlatProps {
  children?: string
  depth?: number
  currentDepth?: number
  removeChildren?: boolean
}

/**
 * 对象数组扁平化
 * @category Array
 * @param data 源对象数组
 * @param props 配置项
 */
export function flat<T extends Record<string, unknown>>(data: T[], props: FlatProps = {}): T[] {
  const result: T[] = []

  const { children = 'children', depth = Number.POSITIVE_INFINITY, currentDepth = 0, removeChildren = false } = props

  for (const datum of data) {
    result.push(datum)

    if (currentDepth < depth && notEmptyArray(datum[children]))
      result.push(...flat(datum[children] as T[], { children, depth, currentDepth: currentDepth + 1, removeChildren }))

    if (removeChildren)
      Reflect.deleteProperty(datum, children)
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
 * @category Array
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
 * @category Array
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

/**
 * 对数组进行排序并返回前 n 个元素
 * @category Array
 */
export function sortWith<T extends Record<string, unknown>>(articles: T[], key: keyof T, len: number = 10) {
  const copyArr = articles.slice()
  return copyArr.sort((a, b) => (b[key] as number) - (a[key] as number)).slice(0, len)
}

export interface TreeArrayProps {
  children?: string
  traversal?: 'depth' | 'breadth'
}
/**
 * 在树形数组中查找指定元素
 * @category Array
 */
export function findInTree<T extends Record<string, unknown>>(tree: T[], finder: (i: T, idx: number) => boolean, props: TreeArrayProps = {}): T | undefined {
  const { children = 'children', traversal = 'depth' } = props

  const len = tree.length

  if (traversal === 'depth') {
    for (let i = 0; i < len; i++) {
      const item = tree[i]
      if (finder(item, i))
        return item
      if (notEmptyArray(item[children])) {
        const result = findInTree(item[children] as T[], finder, props)
        if (result)
          return result
      }
    }
    return undefined
  }

  const queue: T[] = [...tree]
  while (queue.length) {
    const item = queue.shift()

    if (!item)
      return undefined

    if (finder(item, 0))
      return item

    if (notEmptyArray(item[children]))
      queue.push(...item[children] as T[])
  }
}
