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
