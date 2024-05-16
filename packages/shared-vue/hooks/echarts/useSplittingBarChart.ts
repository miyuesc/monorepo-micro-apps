import type { Ref } from 'vue'
import { isRef, onBeforeUnmount, onMounted } from 'vue'
import * as echarts from 'echarts/core'
import type { ComposeOption, EChartsType } from 'echarts/core'
import type { BarSeriesOption, PictorialBarSeriesOption } from 'echarts'
import type { GridComponentOption, TooltipComponentOption } from 'echarts/components'
import { eLinearGradient } from '@miyue-mma/shared'

export default function useSplittingBarChart(
  elementRef: Ref<HTMLDivElement | null> | HTMLDivElement | null,
  axisData: string[] | number[],
  data: BarSeriesOption[],
  autoInit?: boolean,
) {
  let Chart: EChartsType | null = null

  const commonOptions: ComposeOption<
    PictorialBarSeriesOption | TooltipComponentOption | GridComponentOption
  > = {
    backgroundColor: '#000',
    tooltip: {
      show: true,
      backgroundColor: 'rgba(0,0,0,0.5)',
      borderColor: 'rgba(0,0,0,0.75)',
      textStyle: { color: '#fff' },
    },
    grid: { containLabel: true },
    xAxis: {
      data: axisData,
      axisLine: { show: true, lineStyle: { color: '#11417a' } },
      axisTick: { show: false },
      axisLabel: { show: true, color: '#A3C0DF' },
    },
    yAxis: [
      {
        type: 'value',
        splitLine: { show: true, lineStyle: { color: '#113763', width: 1 } },
        axisTick: { show: false },
        axisLine: { show: true, lineStyle: { color: '#11417a' } },
        axisLabel: { show: true, color: '#A3C0DF' },
      },
    ],
  }
  const commonBarOptions: BarSeriesOption = {
    type: 'bar',
    barWidth: 10,
    z: 10,
    zlevel: 0,
    label: { show: true, position: 'top', distance: 10, color: '#01fff4' },
  }
  const commonPictorialOptions: PictorialBarSeriesOption = {
    type: 'pictorialBar',
    itemStyle: { color: '#000' },
    symbolRepeat: 'fixed',
    symbolMargin: 3,
    symbol: 'rect',
    symbolClip: true,
    symbolSize: [10, 2],
    symbolPosition: 'start',
    barWidth: 12,
    z: 0,
    zlevel: 1,
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

    const series: Array<PictorialBarSeriesOption | BarSeriesOption> = []
    const dataLength = data.length
    const pictorialBarWidth = 12

    const middle = (12 * dataLength) / 2
    for (const idx in data) {
      const color
        = Number(idx) % 2 === 0
          ? eLinearGradient(0, 0, 0, 1, ['#2befc1', '#11535e'])
          : eLinearGradient(0, 0, 0, 1, ['#1fc6e4', '#124b65'])
      const offset: number = pictorialBarWidth * Number(idx) - middle + pictorialBarWidth / 2

      series.push({
        ...data[idx],
        ...commonBarOptions,
        itemStyle: { color },
      })
      series.push({
        ...commonPictorialOptions,
        symbolOffset: [offset, 0],
        data: (data[idx].data as number[]) || [],
      })
    }

    const options: ComposeOption<
      BarSeriesOption | PictorialBarSeriesOption | TooltipComponentOption | GridComponentOption
    > = {
      ...commonOptions,
      series,
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
