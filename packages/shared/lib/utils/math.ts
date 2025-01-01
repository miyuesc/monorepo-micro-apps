/**
 * @categoryDescription Math
 * 数学相关方法
 * @showCategories
 * @module
 */

/**
 * 坐标类型
 * @category Math
 */
export interface IPoint {
  x: number
  y: number
}

/**
 * 计算两点之间的距离
 * @category Math
 * @param point1
 * @param point2
 */
export function calculateDistance(point1: IPoint, point2: IPoint): number {
  const distanceX = Math.abs(point2.x - point1.x)
  const distanceY = Math.abs(point2.y - point1.y)
  return Math.sqrt(distanceX * distanceX + distanceY * distanceY)
}

/**
 * 计算两点之间的中点
 * @category Math
 * @param point1
 * @param point2
 */
export function calculateMidpoint(point1: IPoint, point2: IPoint): IPoint {
  return {
    x: (point1.x + point2.x) / 2,
    y: (point1.y + point2.y) / 2,
  }
}

/**
 * 判断点是否在图形内
 * @category Math
 * @param polygon 多边形坐标数组
 * @param point 点
 */
export function isPointInConvexPolygon(polygon: IPoint[], point: IPoint) {
  let dir: number | undefined
  for (let i = 0; i < polygon.length; i++) {
    const start = polygon[i]
    const end = polygon[(i + 1) % polygon.length]
    const a = {
      x: end.x - start.x,
      y: end.y - start.y,
    }
    const b = {
      x: point.x - start.x,
      y: point.y - start.y,
    }
    // 通过叉积公式得到点在边的方向
    const currDir = Math.sign(a.x * b.y - a.y * b.x)
    // 点在边上，跳过
    if (currDir === 0)
      continue

    if (dir === undefined)
      dir = currDir

    // 发现有方向不一样了，点不在凸多边形上
    else if (dir !== currDir)
      return false
  }
  // 点都在边的同一方向上
  return true
}
