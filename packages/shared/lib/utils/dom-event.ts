/**
 * @categoryDescription Dom Event
 * dom 事件绑定
 * @showCategories
 * @module
 */

/**
 * @category Dom Event
 * 元素事件绑定
 * @param el 元素
 * @param event 事件名称
 * @param listener 回调函数
 * @param capture 是否捕获阶段
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
 * @category Dom Event
 * 元素事件解绑
 * @param el 元素
 * @param event 事件名称
 * @param listener 回调函数
 * @param capture 是否捕获阶段
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
 * @category Dom Event
 * 事件代理
 * @param element 代理的元素
 * @param event 事件名称
 * @param selector 实际元素的选择器
 * @param callback 回调函数
 * @param capture 是否捕获阶段
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
