import { isPlainObject } from './typed'

const nativeMax = Math.max
const nativeMin = Math.min

/**
 * 定时器
 */
type CancelablePromise = Promise<any> & { cancel: any }
export function sleep(timeout: number): CancelablePromise {
  let res: (v: string) => void
  let timer: ReturnType<typeof setTimeout> | undefined
  const promise = new Promise((resolve) => {
    res = resolve
    timer = setTimeout(() => {
      resolve('done')
    }, timeout)
  }) as CancelablePromise
  const cancel = function (data: string) {
    res(data)
    clearTimeout(timer)
  }
  promise.cancel = cancel
  return promise
}

/**
 * 防抖
 */
interface DebounceOptions {
  maxWait?: number
  leading?: boolean
  trailing?: boolean
}
export function debounce<T extends (...args: unknown[]) => unknown>(func: T, wait: number, options?: DebounceOptions) {
  let lastArgs: unknown[] | undefined
  let lastThis: any
  let maxWait: number
  let result: unknown
  let timerId: ReturnType<typeof setTimeout> | undefined
  let lastCallTime: number | undefined
  let lastInvokeTime: number = 0
  let leading: boolean = false
  let maxing: boolean = false
  let trailing: boolean = true

  wait = wait || 0
  if (isPlainObject(options)) {
    leading = !!options.leading
    maxing = 'maxWait' in options
    maxWait = maxing ? nativeMax(options.maxWait || 0, wait) : 0
    trailing = 'trailing' in options ? !!options.trailing : trailing
  }

  function invokeFunc(time: number) {
    const args = lastArgs
    const thisArg = lastThis
    lastArgs = lastThis = undefined
    lastInvokeTime = time
    result = func.apply(thisArg, args!)
    return result
  }

  function leadingEdge(time: number) {
    lastInvokeTime = time
    timerId = setTimeout(timerExpired, wait)
    return leading ? invokeFunc(time) : result
  }

  function remainingWait(time: number) {
    const timeSinceLastCall = time - lastCallTime!
    const timeSinceLastInvoke = time - lastInvokeTime
    const result = wait - timeSinceLastCall

    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result
  }

  function shouldInvoke(time: number) {
    const timeSinceLastCall = time - lastCallTime!
    const timeSinceLastInvoke = time - lastInvokeTime
    return (lastCallTime === undefined || (timeSinceLastCall >= wait)
      || (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait))
  }

  function timerExpired() {
    const time = Date.now()
    if (shouldInvoke(time))
      return trailingEdge(time)
    timerId = setTimeout(timerExpired, remainingWait(time))
  }

  function trailingEdge(time: number) {
    timerId = undefined

    if (trailing && lastArgs)
      return invokeFunc(time)

    lastArgs = lastThis = undefined
    return result
  }

  function cancel() {
    if (timerId !== undefined)
      clearTimeout(timerId)

    lastInvokeTime = 0
    lastArgs = lastCallTime = lastThis = timerId = undefined
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(Date.now())
  }

  function debounced(this: any, ...cargs: unknown[]) {
    const time = Date.now()
    const isInvoking = shouldInvoke(time)

    lastArgs = cargs
    // eslint-disable-next-line ts/no-this-alias
    lastThis = this
    lastCallTime = time

    if (isInvoking) {
      if (timerId === undefined)
        return leadingEdge(lastCallTime)

      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait)
        return invokeFunc(lastCallTime)
      }
    }
    if (timerId === undefined)
      timerId = setTimeout(timerExpired, wait)

    return result
  }
  debounced.cancel = cancel
  debounced.flush = flush
  return debounced
}

/**
 * 节流
 */
interface ThrottleOptions {
  leading?: boolean
  trailing?: boolean
}
export function throttle<T extends (...args: unknown[]) => unknown>(func: T, wait: number, options?: ThrottleOptions) {
  let leading = true
  let trailing = true

  if (isPlainObject(options)) {
    leading = 'leading' in options ? !!options.leading : leading
    trailing = 'trailing' in options ? !!options.trailing : trailing
  }
  return debounce(func, wait, {
    leading,
    maxWait: wait,
    trailing,
  })
}
