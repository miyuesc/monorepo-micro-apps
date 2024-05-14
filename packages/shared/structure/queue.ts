export interface QueueConfig {
  maxLength: number
}

class Queue {
  _config: QueueConfig
  _queue: unknown[]

  constructor(config: QueueConfig, preset: unknown[] = []) {
    this._config = config
    this._queue = [...preset]
  }

  clear() {
    this._queue = []
    return this
  }

  size() {
    return this._queue.length
  }

  isEmpty() {
    return this.size() === 0
  }

  enter(element: unknown) {
    if (this.size() >= this._config.maxLength)
      return this

    this._queue.push(element)
    return this
  }

  out() {
    return this._queue.shift()
  }

  get() {
    return this._queue
  }

  peek() {
    return this._queue[0]
  }
}

export default Queue
