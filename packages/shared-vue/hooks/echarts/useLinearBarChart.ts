import type { Ref } from 'vue'
import { isRef, onBeforeUnmount, onMounted } from 'vue'
import * as echarts from 'echarts/core'
import type { ComposeOption, EChartsType } from 'echarts/core'
import type { BarSeriesOption } from 'echarts'
import type {
  GridComponentOption,
  LegendComponentOption,
  TooltipComponentOption,
} from 'echarts/components'
import { eLinearGradient } from '@miyue-mma/shared'

export default function useLinearBarChart(
  elementRef: Ref<HTMLDivElement | null> | HTMLDivElement | null,
  axisData: string[] | number[],
  data: BarSeriesOption[],
  autoInit?: boolean,
) {
  let Chart: EChartsType | null = null

  const commonOptions: ComposeOption<
    LegendComponentOption | TooltipComponentOption | GridComponentOption
  > = {
    backgroundColor: '#000',
    grid: [
      { show: false, left: 20, top: '5%', bottom: '5%', containLabel: true, width: '10%' },
      { show: false, top: '5%', bottom: '5%', containLabel: true, width: '45%' },
      { show: false, right: 20, top: '5%', bottom: '5%', containLabel: true, width: '45%' },
    ],
    tooltip: {
      show: true,
      backgroundColor: 'rgba(0,0,0,0.5)',
      borderColor: 'rgba(0,0,0,0.75)',
      textStyle: { color: '#fff' },
    },
    xAxis: [
      { type: 'value', inverse: true, axisLabel: { show: true }, splitLine: { show: false } },
      { gridIndex: 1, inverse: true, axisLabel: { show: false }, splitLine: { show: false } },
      { gridIndex: 2, inverse: false, axisLabel: { show: false }, splitLine: { show: false } },
    ],
    yAxis: [
      { type: 'category', position: 'left', show: true, inverse: false, data: axisData },
      { gridIndex: 1, type: 'category', position: 'left', show: false, data: axisData },
      { gridIndex: 2, type: 'category', position: 'left', show: false, data: axisData },
    ],
  }
  const barSeriesCommonOptions: BarSeriesOption = {
    type: 'bar',
    barWidth: 20,
    itemStyle: { shadowColor: '#fff', shadowBlur: 10 },
    label: { show: true, color: '#fff' },
    emphasis: { focus: 'series' },
  }
  const barSeriesOption1: BarSeriesOption = {
    xAxisIndex: 1,
    yAxisIndex: 1,
    itemStyle: {
      borderRadius: [10, 0, 0, 10],
      color: eLinearGradient(0, 0, 1, 0, [
        'rgba(184, 91, 255, 1)',
        'rgba(210, 132, 208, 1)',
        'rgba(255, 182, 182, 1)',
      ]),
    },
  }
  const barSeriesOption2: BarSeriesOption = {
    xAxisIndex: 2,
    yAxisIndex: 2,
    itemStyle: {
      borderRadius: [0, 10, 10, 0],
      color: eLinearGradient(0, 0, 1, 0, [
        'rgba(40, 204, 245, 1)',
        'rgba(20, 136, 250, 1)',
        'rgba(0, 72, 255, 1)',
      ]),
    },
  }

  const initialChart = () => {
    if (isRef(elementRef))
      elementRef = elementRef.value

    if (!elementRef)
      throw new Error('elementRef can not be null')

    Chart = echarts.init(elementRef as HTMLDivElement)
  }

  const updateChart = (data: BarSeriesOption[]) => {
    if (!Chart)
      initialChart()

    const options: ComposeOption<
      BarSeriesOption | LegendComponentOption | GridComponentOption | TooltipComponentOption
    > = {
      ...commonOptions,
      series: [
        {
          type: 'bar',
          name: '',
          xAxisIndex: 0,
          yAxisIndex: 0,
        },
        ...data.map((d, idx) => {
          return {
            ...d,
            ...barSeriesCommonOptions,
            ...(idx % 2 === 0 ? barSeriesOption1 : barSeriesOption2),
          }
        }),
      ],
    }

    Chart!.setOption(options)
  }

  autoInit && onMounted(() => updateChart(data))
  onBeforeUnmount(() => {
    Chart?.dispose()
    Chart = null
  })

  return {
    Chart,
    initialChart,
    updateChart,
  }
}
