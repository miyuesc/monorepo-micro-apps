// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import { graphic } from 'echarts/core'
import { isPlainObject } from '../utils/typed'

/**
 * @categoryDescription EchartsColors
 * 对象相关方法
 * @showCategories
 * @module
 */

/**
 * 渐变色梯度
 * @category EchartsColors
 */
export interface GradientColorStop {
  offset: number
  color: string
}

/**
 * 渐变色梯度辅助函数
 * @category EchartsColors
 */
export function colorStepsHelper(
  colors?: GradientColorStop[] | string[],
): GradientColorStop[] | undefined {
  if (!colors || !colors.length)
    return undefined

  if (isPlainObject(colors[0]))
    return colors as GradientColorStop[]

  const newColors: GradientColorStop[] = []
  const offsetStep = 1 / (colors.length - 1)
  for (let i = 0; i < colors.length; i++)
    newColors.push({ offset: i * offsetStep, color: (colors as string[])[i] })

  return newColors
}

/**
 * 线性渐变
 * @category EchartsColors
 */
export function eLinearGradient(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  colors?: GradientColorStop[] | string[],
  cord?: boolean,
): graphic.LinearGradient {
  const newColors: GradientColorStop[] | undefined = colorStepsHelper(colors)
  return new graphic.LinearGradient(x1, y1, x2, y2, newColors, cord)
}

/**
 * 径向渐变
 * @category EchartsColors
 */
export function eRadialGradient(
  x: number,
  y: number,
  r: number,
  colors?: GradientColorStop[] | string[],
  cord?: boolean,
): graphic.RadialGradient {
  const newColors: GradientColorStop[] | undefined = colorStepsHelper(colors)
  return new graphic.RadialGradient(x, y, r, newColors, cord)
}
