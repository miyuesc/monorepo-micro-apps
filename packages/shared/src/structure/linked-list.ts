export interface LinkedListNode {
  value: unknown
  prev?: LinkedListNode
  next?: LinkedListNode
}

export interface LinkedListConfig {
  maxLength: number
}

export type InsertPosition = 'before' | 'after'

export class LinkedList {
  _config: LinkedListConfig
  _list: LinkedListNode[]

  constructor(config: LinkedListConfig) {
    this._config = config
    this._list = []
  }

  clear() {
    this._list = []
    return this
  }

  size() {
    return this._list.length
  }

  isEmpty() {
    return this.size() === 0
  }

  _createListNode(value: unknown): LinkedListNode {
    return { value }
  }

  append(value: unknown) {
    const node = this._createListNode(value)
    if (this.size()) {
      const prev = this._list[this.size() - 1]
      prev.next = node
      node.prev = prev
    }
    this._list.push(node)
    return node
  }

  prepend(value: unknown) {
    const node = this._createListNode(value)
    if (this.size()) {
      const head = this._list[0]
      head.prev = node
      node.next = head
    }
    this._list.unshift(node)
    return node
  }

  insert(value: unknown, anchor: LinkedListNode, position: InsertPosition = 'before') {
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
