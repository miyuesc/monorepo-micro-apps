export interface StackConfig {
  maxLength: number
}

class Stack {
  _config: StackConfig
  _stack: unknown[]

  constructor(config: StackConfig, preset: unknown[] = []) {
    this._config = config
    this._stack = [...preset]
  }

  clear() {
    this._stack = []
    return this
  }

  size() {
    return this._stack.length
  }

  isEmpty() {
    return this.size() === 0
  }

  enter(element: unknown) {
    if (this.size() >= this._config.maxLength)
      return this

    this._stack.push(element)
    return this
  }

  out() {
    return this._stack.pop()
  }

  get() {
    return this._stack
  }

  peek() {
    return this._stack[this.size() - 1]
  }
}

export default Stack
