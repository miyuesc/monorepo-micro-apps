import type { Ref } from 'vue'
import { isRef, onBeforeUnmount, onMounted } from 'vue'
import * as echarts from 'echarts/core'
import type { LineSeriesOption } from 'echarts'
import type { ComposeOption, EChartsType } from 'echarts/core'
import type { LegendComponentOption, TooltipComponentOption } from 'echarts/components'
import { eLinearGradient } from '@miyue-mma/shared'

export default function useLinearLineChart(
  elementRef: Ref<HTMLDivElement | null> | HTMLDivElement | null,
  axisData: string[] | number[],
  data: LineSeriesOption[],
  autoInit?: boolean,
) {
  let linearLineChart: EChartsType | null = null

  const defaultOptions: ComposeOption<LegendComponentOption | TooltipComponentOption> = {
    backgroundColor: '#000',
    tooltip: {
      trigger: 'axis',
      show: true,
      backgroundColor: 'rgba(0,0,0,0.5)',
      borderColor: 'rgba(0,0,0,0.75)',
      textStyle: { color: '#fff' },
    },
    xAxis: {
      type: 'category',
      data: axisData,
    },
    yAxis: {
      splitLine: { show: false },
    },
  }
  const lineSeriesCommonOptions: LineSeriesOption = {
    type: 'line',
    smooth: true,
    showSymbol: false,
    itemStyle: { shadowColor: '#fff', shadowBlur: 10 },
    label: { show: true, color: '#fff' },
    emphasis: { focus: 'series' },
  }
  const lineSeriesOption1: LineSeriesOption = {
    lineStyle: {
      width: 2,
      type: 'solid',
      color: eLinearGradient(0, 0, 1, 0, [
        'RGBA(29, 201, 242, 0.2)',
        'RGBA(29, 201, 242, 0.4)',
        'RGBA(60, 255, 220, 1)',
      ]),
    },
  }
  const lineSeriesOption2: LineSeriesOption = {
    lineStyle: {
      width: 2,
      type: 'solid',
      color: eLinearGradient(0, 0, 1, 0, [
        'RGBA(59, 253, 219, 0.2)',
        'RGBA(59, 253, 219, 0.4)',
        'RGBA(29, 214, 254, 1)',
      ]),
    },
  }

  const initialLinearLineChart = () => {
    if (isRef(elementRef))
      elementRef = elementRef.value

    if (!elementRef)
      throw new Error('elementRef can not be null')

    linearLineChart = echarts.init(elementRef as HTMLDivElement)
  }

  const updateChart = (data: LineSeriesOption[]) => {
    if (!linearLineChart)
      initialLinearLineChart()

    const option: ComposeOption<LegendComponentOption | TooltipComponentOption | LineSeriesOption>
      = {
        ...defaultOptions,
        series: data.map((d, idx) => {
          return {
            ...d,
            ...lineSeriesCommonOptions,
            ...(idx % 2 === 0 ? lineSeriesOption1 : lineSeriesOption2),
          }
        }),
      }

    linearLineChart!.setOption(option)
  }

  autoInit && onMounted(() => updateChart(data))
  onBeforeUnmount(() => {
    linearLineChart?.dispose()
    linearLineChart = null
  })

  return {
    linearLineChart,
    initialLinearLineChart,
    updateChart,
  }
}
