import type { Ref } from 'vue'
import { isRef, onBeforeUnmount, onMounted } from 'vue'
import * as echarts from 'echarts/core'
import type { ComposeOption, EChartsType } from 'echarts/core'
import type {
  GridComponentOption,
  LegendComponentOption,
  TooltipComponentOption,
} from 'echarts/components'
import type { BarSeriesOption } from 'echarts'

export default function useStackingBarChart(
  elementRef: Ref<HTMLDivElement | null> | HTMLDivElement | null,
  axisData: string[] | number[],
  data: BarSeriesOption[],
  autoInit?: boolean,
) {
  let Chart: EChartsType | null = null

  const commonOptions: ComposeOption<
    TooltipComponentOption | LegendComponentOption | GridComponentOption
  > = {
    backgroundColor: '#000',
    tooltip: {
      trigger: 'axis',
      show: true,
      backgroundColor: 'rgba(0,0,0,0.5)',
      borderColor: 'rgba(0,0,0,0.75)',
      textStyle: { color: '#fff' },
    },
    legend: {
      show: true,
      right: '10%',
      icon: 'circle',
      itemHeight: 6,
      itemGap: 24,
      textStyle: { fontSize: 12, color: '#fff' },
    },
    grid: { left: 10, right: 5, bottom: 20, top: 40, containLabel: true },
    xAxis: {
      type: 'category',
      data: axisData,
      axisLine: { show: false },
      axisTick: { show: false },
    },
    yAxis: [
      {
        type: 'value',
        splitLine: {
          show: true,
          lineStyle: { type: [5, 5], dashOffset: 0, shadowBlur: 0 },
        },
      },
    ],
  }
  const commonSeriesOption: BarSeriesOption = {
    type: 'bar',
    stack: 'total-profit',
    barWidth: 15,
    barMinHeight: 15,
    emphasis: {
      focus: 'series',
    },
    itemStyle: {
      borderRadius: 10,
      borderWidth: 5,
      borderColor: 'transparent',
      borderJoin: 'round',
      borderType: 'solid',
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
      TooltipComponentOption | LegendComponentOption | GridComponentOption | BarSeriesOption
    > = {
      ...commonOptions,
      series: data.map((d) => {
        return {
          ...d,
          ...commonSeriesOption,
        }
      }),
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
