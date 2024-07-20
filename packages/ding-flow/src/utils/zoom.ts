/**
 * @desc zoom
 * @author MiyueFE <https://github.com/miyuesc>
 * @since 2024/7/17 下午4:44
 */

let s: number = 1 // 缩放倍率
const zoomStep: number = 0.2 // 缩放步长
let lasts: number = 1
const minL: number = 0.2
const maxL: number = 4
let zoomLeft: number = 0 // 记录缩放时的位置
let zoomTop: number = 0 // 记录缩放时的位置

// 缩放前，鼠标位置相对图片缩放为 1 时的位置
function getSourcePosition(el: HTMLDivElement, s: number, x: number, y: number) {
  const sourceTop = +el.style.top.slice(0, -2)
  const sourceLeft = +el.style.left.slice(0, -2)

  const x2 = (x - sourceLeft) / s
  const y2 = (y - sourceTop) / s

  return { x2, y2 }
}
// 缩放后，图片需要的位移
function getXY(s: number, x: number, y: number, x2: number, y2: number) {
  // 缩放后的位置
  const x3 = x2 * s
  const y3 = y2 * s

  // 缩放后的位置移动到鼠标位置，需要的位移
  const x4 = x - x3
  const y4 = y - y3

  return { x4, y4 }
}
// 设置图片位置
function setPosition(el: HTMLDivElement, x4: number, y4: number, s: number) {
  el.style.left = `${x4}px`
  el.style.top = `${y4}px`
  el.style.transform = `scale(${s})`
}
// ctrl 下缩放处理函数
export function scaleHandler(el: HTMLDivElement, e: WheelEvent) {
  const { x, y, deltaY } = e

  if (deltaY % 100 !== 0)
    return

  s += deltaY * -0.01 * zoomStep
  s = Math.min(Math.max(minL, s), maxL)

  // 放大
  if (deltaY < 0) {
    const { x2, y2 } = getSourcePosition(el, lasts, x, y)

    const { x4, y4 } = getXY(s, x, y, x2, y2)

    if (lasts < maxL) {
      lasts = s
      zoomLeft = x4
      zoomTop = y4
      setPosition(el, x4, y4, s)
    }
  }
  // 缩小
  if (deltaY > 0) {
    const { x2, y2 } = getSourcePosition(el, lasts, x, y)

    const { x4, y4 } = getXY(s, x, y, x2, y2)

    if (lasts > minL) {
      lasts = s
      zoomLeft = x4
      zoomTop = y4
      setPosition(el, x4, y4, s)
    }
  }
}

//
let isDragging: boolean = false
let startX: number = 0
let startY: number = 0
let draggingX: number = 0
let draggingY: number = 0
export function dragStartHandler(e: MouseEvent) {
  isDragging = true
  startX = e.clientX
  startY = e.clientY
}
export function dragHandler(el: HTMLDivElement, e: MouseEvent) {
  if (!isDragging)
    return

  draggingX = zoomLeft + e.clientX - startX
  draggingY = zoomTop + e.clientY - startY

  setPosition(el, draggingX, draggingY, s)
}
export function dragEndHandler() {
  isDragging = false
  zoomLeft = draggingX
  zoomTop = draggingY
}
