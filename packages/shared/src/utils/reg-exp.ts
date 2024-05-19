// Some expressions come from https://github.com/any86/any-rule

// 验证是移动手机电话号码
export function isMobilePhone(str: string): boolean {
  const reg = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/
  return reg.test(str)
}

// 验证固定电话号码 XXX-XXXXXXX XXXX-XXXXXXXX
export function isFixedTelephone(str: string): boolean {
  const reg = /(\(\d{3,4}\)|\d{3,4}-|\s)?\d{8}/
  return reg.test(str)
}

// 校验 ip 地址
export function isIP(str: string, withPort?: boolean): boolean {
  if (withPort)
    return isIPWithPort(str)

  const reg = /^((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])?$/
  return reg.test(str)
}
// 校验 ip:port 地址
export function isIPWithPort(str: string): boolean {
  const reg = /^((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]):(?:[0-9]|[1-9][0-9]{1,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])?$/
  return reg.test(str)
}

// 验证子网掩码
export function isSubnetMask(str: string): boolean {
  const reg = /^(254|252|248|240|224|192|128)\.0\.0\.0|255\.(254|252|248|240|224|192|128|0)\.0\.0|255\.255\.(254|252|248|240|224|192|128|0)\.0|255\.255\.255\.(255|254|252|248|240|224|192|128|0)$/
  return reg.test(str)
}

// 校验 url
export function isUrl(str: string, withProtocol?: boolean): boolean {
  if (withProtocol)
    return isUrlWithProtocol(str)

  const reg = /^((https?):\/\/)?([^!@#$%^&*?.\s-]([^!@#$%^&*?.\s]{0,63}[^!@#$%^&*?.\s])?\.)+[a-z]{2,6}\/?/
  return reg.test(str)
}
// 校验 Url 与协议
export function isUrlWithProtocol(str: string) {
  const reg = /^https?:\/\/([^!@#$%^&*?.\s-]([^!@#$%^&*?.\s]{0,63}[^!@#$%^&*?.\s])?\.)+[a-z]{2,6}\/?/
  return reg.test(str)
}

// 校验邮箱
export function isEmail(str: string): boolean {
  const reg = /^[.a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
  return reg.test(str)
}

// 验证旧车牌
export function isOldEnergyLicensePlate(str: string): boolean {
  const reg
    = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z][A-Z][A-Z0-9]{4}[A-Z0-9挂学警港澳]$/
  return reg.test(str)
}
// 验证新能源车牌
export function isNewEnergyLicensePlate(str: string): boolean {
  const reg
    = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-HJ-NP-Z](([DF]((?![IO])[a-zA-Z0-9](?![IO]))[0-9]{4})|([0-9]{5}[DF]))$/
  return reg.test(str)
}
// 验证车牌号（包含新旧能源车牌）
export function isLicensePlate(str: string): boolean {
  return isOldEnergyLicensePlate(str) || isNewEnergyLicensePlate(str)
}

// 校验经度, 整数部分为 [+-] 0-90小数部分为0到6位
export function isLongitude(str: string): boolean {
  const reg = /^-?((1[0-7]?\d)|([1-9]?\d))(\.\d{1,6})?$/
  return reg.test(str)
}

// 校验纬度, 整数部分为 [+-] 0-90小数部分为0到6位
export function isLatitude(str: string): boolean {
  const reg = /^-?([0-8]?\d)(\.\d{1,6})?$/
  return reg.test(str)
}

// 校验简单密码, 密码长度为6-20位, 必须包含数字和字母
export function isSimplePassword(str: string): boolean {
  const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/
  return reg.test(str)
}

// 校验密码 严格模式
export function isStrictPassword(str: string): boolean {
  const reg = /^(?=.*\d)(?=.*[^%&',;=?$\x22]+)(?=.*[a-z])(?=.*[A-Z]).{10,20}$/
  return reg.test(str)
}

// 字母、数字、下划线或中划线组成,不能以下划线或者中划线开头和结尾 复杂字符串
export function isComplexString(str: string): boolean {
  const reg = /^(?!_)(?!-)(?!.*?_$)(?!.*?-$)[a-zA-Z0-9-_\u4E00-\u9FA5\\s·]+$/
  return reg.test(str)
}

// 完整日期格式
export function isFullDate(str: string): boolean {
  const reg = /^(([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]|[0-9][1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29)$/
  return reg.test(str)
}

// export function isXXX(str: string): boolean {
//   const reg = /\./
//   return reg.test(str)
// }
