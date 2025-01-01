import { isNumber } from './typed'

/**
 * @categoryDescription Dom
 * dom 相关方法
 * @see {@link https://github.com/arco-design/arco-design-vue/blob/main/packages/web-vue/components/_utils/dom.ts}
 * @showCategories
 */

/**
 * 文档尺寸
 * @category Dom
 */
export interface Size {
  height: number
  width: number
}

/**
 * 获取文档整体尺寸
 * @category Dom
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
 * @category Dom
 * @param element
 */
export function isScroll(element: HTMLElement): boolean {
  return element.tagName === 'BODY'
    ? document.documentElement.scrollHeight > window.innerHeight
    : element.scrollHeight > element.offsetHeight
}

/**
 * 滚动条尺寸
 * @category Dom
 * @param element
 */
export function getScrollBarWidth(element: HTMLElement): number {
  return element.tagName === 'BODY'
    ? window.innerWidth - getDocumentSize().width
    : element.offsetWidth - element.clientWidth
}

/**
 * 设置元素 transform: translate 移动
 * @category Dom
 * @param element HTMLElement
 * @param x
 * @param y
 */
export function setTranslate(element: HTMLElement, x: number | string, y: number | string) {
  const offsetX = isNumber(x) ? `${x}px` : x
  const offsetY = isNumber(y) ? `${y}px` : y
  element.style.transform = `translate(${offsetX}, ${offsetY})`
}
