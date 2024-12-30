/**
 * @categoryDescription Dom Event
 * dom 事件绑定
 * @showCategories
 * @module
 */

/**
 * 元素事件绑定
 * @category Dom Event
 * @param el
 * @param event
 * @param listener
 * @param capture
 */
export function bind<K extends keyof HTMLElementEventMap>(
  el: HTMLElement,
  event: K,
  listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any,
  capture?: boolean,
) {
  el.addEventListener(event, listener, { capture })

  return {
    unbind: () => unbind(el, event, listener, capture),
  }
}

/**
 * 元素事件解绑
 * @param el
 * @param event
 * @param listener
 * @param capture
 */
export function unbind<K extends keyof HTMLElementEventMap>(
  el: HTMLElement,
  event: K,
  listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any,
  capture?: boolean,
) {
  el.removeEventListener(event, listener, { capture })
}

/**
 * 代理事件
 * @param element
 * @param event
 * @param selector
 * @param callback
 * @param capture
 */
export function delegate<K extends keyof HTMLElementEventMap>(
  element: HTMLElement,
  event: K,
  selector: string,
  callback: (element: HTMLElement, ev: HTMLElementEventMap[K]) => unknown,
  capture?: boolean,
) {
  const listener = (event: Event) => {
    const target = event.target as HTMLElement
    if (target.closest(selector))
      callback(target.closest(selector)!, event as HTMLElementEventMap[K])
  }

  element.addEventListener(event, listener, { capture })

  return {
    unbind: () => unbind(element, event, listener, capture),
  }
}
