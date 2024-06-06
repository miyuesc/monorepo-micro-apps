import { isUndefined } from './typed'

/**
 * 范围内随机数
 * @param [min]
 * @param [max]
 */
export function randomNum(min?: number, max?: number): number {
  if (isUndefined(min))
    return Math.random()

  if (isUndefined(max))
    return Math.random() * min + 1

  return Math.floor(Math.random() * (max - min + 1)) + min
}
