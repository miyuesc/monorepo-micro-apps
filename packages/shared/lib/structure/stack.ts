/**
 * @categoryDescription Stack
 * 栈
 * @showCategories
 * @module
 */

/**
 * 栈配置
 * @category Stack
 * @interface StackConfig
 * @property maxLength 最大长度
 */
export interface StackConfig {
  maxLength: number
}

/**
 * 栈
 * @category Stack
 */
export class Stack<T> {
  _config: StackConfig
  _stack: T[]

  /**
   * @param config 栈配置
   * @param preset 预设数据
   */
  constructor(config: StackConfig, preset: T[] = []) {
    this._config = config
    this._stack = [...preset]
  }

  /**
   * 清空栈
   */
  clear() {
    this._stack = []
    return this
  }

  /**
   * 获取栈的大小
   */
  size() {
    return this._stack.length
  }

  /**
   * 判断栈是否为空
   */
  isEmpty() {
    return this.size() === 0
  }

  /**
   * 入栈
   * @param element 入栈元素
   */
  enter(element: T) {
    if (this.size() >= this._config.maxLength)
      return this

    this._stack.push(element)
    return this
  }

  /**
   * 出栈
   */
  out() {
    return this._stack.pop()
  }

  /**
   * 获取栈数据
   */
  get() {
    return this._stack
  }

  /**
   * 查看栈顶元素
   */
  peek() {
    return this._stack[this.size() - 1]
  }
}
