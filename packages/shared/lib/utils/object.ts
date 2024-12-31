import { toPathArray } from './string'
import { isArray, isNoNullable, isNullable, isPrimitive, isString, notEmptyArray } from './typed'

/**
 * @categoryDescription Object
 * 对象相关方法
 * @showCategories
 * @module
 */

/**
 * @category Object
 * 简易合并两个对象（仅合并第一层，如果第一层是引用类型，则会浅拷贝第二个参数同源属性）
 * @param {object} target
 * @param {object} source
 *
 * @return { object }
 */
export function simpleMerge<T extends object>(target: T | Partial<T>, source: T): T {
  for (const key in source) {
    if (!target[key]) {
      target[key] = source[key]
    }
    else if (isArray(target[key])) {
      ;(target[key] as any[]) = [...new Set([...(source[key] as any[]), ...(target[key] as any[])])]
    }
    else if (typeof target[key] === 'object') {
      ;(target[key] as Record<string, unknown>) = {
        ...(source[key] as Record<string, unknown>),
        ...(target[key] as Record<string, unknown>),
      }
    }
  }
  return target as T
}

/**
 * @category Object
 * 深拷贝
 * @param { object } obj
 * @param { [object] } hash
 * @return { object }
 */
export function deepClone<T>(obj: T, hash = new WeakMap()): T {
  if (isPrimitive(obj))
    return obj

  if (typeof obj === 'function')
    return obj.bind({})

  if (obj instanceof Date)
    return new Date(obj) as T

  if (obj instanceof RegExp)
    return new RegExp(obj) as T

  // 是对象的话就要进行深拷贝
  if (hash.get(obj as WeakKey))
    return hash.get(obj as WeakKey) as T

  const newObj = new ((obj as object).constructor as { new (): T })()

  // 处理循环引用
  hash.set(obj as WeakKey, newObj)

  for (const key of Object.getOwnPropertyNames(obj))
    (newObj as Record<string, unknown>)[key] = deepClone((obj as Record<string, unknown>)[key], hash)

  return newObj
}

export interface TreeNode {
  [key: string]: TreeNode[] | unknown
}

export interface FlatChildrenKeysProps {
  key?: string
  children?: string
}
/**
 * @category Object
 * 获取一个树节点的所有子节点数组 ( 场景：将一个组织的 code 与该组织的子组织 code 合并到一个数组 )
 * @param {object} node 包含子节点的数据对象
 * @param { ?{children?: string, key?: string}} props 默认关键字
 * @return { Array[string] } 关键字数组
 */
export function flatChildrenKeywords(node: TreeNode, props: FlatChildrenKeysProps = {}): string[] {
  const { key = 'id', children = 'children' } = props
  const result: string[] = []

  node[key] && result.push(node[key] as string)

  if (notEmptyArray(node[children])) {
    const childNodes = node[children] as TreeNode[]
    childNodes.reduce((target, child) => {
      if (notEmptyArray(child[children]))
        target.push(...flatChildrenKeywords(child, props))
      else
        child[key] && result.push(child[key] as string)

      return result
    }, result)
  }

  return result
}

/**
 * @category Object
 * 判断对象是否具有指定路径的属性
 * @param {object} obj 待判断对象
 * @param {string|string[]} path 属性路径
 */
export function has(obj: Record<string, any>, path: string | string[]): boolean {
  if (!isNoNullable(obj))
    return false
  if (isString(path)) {
    if (obj[path])
      return true
    path = toPathArray(path)
  }
  else {
    path = path.map(toPathArray).flat()
  }

  const len = path.length
  let current: any = obj
  let idx: number = 0

  while (idx < len) {
    current = current[path[idx]]

    if (isNullable(current))
      return false

    idx++
  }

  return isNoNullable(current)
}
