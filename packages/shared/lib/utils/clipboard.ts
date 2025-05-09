/**
 * @categoryDescription Clipboard
 * 类型判断相关方法
 * @see {@link https://github.com/feross/clipboard-copy/blob/master/index.js}
 * @showCategories
 * @module
 */

/**
 * 复制文本到剪贴板
 * @category Clipboard
 * @param text 待复制的文本
 */
export async function clipboard(text: string) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text)
      return
    }
    catch (err) {
      console.error(
        err ?? new DOMException('The request is not allowed', 'NotAllowedError'),
      )
    }
  }

  const span = document.createElement('span')
  span.textContent = text

  span.style.whiteSpace = 'pre'

  document.body.appendChild(span)

  const selection = window.getSelection()
  const range = window.document.createRange()
  selection?.removeAllRanges()
  range.selectNode(span)
  selection?.addRange(range)

  try {
    window.document.execCommand('copy')
  }
  catch (err) {
    console.error(`execCommand Error: ${err}`)
  }

  selection?.removeAllRanges()
  window.document.body.removeChild(span)
}
