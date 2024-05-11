import { isPrimitive } from '@miyue-mma/shared/utils/typed'

/**
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
    else if (Array.isArray(target[key])) {
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
