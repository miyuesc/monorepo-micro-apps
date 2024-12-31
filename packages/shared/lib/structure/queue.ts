/**
 * @category Queue
 * 队列
 * @showCategories
 * @module
 */

/**
 * @category Queue
 * 队列配置
 * @property maxLength 最大长度
 */
export interface QueueConfig {
  maxLength: number
}

/**
 * @class Queue
 * 队列
 */
export class Queue<T> {
  _config: QueueConfig
  _queue: T[]

  /**
   * @param config 队列配置
   * @param preset 预设数据
   */
  constructor(config: QueueConfig, preset: T[] = []) {
    this._config = config
    this._queue = [...preset]
  }

  /**
   * 清空队列
   */
  clear() {
    this._queue = []
    return this
  }

  /**
   * 获取队列的大小
   */
  size() {
    return this._queue.length
  }

  /**
   * 判断队列是否为空
   */
  isEmpty() {
    return this.size() === 0
  }

  /**
   * 入队列
   * @param element 入队列元素
   */
  enter(element: T) {
    if (this.size() >= this._config.maxLength)
      return this

    this._queue.push(element)
    return this
  }

  /**
   * 出队列
   */
  out() {
    return this._queue.shift()
  }

  /**
   * 获取队列数据
   */
  get() {
    return this._queue
  }

  /**
   * 获取队列头部元素
   */
  peek() {
    return this._queue[0]
  }
}
