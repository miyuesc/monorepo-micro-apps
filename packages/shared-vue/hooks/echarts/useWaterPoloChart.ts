import type { Ref } from 'vue'
import { isRef, onBeforeUnmount, onMounted } from 'vue'
import * as echarts from 'echarts/core'
import type { ComposeOption, EChartsType } from 'echarts/core'
import type { GraphicComponentOption } from 'echarts/components'
import { eLinearGradient } from '@miyue-mma/shared'
// 水球图支撑
import 'echarts-liquidfill'
import { create } from 'packages/shared/lib'

export interface WaterPoloOptions {
  waveNumber?: number
  autoInit?: boolean
}

export default function useWaterPoloChart(
  elementRef: Ref<HTMLDivElement | null> | HTMLDivElement | null,
  value = 0,
  options?: WaterPoloOptions,
) {
  if (!options)
    options = { waveNumber: 2, autoInit: true }

  // 水球图
  let waterPoloChart: EChartsType | null = null

  const defaultOption: ComposeOption<GraphicComponentOption> = {
    backgroundColor: '#000',
    graphic: [
      {
        type: 'group',
        left: 'center',
        top: '60%',
        children: [
          {
            type: 'text',
            z: 100,
            left: '10',
            top: 'middle',
            style: {
              fill: '#aab2fa',
              text: '流量统计',
              font: '20px Microsoft YaHei',
            },
          },
        ],
      },
    ],
    series: [
      {
        type: 'liquidFill',
        radius: '80%',
        center: ['50%', '50%'],
        outline: {
          borderDistance: 0,
          itemStyle: {
            borderWidth: 20,
            borderColor: eLinearGradient(0, 0, 0, 1, [
              'rgba(126,54,175, 0.25)',
              'rgba(69, 73, 240, .45)',
              'rgba(69, 73, 240, 1)',
            ]),
            shadowBlur: 10,
            shadowColor: '#000',
          },
        },
        color: [
          eLinearGradient(0, 0, 0, 1, [
            'rgba(31, 222, 225, 1)',
            'rgba(31, 222, 225, .2)',
            'rgba(58, 71, 212, 0)',
          ]),
        ],
        data: [value, value], // data个数代表波浪数
        backgroundStyle: {
          borderWidth: 1,
          color: 'RGBA(51, 66, 127, 0.7)',
        },
        label: {
          fontSize: 50,
          color: '#fff',
        },
      },
    ],
  }
  const seriesOptions: ComposeOption<GraphicComponentOption> = {
    type: 'liquidFill',
    radius: '80%',
    center: ['50%', '50%'],
    outline: {
      borderDistance: 0,
      itemStyle: {
        borderWidth: 20,
        borderColor: eLinearGradient(0, 0, 0, 1, [
          'rgba(126,54,175, 0.25)',
          'rgba(69, 73, 240, .45)',
          'rgba(69, 73, 240, 1)',
        ]),
        shadowBlur: 10,
        shadowColor: '#000',
      },
    },
    color: [
      eLinearGradient(0, 0, 0, 1, [
        'rgba(31, 222, 225, 1)',
        'rgba(31, 222, 225, .2)',
        'rgba(58, 71, 212, 0)',
      ]),
    ],
    backgroundStyle: {
      borderWidth: 1,
      color: 'RGBA(51, 66, 127, 0.7)',
    },
    label: {
      fontSize: 50,
      color: '#fff',
    },
  }

  const initialWaterPoloChart = () => {
    if (isRef(elementRef))
      elementRef = elementRef.value

    if (!elementRef)
      throw new Error('elementRef can not be null')

    waterPoloChart = echarts.init(elementRef as HTMLDivElement)
  }

  const updateChart = (newValue: number) => {
    if (!waterPoloChart)
      initialWaterPoloChart()

    // const data: number[] = Array.from({ length: options!.waveNumber }).fill(newValue) as number[]
    const data: number[] = create(options.waveNumber!, () => newValue)
    const option: ComposeOption<GraphicComponentOption> = {
      backgroundColor: defaultOption.backgroundColor,
      graphic: defaultOption.graphic,
      series: [
        {
          ...seriesOptions,
          data,
        },
      ],
    }
    waterPoloChart!.setOption(option)
  }

  options?.autoInit && onMounted(() => updateChart(value))
  onBeforeUnmount(() => {
    waterPoloChart?.dispose()
    waterPoloChart = null
  })

  return {
    waterPoloChart,
    initialWaterPoloChart,
    updateChart,
  }
}
