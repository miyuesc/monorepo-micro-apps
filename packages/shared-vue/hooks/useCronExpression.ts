import { computed, isRef, onMounted, ref, watch } from 'vue'
import type { Ref } from 'vue'
import { simpleMerge } from '@miyue-mma/shared/utils/object'

/**
 * https://www.freeformatter.com/cron-expression-generator-quartz.html
 * https://juejin.cn/post/7163608389233147918
 *
 * https://cron.qqe2.com/
 *
 * | 子配置  | 是否必填    | 范围           | 允许的特殊字符         | 说明                |
 * | ------ | -------- | --------------- | ------------------- | ------------------- |
 * | 秒     | 否       | 0-59             | * , - /             | 不常用              |
 * | 分     | 是       | 0-59             | * , - /             |                     |
 * | 小时   | 是       | 0-23             | * , - /             |                     |
 * | 几号   | 是       | 1-31             | * , - / ? L W       |                     |
 * | 月份   | 是       | 1-12 或 JAN - DEC| * , - /             |                     |
 * | 星期几 | 是       | 0-7 或S UN-SAT    | * , - / ? L #       | 0 和 7 是周六，1 是周日|
 * | 年    | 否       | 1970-2099        | * , - /              | 不常用               |
 *
 * **星期与日期需要重叠配置**
 */

// 每*、指定、从*到*范围循环、从*开始每*循环; 范围循环以 - 分隔；指定时刻开始循环以 / 分隔
type CheckedType = 'every' | 'specify' | 'range' | 'average'
type YearCheckedType = 'none' | 'every' | 'specify' | 'range' | 'average'
type DayWeekdayCheckedType =
  | 'everyDay'
  | 'dayRange'
  | 'weekdayRange'
  | 'dayAverage'
  | 'weekdayAverage'
  | 'daySpecify'
  | 'weekdaySpecify'
  | 'beforeEndSpacialDay'
  | 'lastWeekday'
  | 'lastSpecialWeekday'
  | 'nearestWeekdaySpecialDay'
  | 'specialAWeekday'

interface AverageData {
  from: number
  step: number
}
interface RangeData {
  from: number
  to: number
}

// 通用数据类型
interface BasePanelData {
  specify: number[]
  average: AverageData
  range: RangeData
}
type CommonPanelData = BasePanelData & {
  checkedType: CheckedType
}
// 年份数据类型
type YearPanelData = BasePanelData & {
  checkedType: YearCheckedType
}
// 日期/星期特殊处理
export interface DayPanelData {
  checkedType: DayWeekdayCheckedType
  daySpecify: number[]
  weekdaySpecify: number[]
  dayRange: RangeData
  weekdayRange: RangeData
  dayAverage: AverageData
  weekdayAverage: AverageData
  lastSpecialWeekday: number
  beforeEndSpacialDay: number
  nearestWeekdaySpecialDay: number
  specialAWeekday: {
    idx: number
    weekday: number
  }
}

export const WeekdayOptions: Array<{ label: string, value: number }> = [
  { label: 'SUNDAY', value: 1 },
  { label: 'MONDAY', value: 2 },
  { label: 'TUESDAY', value: 3 },
  { label: 'WEDNESDAY', value: 4 },
  { label: 'THURSDAY', value: 5 },
  { label: 'FRIDAY', value: 6 },
  { label: 'SATURDAY', value: 7 },
]

const currentYear = new Date().getFullYear()

const defaultCommonPanelData: CommonPanelData = {
  checkedType: 'every',
  specify: [1],
  range: { from: 1, to: 2 },
  average: { from: 1, step: 1 },
}
const defaultYearPanelData: YearPanelData = {
  checkedType: 'none',
  specify: [currentYear],
  range: { from: currentYear, to: currentYear + 2 },
  average: { from: currentYear, step: 1 },
}
const defaultDayWeekData: DayPanelData = {
  checkedType: 'everyDay',
  daySpecify: [1],
  weekdaySpecify: [1],
  dayRange: { from: 1, to: 2 },
  weekdayRange: { from: 1, to: 2 },
  dayAverage: { from: 1, step: 1 },
  weekdayAverage: { from: 1, step: 1 },
  beforeEndSpacialDay: 1,
  lastSpecialWeekday: 1,
  nearestWeekdaySpecialDay: 1,
  specialAWeekday: { idx: 1, weekday: 1 },
}

export function commonValueHandler(value: string, data?: CommonPanelData | YearPanelData): CommonPanelData | YearPanelData {
  // const panelData = JSON.parse(JSON.stringify(data || defaultCommonPanelData))
  const panelData = data ? simpleMerge(data, defaultCommonPanelData) : defaultCommonPanelData

  // eslint-disable-next-line eqeqeq
  if (value == undefined || value === '') {
    ;(panelData as YearPanelData).checkedType = 'none'
    return panelData as YearPanelData
  }

  if (value === '*') {
    panelData.checkedType = 'every'
    return panelData
  }
  if (value.includes('/')) {
    panelData.checkedType = 'average'
    const [form, step] = value.split('/')
    panelData.average = { from: Number(form).valueOf(), step: Number(step).valueOf() }
    return panelData
  }
  if (value.includes('-')) {
    panelData.checkedType = 'range'
    const [form, to] = value.split('-')
    panelData.range = { from: Number(form).valueOf(), to: Number(to).valueOf() }
    return panelData
  }

  panelData.checkedType = 'specify'
  panelData.specify = value.split(',').map(d => Number(d).valueOf())

  return panelData
}
export function daysValueHandler(dayValue: string, weekdayValue: string, data?: DayPanelData): DayPanelData {
  // const panelData = JSON.parse(JSON.stringify(data || defaultDayWeekData))
  const panelData = data ? simpleMerge(data, defaultDayWeekData) : defaultDayWeekData

  // day 和 weekday 必有一个 `?`，注意：当两个值一个为 ? 另一个为 * 时都表示每天
  if (weekdayValue === '?') {
    if (dayValue === '*') {
      panelData.checkedType = 'everyDay'
      return panelData
    }
    if (dayValue === 'L') {
      panelData.checkedType = 'beforeEndSpacialDay'
      panelData.beforeEndSpacialDay = 1
      return panelData
    }
    if (dayValue === 'LW') {
      panelData.checkedType = 'lastWeekday'
      return panelData
    }
    if (dayValue.includes('/')) {
      panelData.checkedType = 'dayAverage'
      const [form, step] = dayValue.split('/')
      panelData.dayAverage = { from: Number(form).valueOf(), step: Number(step).valueOf() }
      return panelData
    }
    if (dayValue.includes('-')) {
      const [start, day] = dayValue.split('-')
      if (start === 'L') {
        panelData.checkedType = 'beforeEndSpacialDay'
        panelData.beforeEndSpacialDay = Number(day).valueOf() + 1
      }
      else {
        panelData.checkedType = 'dayRange'
        panelData.dayRange = { from: Number(start).valueOf(), to: Number(day).valueOf() }
      }
      return panelData
    }
    if (dayValue.includes('W')) {
      panelData.checkedType = 'nearestWeekdaySpecialDay'
      const [day] = dayValue.split('W')
      panelData.nearestWeekdaySpecialDay = Number(day).valueOf()
      return panelData
    }

    panelData.checkedType = 'daySpecify'
    panelData.daySpecify = dayValue.split(',').map(d => Number(d).valueOf())
    return panelData
  }

  if (dayValue === '?') {
    if (weekdayValue === '*') {
      panelData.checkedType = 'everyDay'
      return panelData
    }
    if (weekdayValue.includes('/')) {
      panelData.checkedType = 'weekdayAverage'
      const [form, step] = weekdayValue.split('/')
      panelData.weekdayAverage = { from: Number(form).valueOf(), step: Number(step).valueOf() }
      return panelData
    }
    if (weekdayValue.includes('L')) {
      panelData.checkedType = 'lastSpecialWeekday'
      const [weekday] = weekdayValue.split('L')
      panelData.lastSpecialWeekday = Number(weekday).valueOf()
      return panelData
    }
    if (weekdayValue.includes('#')) {
      panelData.checkedType = 'specialAWeekday'
      const [idx, weekday] = weekdayValue.split('#')
      panelData.specialAWeekday = { idx: Number(idx).valueOf(), weekday: Number(weekday).valueOf() }
      return panelData
    }
    if (weekdayValue.includes('-')) {
      panelData.checkedType = 'weekdayRange'
      const [form, to] = weekdayValue.split('-')
      panelData.weekdayRange = { from: Number(form).valueOf(), to: Number(to).valueOf() }
      return panelData
    }

    panelData.checkedType = 'weekdaySpecify'
    panelData.weekdaySpecify = weekdayValue.split(',').map(i => Number(i).valueOf())
    return panelData
  }

  return panelData
}

export function commonExpressionGenerator(panelData: CommonPanelData | YearPanelData): string {
  const { checkedType, specify, average, range } = panelData
  if (checkedType === 'specify') {
    const sorts = [...specify].sort((a, b) => a - b)
    return sorts.join(',')
  }
  if (checkedType === 'range')
    return `${range.from}-${range.to}`
  if (checkedType === 'average')
    return `${average.from}/${average.step}`
  if (checkedType === 'none')
    return ''
  return '*'
}
export function daysExpressionGenerator(panelData: DayPanelData): [string, string] {
  const {
    checkedType,
    daySpecify,
    weekdaySpecify,
    dayRange,
    weekdayRange,
    dayAverage,
    weekdayAverage,
    lastSpecialWeekday,
    beforeEndSpacialDay,
    nearestWeekdaySpecialDay,
    specialAWeekday,
  } = panelData

  let dayValue: string
  let weekdayValue: string

  const sortDays = [...daySpecify].sort((a, b) => a - b)
  const sortWeekdays = [...weekdaySpecify].sort((a, b) => a - b)

  switch (checkedType) {
    case 'everyDay':
      dayValue = '*'
      weekdayValue = '?'
      break
    case 'dayRange':
      dayValue = `${dayRange.from}-${dayRange.to}`
      weekdayValue = '?'
      break
    case 'weekdayRange':
      dayValue = '?'
      weekdayValue = `${weekdayRange.from}-${weekdayRange.to}`
      break
    case 'dayAverage':
      dayValue = `${dayAverage.from}/${dayAverage.step}`
      weekdayValue = '?'
      break
    case 'weekdayAverage':
      dayValue = '?'
      weekdayValue = `${weekdayAverage.from}/${weekdayAverage.step}`
      break
    case 'daySpecify':
      dayValue = sortDays.join(',')
      weekdayValue = '?'
      break
    case 'weekdaySpecify':
      dayValue = '?'
      weekdayValue = sortWeekdays.join(',')
      break
    case 'beforeEndSpacialDay':
      weekdayValue = '?'
      if (beforeEndSpacialDay > 1)
        dayValue = `L-${beforeEndSpacialDay - 1}`
      else
        dayValue = 'L'

      break
    case 'lastWeekday':
      dayValue = 'LW'
      weekdayValue = '?'
      break
    case 'lastSpecialWeekday':
      dayValue = '?'
      weekdayValue = `${lastSpecialWeekday}L`
      break
    case 'nearestWeekdaySpecialDay':
      dayValue = `${nearestWeekdaySpecialDay}W`
      weekdayValue = '?'
      break
    case 'specialAWeekday':
      dayValue = '?'
      weekdayValue = `${specialAWeekday.idx}#${specialAWeekday.weekday}`
      break
  }

  return [dayValue, weekdayValue]
}

export function useCronExpression(
  value?: string | Ref<string>,
  presetDefaultValue?: string,
  callback?: Function,
) {
  const secondData = ref<CommonPanelData>(JSON.parse(JSON.stringify(defaultCommonPanelData)))
  const minuteData = ref<CommonPanelData>(JSON.parse(JSON.stringify(defaultCommonPanelData)))
  const hourData = ref<CommonPanelData>(JSON.parse(JSON.stringify(defaultCommonPanelData)))
  const monthData = ref<CommonPanelData>(JSON.parse(JSON.stringify(defaultCommonPanelData)))
  const yearData = ref<YearPanelData>(JSON.parse(JSON.stringify(defaultYearPanelData)))
  const dayWeekdayData = ref<DayPanelData>(JSON.parse(JSON.stringify(defaultDayWeekData)))

  const secondValue = computed<string>(() => commonExpressionGenerator(secondData.value))
  const minuteValue = computed<string>(() => commonExpressionGenerator(minuteData.value))
  const hourValue = computed<string>(() => commonExpressionGenerator(hourData.value))
  const monthValue = computed<string>(() => commonExpressionGenerator(monthData.value))
  const yearValue = computed<string>(() => commonExpressionGenerator(yearData.value))
  const dayWeekdayValue = computed<[string, string]>(() =>
    daysExpressionGenerator(dayWeekdayData.value),
  )

  const cronExpression = ref('')

  const initCronExpression = (exp: string) => {
    const values = exp.split(' ')
    if (values.length < 6)
      return
    cronExpression.value = exp
    const [secondV, minuteV, hourV, dayV, monthV, weekdayV, yearV] = values
    secondData.value = commonValueHandler(secondV, secondData.value) as CommonPanelData
    minuteData.value = commonValueHandler(minuteV, minuteData.value) as CommonPanelData
    hourData.value = commonValueHandler(hourV, hourData.value) as CommonPanelData
    monthData.value = commonValueHandler(monthV, monthData.value) as CommonPanelData
    yearData.value = commonValueHandler(yearV, yearData.value)
    dayWeekdayData.value = daysValueHandler(dayV, weekdayV, dayWeekdayData.value)
  }

  const initState = () => {
    let exp = isRef(value) ? value.value : value
    if (!exp)
      exp = presetDefaultValue || '* * * * * ?'

    initCronExpression(exp)
    callback && callback()
  }

  onMounted(() => {
    initState()
    watch(
      () => [
        secondValue.value,
        minuteValue.value,
        hourValue.value,
        monthValue.value,
        yearValue.value,
        dayWeekdayValue.value,
      ],
      () => {
        let exp = `${secondValue.value} ${minuteValue.value} ${hourValue.value} ${dayWeekdayValue.value[0]} ${monthValue.value} ${dayWeekdayValue.value[1]}`
        if (yearValue.value)
          exp += ` ${yearValue.value}`

        cronExpression.value = exp
        callback && callback()
      },
      { deep: true },
    )
  })

  return {
    cronExpression,
    secondData,
    minuteData,
    hourData,
    dayWeekdayData,
    monthData,
    yearData,
    secondValue,
    minuteValue,
    hourValue,
    monthValue,
    yearValue,
    dayWeekdayValue,
    initCronExpression,
  }
}
