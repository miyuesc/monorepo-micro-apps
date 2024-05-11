// 验证是移动手机电话号码
export function isMobilePhone(str: string): boolean {
  const reg = /^1[3|4578][0-9]\d{8}$/
  return reg.test(str)
}

// 验证固定电话号码
export function isFixedTelephone(str: string): boolean {
  const reg = /^((\d{3}-|\d{3})\d{8}|(\d{4}-|\d{4})\d{7,8})$/
  return reg.test(str)
}

// 校验ip地址
export function isIP(str: string): boolean {
  const reg = /(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}/
  return reg.test(str)
}

// 校验邮箱
export function isEmail(str: string): boolean {
  const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
  return reg.test(str)
}

// 验证车牌
export function isLicensePlate(str: string): boolean {
  const reg
    = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z][A-Z][A-Z0-9]{4}[A-Z0-9挂学警港澳]$/
  return reg.test(str)
}

// 校验经度
export function isLongitude(str: string): boolean {
  const reg = /^-?((1[0-7]?\d)|([1-9]?\d))(\.\d{1,6})?$/
  return reg.test(str)
}

// 校验纬度 整数部分为 [+-] 0-90小数部分为0到6位
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
