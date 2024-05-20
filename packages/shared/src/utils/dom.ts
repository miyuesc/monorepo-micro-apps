// https://github.com/arco-design/arco-design-vue/blob/main/packages/web-vue/components/_utils/dom.ts

import { isNumber } from './typed'

export interface Size {
  height: number
  width: number
}

/**
 * 文档尺寸
 */
export function getDocumentSize(): Size {
  const { body } = document
  const html = document.documentElement
  let topBody
  try {
    const topWindow = window.top || window.self || window
    topBody = topWindow.document.body
  }
  catch {}

  return {
    height: Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight,
      topBody?.scrollHeight || 0,
      topBody?.clientHeight || 0,
    ),
    width: Math.max(
      body.scrollWidth,
      body.offsetWidth,
      html.clientWidth,
      html.scrollWidth,
      html.offsetWidth,
      topBody?.scrollWidth || 0,
      topBody?.clientWidth || 0,
    ),
  }
}

/**
 * 是否存在滚动条
 * @param element
 */
export function isScroll(element: HTMLElement) {
  return element.tagName === 'BODY'
    ? document.documentElement.scrollHeight > window.innerHeight
    : element.scrollHeight > element.offsetHeight
}

/**
 * 滚动条尺寸
 * @param element
 */
export function getScrollBarWidth(element: HTMLElement) {
  return element.tagName === 'BODY'
    ? window.innerWidth - getDocumentSize().width
    : element.offsetWidth - element.clientWidth
}

/**
 * 设置元素 transform: translate 移动
 */
export function setTranslate(element: HTMLElement, x: number | string, y: number | string) {
  const offsetX = isNumber(x) ? `${x}px` : x
  const offsetY = isNumber(y) ? `${y}px` : y
  element.style.transform = `translate(${offsetX}, ${offsetY})`
}
