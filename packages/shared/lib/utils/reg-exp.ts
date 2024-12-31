/**
 * @categoryDescription RegRex
 * 正则判断
 * @see {@link https://github.com/any86/any-rule}
 * @showCategories
 * @module
 */

/**
 * @category RegExp
 * 验证是移动手机电话号码
 * @param str
 */
export function isMobilePhone(str: string): boolean {
  const reg = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/
  return reg.test(str)
}
/**
 * @category RegExp
 * 验证固定电话号码
 * @param str
 */
export function isFixedTelephone(str: string): boolean {
  const reg = /(\(\d{3,4}\)|\d{3,4}-|\s)?\d{8}/
  return reg.test(str)
}
/**
 * @category RegExp
 * 校验 ip 地址
 * @param str
 */
export function isIP(str: string, withPort?: boolean): boolean {
  if (withPort)
    return isIPWithPort(str)

  const reg = /^((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])?$/
  return reg.test(str)
}
/**
 * @category RegExp
 * 校验 ip 地址和端口
 * @param str
 */
export function isIPWithPort(str: string): boolean {
  const reg = /^((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]):(?:\d|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])?$/
  return reg.test(str)
}

/**
 * @category RegExp
 * 校验 子网掩码
 * @param str
 */
export function isSubnetMask(str: string): boolean {
  const reg = /^(254|252|248|240|224|192|128)\.0\.0\.0|255\.(254|252|248|240|224|192|128|0)\.0\.0|255\.255\.(254|252|248|240|224|192|128|0)\.0|255\.255\.255\.(255|254|252|248|240|224|192|128|0)$/
  return reg.test(str)
}

/**
 * @category RegExp
 * 校验 Url
 * @param str
 * @param withProtocol 是否包含协议
 */
export function isUrl(str: string, withProtocol?: boolean): boolean {
  if (withProtocol)
    return isUrlWithProtocol(str)

  const reg = /^((https?):\/\/)?([^!@#$%^&*?.\s-]([^!@#$%^&*?.\s]{1,64})?\.)+[a-z]{2,6}\/?/
  return reg.test(str)
}

/**
 * @category RegExp
 * 校验 Url 包含协议
 * @param str
 */
export function isUrlWithProtocol(str: string) {
  const reg = /^https?:\/\/([^!@#$%^&*?.\s-]([^!@#$%^&*?.\s]{1,64})?\.)+[a-z]{2,6}\/?/
  return reg.test(str)
}

/**
 * @category RegExp
 * 校验 邮箱
 * @param str
 */
export function isEmail(str: string): boolean {
  const reg = /^[.\w-]+@[\w-]+(\.[\w-]+)+$/
  return reg.test(str)
}

/**
 * @category RegExp
 * 校验 车牌号
 * @param str
 */
export function isOldEnergyLicensePlate(str: string): boolean {
  const reg
    = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z][A-Z][A-Z0-9]{4}[A-Z0-9挂学警港澳]$/
  return reg.test(str)
}

/**
 * @category RegExp
 * 校验 验证新能源车牌
 * @param str
 */
export function isNewEnergyLicensePlate(str: string): boolean {
  const reg
    = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-HJ-NP-Z](([DF]((?![IO])[a-zA-Z0-9](?![IO]))\d{4})|(\d{5}[DF]))$/
  return reg.test(str)
}

/**
 * @category RegExp
 * 验证车牌号（包含新旧能源车牌）
 * @param str
 */
export function isLicensePlate(str: string): boolean {
  return isOldEnergyLicensePlate(str) || isNewEnergyLicensePlate(str)
}

/**
 * @category RegExp
 * 校验经度
 * @param str
 */
export function isLongitude(str: string): boolean {
  const reg = /^-?((1[0-7]?\d)|([1-9]?\d))(\.\d{1,6})?$/
  return reg.test(str)
}
/**
 * @category RegExp
 * 整数部分为 [+-] 0-90小数部分为0到6位
 * @param str
 */
export function isLatitude(str: string): boolean {
  const reg = /^-?([0-8]?\d)(\.\d{1,6})?$/
  return reg.test(str)
}

/**
 * @category RegRex
 * 校验简单密码, 密码长度为6-20位, 必须包含数字和字母
 * @param str
 */
export function isSimplePassword(str: string): boolean {
  const reg = /^(?!\d+$)(?![a-z]+$)[0-9A-Z]{6,16}$/i
  return reg.test(str)
}

/**
 * @category RegRex
 * 校验密码 严格模式
 * @param str
 */
export function isStrictPassword(str: string): boolean {
  const reg = /^(?=.*\d)(?=.*[^%&',;=?$\x22]+)(?=.*[a-z])(?=.*[A-Z]).{10,20}$/
  return reg.test(str)
}

/**
 * @category RegRex
 * 字母、数字、下划线或中划线组成,不能以下划线或者中划线开头和结尾 复杂字符串
 * @param str
 */
export function isComplexString(str: string): boolean {
  const reg = /^(?!_)(?!-)(?!.*?_$)(?!.*?-$)[\w-\u4E00\u9FA5\\·]+$/
  return reg.test(str)
}

/**
 * @category RegRex
 * 完整日期格式(YYYY-MM-DD)
 * @param str
 */
export function isFullDate(str: string): boolean {
  const reg = /^((\d{3}[1-9]|\d{2}[1-9]\d|\d[1-9]\d{2}|[1-9]\d{3})-(((0[13578]|1[02])-(0[1-9]|[12]\d|3[01]))|((0[469]|11)-(0[1-9]|[12]\d|30))|(02-(0[1-9]|1\d|2[0-8]))))|(((\d{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29)$/
  return reg.test(str)
}

/**
 * @category RegRex
 * 标准 12 小时时间格式(hh:mm:ss)
 * @param str
 */
export function isTwelveTime(str: string): boolean {
  const reg = /^(?:1[0-2]|0?[1-9]):[0-5]\d:[0-5]\d$/
  return reg.test(str)
}

/**
 * @category RegRex
 * 标准 24 小时时间格式(HH:mm:ss)
 * @param str
 */
export function isTwentyFourTime(str: string): boolean {
  const reg = /^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/
  return reg.test(str)
}

/**
 * @category RegRex
 * 严格语义化版本号
 * @param str
 */
export function isStrictSemanticVersion(str: string): boolean {
  const reg = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-z-][0-9a-z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-z-][0-9a-z-]*))*))?(?:\+([0-9a-z-]+(?:\.[0-9a-z-]+)*))?$/i
  return reg.test(str)
}

/**
 * @category RegRex
 * 语义化版本号
 * @param str
 * @param strict 是否严格模式
 */
export function isSemanticVersion(str: string, strict?: boolean): boolean {
  if (strict)
    return isStrictSemanticVersion(str)

  const reg = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/
  return reg.test(str)
}

/**
 * @category RegRex
 * 标准化货币格式(必须包含分隔符，支持复数与小数)
 * @param str
 */
export function isStandardCurrency(str: string): boolean {
  const reg = /^-?\d{1,3}(,\d{3})*(\.\d{1,2})?$/
  return reg.test(str)
}

/**
 * @category RegRex
 * 二代身份证格式
 * @param str
 */
export function isIdCard(str: string): boolean {
  const reg = /^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[12]\d|30|31)\d{3}[\dX]$/i
  return reg.test(str)
}
