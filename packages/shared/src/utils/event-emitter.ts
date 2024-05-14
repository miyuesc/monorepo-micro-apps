import { isArray, isNullable } from './typed'

export interface EventEmitterListener {
  (...args: unknown[]): unknown
  context?: unknown
  once?: boolean
}

export class EventEmitter {
  private _events: { [p: string]: EventEmitterListener | EventEmitterListener[] }

  constructor() {
    this._events = {}
  }

  _addListener(type: string, fn: EventEmitterListener, context?: unknown, once?: boolean) {
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

  addListener(type: string | string[], fn: EventEmitterListener, context?: unknown, once?: boolean) {
    if (isArray(type)) {
      for (const t of type)
        this._addListener(t, fn, context, once)
      return this
    }
    return this._addListener(type, fn, context, once)
  }

  on(type: string, fn: any, context?: any) {
    return this.addListener(type, fn, context)
  }

  once(type: string, fn: any, context?: any) {
    return this._addListener(type, fn, context, true)
  }

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

  _removeListener(type: string, fn?: EventEmitterListener) {
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
      events === fn && delete this._events[type]
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

  removeListener(type: string | string[], fn?: EventEmitterListener) {
    if (isArray(type)) {
      for (const t of type)
        this._removeListener(t, fn)
      return this
    }
    return this._removeListener(type, fn)
  }

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

  hasListener(type: string, fn: EventEmitterListener): boolean {
    const events = this._events[type]
    return events && isArray(events) && events.includes(fn)
  }

  listeners(type: string) {
    if (!this._events[type])
      return

    const events = this._events[type]

    return isArray(events) ? events : [events]
  }

  listenersCount(type: string) {
    const events = this._events[type]

    return isNullable(events) ? 0 : typeof events === 'function' ? 1 : events.length
  }

  eventNames() {
    return Reflect.ownKeys(this._events)
  }
}

export const emitterInstance = new EventEmitter()
