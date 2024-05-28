export interface IPoint {
  x: number
  y: number
}

/**
 * 判断点是否在图形内
 * @param polygon
 * @param point
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

/**
 * 计算距离
 * @param point1
 * @param point2
 */
export function calculateDistance(point1: IPoint, point2: IPoint): number {
  const distanceX = Math.abs(point2.x - point1.x)
  const distanceY = Math.abs(point2.y - point1.y)
  return Math.sqrt(distanceX * distanceX + distanceY * distanceY)
}
