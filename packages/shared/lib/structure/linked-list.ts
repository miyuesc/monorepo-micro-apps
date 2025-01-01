/**
 * @categoryDescription LinkedList
 * 链表
 * @showCategories
 * @module
 */

/**
 * 链表节点
 * @interface
 * @category LinkedList
 * @property value 当前节点的值
 * @property prev 上一个节点
 * @property next 下一个节点
 */
export interface LinkedListNode<T> {
  value: T
  prev?: LinkedListNode<T>
  next?: LinkedListNode<T>
}

/**
 * 链表配置
 * @category LinkedList
 * @interface
 * @property maxLength 最大长度
 */
export interface LinkedListConfig {
  maxLength: number
}

/**
 * 插入位置
 * @category LinkedList
 * @type
 * @typeParam before 插入到节点之前
 * @typeParam after 插入到节点之后
 */
export type InsertPosition = 'before' | 'after'

/**
 * 链表
 * @category LinkedList
 */
export class LinkedList<T> {
  _config: LinkedListConfig
  _list: LinkedListNode<T>[]

  /**
   * @param config 链表配置
   */
  constructor(config: LinkedListConfig) {
    this._config = config
    this._list = []
  }

  /**
   * 清空链表
   */
  clear() {
    this._list = []
    return this
  }

  /**
   * 获取链表的大小
   */
  size() {
    return this._list.length
  }

  /**
   * 判断链表是否为空
   */
  isEmpty() {
    return this.size() === 0
  }

  /**
   * 创建链表节点
   * @param value 节点的值
   */
  private _createListNode(value: T): LinkedListNode<T> {
    return { value }
  }

  /**
   * 追加节点
   * @param value 节点的值
   */
  append(value: T) {
    const node = this._createListNode(value)
    if (this.size()) {
      const prev = this._list[this.size() - 1]
      prev.next = node
      node.prev = prev
    }
    this._list.push(node)
    return node
  }

  /**
   * 头部插入节点
   * @param value 节点的值
   */
  prepend(value: T) {
    const node = this._createListNode(value)
    if (this.size()) {
      const head = this._list[0]
      head.prev = node
      node.next = head
    }
    this._list.unshift(node)
    return node
  }

  /**
   * 中间插入节点
   * @param value 节点的值
   * @param anchor 锚点
   * @param position 插入位置
   */
  insert(value: T, anchor: LinkedListNode<T>, position: InsertPosition = 'before') {
    const node = this._createListNode(value)
    if (position === 'before') {
      node.prev = anchor.prev
      node.next = anchor
      anchor.prev = node
    }
    else {
      node.next = anchor.next
      node.prev = anchor
      anchor.next = node
    }
    return node
  }
}
