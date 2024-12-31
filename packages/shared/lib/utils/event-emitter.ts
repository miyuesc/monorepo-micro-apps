import { isArray, isNullable } from './typed'

/**
 * @categoryDescription EventEmitter
 * 事件发布订阅
 * @showCategories
 * @module
 */

/**
 * @category EventEmitter
 * 事件监听器毁掉函数
 */
export interface EventEmitterListener {
  (...args: unknown[]): unknown
  context?: unknown
  once?: boolean
}

/**
 * @category EventEmitter
 * @class
 * 事件发布订阅
 */
export class EventEmitter {
  private _events: { [p: string]: EventEmitterListener | EventEmitterListener[] }

  constructor() {
    this._events = {}
  }

  /**
   * 注册事件订阅函数
   * @param type 事件类型
   * @param fn 回调函数
   * @param context 上下文
   * @param once 是否只执行一次
   */
  private _addListener(type: string, fn: EventEmitterListener, context?: unknown, once?: boolean) {
    if (typeof fn !== 'function')
      throw new TypeError('fn must be a function')

    fn.context = context
    fn.once = !!once

    const events = this._events[type]
    if (isNullable(events))
      this._events[type] = fn

    else if (typeof events === 'function')
      this._events[type] = [events, fn]

    else if (isArray(events))
      events.push(fn)

    return this
  }

  /**
   * 注册事件订阅函数
   * @param type 事件类型
   * @param fn 回调函数
   * @param context 上下文
   * @param once 是否只执行一次
   */
  addListener(type: string | string[], fn: EventEmitterListener, context?: unknown, once?: boolean) {
    if (isArray(type)) {
      for (const t of type)
        this._addListener(t, fn, context, once)
      return this
    }
    return this._addListener(type, fn, context, once)
  }

  /**
   * 注册事件订阅函数
   * @param type 事件类型
   * @param fn 回调函数
   * @param context 上下文
   */
  on(type: string, fn: any, context?: any) {
    return this.addListener(type, fn, context)
  }

  /**
   * 注册事件订阅函数，只执行一次
   * @param type 事件类型
   * @param fn 回调函数
   * @param context 上下文
   */
  once(type: string, fn: any, context?: any) {
    return this._addListener(type, fn, context, true)
  }

  /**
   * 触发事件
   * @param type 事件类型
   * @param rest 回调函数参数
   */
  emit(type: string, ...rest: any[]) {
    if (isNullable(type))
      throw new Error('emit must receive at lease one argument')

    const event: any = this._events[type]

    if (isNullable(event))
      return false

    if (typeof event === 'function') {
      event.call(event.context || null, ...rest)
      if (event.once)
        this.removeListener(type, event)
    }
    else if (isArray(event)) {
      event.forEach((e) => {
        e.call(e.context || null, ...rest)
        if (e.once)
          this.removeListener(type, e)
      })
    }

    return this
  }

  /**
   * 移除事件订阅函数
   * @param type 事件类型
   * @param fn 回调函数参数
   */
  private _removeListener(type: string, fn?: EventEmitterListener) {
    if (isNullable(this._events))
      return this

    if (!fn) {
      Reflect.deleteProperty(this, type)
      return this
    }

    if (typeof fn !== 'function')
      throw new Error('fn must be a function')

    const events = this._events[type]
    if (!events)
      return this

    if (typeof events === 'function') {
      if (events === fn) {
        delete this._events[type]
      }
    }
    else {
      const findIndex = events.findIndex(e => e === fn)

      if (findIndex === -1)
        return this

      // match the first one, shift faster than splice
      if (findIndex === 0)
        events.shift()
      else
        events.splice(findIndex, 1)

      // just left one listener, change Array to Function
      if (events.length === 1)
        this._events[type] = events[0]
    }

    return this
  }

  /**
   * 移除事件订阅函数，指定 fn 时只移除指定的 fn，不指定 fn 时移除所有
   * @param type 事件类型
   * @param fn 回调函数参数
   */
  removeListener(type: string | string[], fn?: EventEmitterListener) {
    if (isArray(type)) {
      for (const t of type)
        this._removeListener(t, fn)
      return this
    }
    return this._removeListener(type, fn)
  }

  /**
   * 移除事件订阅函数，指定类型时移除该类型的所有订阅函数，不指定类型时移除所有
   * @param type 事件类型
   */
  removeAllListeners(type?: string) {
    if (isNullable(this._events))
      return this

    // if not provide type, remove all
    if (isNullable(type))
      return (this._events = Object.create(null))

    const events = this._events[type!]
    if (!isNullable(events)) {
      // check if `type` is the last one
      if (Object.keys(this._events).length === 1)
        this._events = Object.create(null)
      else
        delete this._events[type!]
    }

    return this
  }

  /**
   * 检查是否存在事件订阅函数
   * @param type 事件类型
   * @param fn 回调函数参数
   */
  hasListener(type: string, fn: EventEmitterListener): boolean {
    const events = this._events[type]
    return events && isArray(events) && events.includes(fn)
  }

  /**
   * 获取某个事件的所有订阅函数
   * @param type 事件类型
   */
  listeners(type: string) {
    if (!this._events[type])
      return

    const events = this._events[type]

    return isArray(events) ? events : [events]
  }

  /**
   * 获取某个事件的订阅函数数量
   * @param type 事件类型
   */
  listenersCount(type: string) {
    const events = this._events[type]

    return isNullable(events) ? 0 : typeof events === 'function' ? 1 : events.length
  }

  /**
   * 获取所有已经订阅的事件
   */
  eventNames() {
    return Reflect.ownKeys(this._events)
  }
}

/**
 * @category EventEmitter
 * 事件发布订阅实例
 */
export const emitterInstance = new EventEmitter()
