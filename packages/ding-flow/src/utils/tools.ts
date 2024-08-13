/**
 * @desc tools
 * @author MiyueFE <https://github.com/miyuesc>
 * @since 2024/8/1 下午4:32
 */

export function capitalize(str: string): string {
  if (!str || str.length === 0)
    return ''
  const lower = str
  return lower.substring(0, 1).toUpperCase() + lower.substring(1, lower.length)
}
