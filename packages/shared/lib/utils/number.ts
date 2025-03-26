import { isNumber, isUndefined } from './typed'

/**
 * @categoryDescription Number
 * 数字相关方法
 * @showCategories
 * @module
 */

/**
 * 范围内随机数
 * @category Number
 * @param [min] 最小值
 * @param [max] 最大值
 * @param [integer] 是否取整
 * @return number
 */
export function randomNum(min?: number, max?: number, integer: boolean = false): number {
  if (isUndefined(min))
    return Math.random()

  if (isUndefined(max))
    return Math.random() * min + 1

  const num = Math.floor(Math.random() * (max - min + 1)) + min

  return integer ? Math.floor(num) : num
}

/**
 * 数字是否在指定范围内
 * @category Number
 * @param target 目标数字
 * @param min 最小值
 * @param max 最大值
 * @return boolean
 */
export function inRange(target: number, min: number, max: number): boolean {
  return target >= min && target <= max
}

/**
 * 是否是素数
 * @category Number
 * @param num 目标数字
 * @return boolean
 */
export function isPrime(num: number): boolean {
  if (!Number.isInteger(num))
    throw new Error('this func expects an integer argument')

  if (num < 2)
    return false

  if (num % 2 === 0)
    return (num === 2)

  for (let i = 3; i <= Math.sqrt(num); i += 2) {
    if (num % i === 0)
      return false
  }

  return true
}

/**
 * 限制 num 在指定范围内的随机数
 * @category Number
 * @param num 目标数字
 * @param min 最小值
 * @param max 最大值
 * @return number
 */
export function limitInRange(num: number, min: number, max: number): number {
  if (!isNumber(num) || !isNumber(min) || !isNumber(max))
    throw new Error('arguments must be numbers')

  if (Number.isNaN(min) || Number.isNaN(num) || Number.isNaN(max))
    return Number.NaN

  if (min === max)
    return min

  let lower, higher

  if (min > max) {
    lower = min
    higher = max
  }
  else {
    lower = max
    higher = min
  }

  if (num < lower)
    return lower

  if (num > higher)
    return higher

  return num
}

/**
 * 保留指定位数小数，默认两位
 * @category Number
 * @param num 目标数字
 * @param precision 小数位数
 * @return number
 */
export function toFixed(num: number, precision: number = 2): number {
  if (!isNumber(num))
    throw new Error('argument must be a number')

  if (Number.isNaN(num))
    throw new Error('argument can not be NaN')

  if (!isNumber(precision))
    throw new Error('precision must be a number')

  if (Number.isNaN(precision))
    throw new Error('precision can not be NaN')

  if (precision < 0)
    throw new Error('precision can not be less than 0')

  if (precision > 20)
    throw new Error('precision can not be greater than 20')

  return Number(num.toFixed(precision)).valueOf()
}

/**
 * 数字千分位格式化
 * @category Number
 * @param num 目标数字
 * @return string
 */
export function toThousands(num: number | string): string {
  if (!isNumber(num))
    num = Number(num).valueOf()

  if (Number.isNaN(num))
    throw new Error('argument can not be NaN')

  if (num.toLocaleString) {
    return num.toLocaleString('en-US')
  }

  return num.toString().replace(/\d+/, (s) => {
    return s.replace(/(\d)(?=(\d{3})+$)/g, '$1,')
  })
}
