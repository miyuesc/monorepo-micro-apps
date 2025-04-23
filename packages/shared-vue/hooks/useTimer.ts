import { onBeforeUnmount, ref } from 'vue'

export interface UseTimerOptions {
  /**
   * 是否立即执行
   * @default false
   */
  immediate?: boolean
  /**
   * 定时器时间
   * @default 3000
   */
  time?: number
  /**
   * 定时器类型
   * @default 'setTimeout'
   */
  destroyOnUnmount?: boolean
  /**
   * 定时器上下文
   */
  context?: any
}

export function useTimer<T>(callback: () => Promise<T>, {
  immediate = false,
  destroyOnUnmount = true,
  time = 3000,
  context = window,
}: UseTimerOptions) {
  const timer = ref<ReturnType<typeof setTimeout>>()

  const packFunc = async () => {
    const result = await callback.bind(context)()
    timer.value = setTimeout(packFunc, time)
    return result
  }

  const stop = () => {
    if (timer.value)
      clearTimeout(timer.value)
  }

  const start = () => {
    stop()
    return packFunc()
  }

  if (immediate) {
    start()
  }

  if (destroyOnUnmount) {
    onBeforeUnmount(() => {
      stop()
    })
  }

  return {
    timer,
    start,
    stop,
  }
}
