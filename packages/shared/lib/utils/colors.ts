/**
 * @categoryDescription Colors
 * 颜色相关方法
 * @showCategories
 * @module
 */

/**
 * @category Colors
 * 随机生成十六进制颜色
 */
export function randomHexColor(): string {
  let hex: string = Math.floor(Math.random() * 16777216).toString(16) // 生成 ffffff 以内16进制数
  while (hex.length < 6) {
    // while循环判断hex位数，少于6位前面加0凑够6位
    hex = `0${hex}`
  }
  return `#${hex}` // 返回‘#’开头16进制颜色
}
/**
 * @category Colors
 * 随机生成RGB颜色
 */
export function randomRgbColor(): string {
  const r = Math.floor(Math.random() * 256) // 随机生成256以内r值
  const g = Math.floor(Math.random() * 256) // 随机生成256以内g值
  const b = Math.floor(Math.random() * 256) // 随机生成256以内b值
  return `rgb(${r},${g},${b})` // 返回rgb(r,g,b)格式颜色
}
/**
 * @category Colors
 * 随机生成RGBA颜色
 */
export function randomRgbaColor(): string {
  const r = Math.floor(Math.random() * 256) // 随机生成256以内r值
  const g = Math.floor(Math.random() * 256) // 随机生成256以内g值
  const b = Math.floor(Math.random() * 256) // 随机生成256以内b值
  const alpha = Math.random() // 随机生成1以内a值
  return `rgb(${r},${g},${b},${alpha})` // 返回rgba(r,g,b,a)格式颜色
}

/**
 * @category Colors
 * RGB颜色转十六进制颜色
 * @param rgb RGB颜色
 */
export function rgbToHex(rgb: string): string | undefined {
  const match = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/)
  if (!match)
    return undefined

  const r = Number.parseInt(match[1], 10)
  const g = Number.parseInt(match[2], 10)
  const b = Number.parseInt(match[3], 10)
  if (r > 255 || g > 255 || b > 255)
    return undefined

  const rHex = r.toString(16).padStart(2, '0')
  const gHex = g.toString(16).padStart(2, '0')
  const bHex = b.toString(16).padStart(2, '0')

  return `#${rHex}${gHex}${bHex}`
}

/**
 * @category Colors
 * 十六进制颜色转RGB颜色
 * @param hex 十六进制颜色
 */
export function hexToRgb(hex: string): string | undefined {
  const hexRegex = /^#?([a-f\d]{3}|[a-f\d]{6})$/i
  const hexMatch = hex.match(hexRegex)
  if (hexMatch) {
    let hexCode = hexMatch[1]
    if (hexCode.length === 3) {
      hexCode = hexCode
        .split('')
        .map(char => char + char)
        .join('')
    }
    const r = Number.parseInt(hexCode.substring(0, 2), 16)
    const g = Number.parseInt(hexCode.substring(2, 4), 16)
    const b = Number.parseInt(hexCode.substring(4, 6), 16)
    return `rgb({${r}, ${g}, ${b}}`
  }
}
