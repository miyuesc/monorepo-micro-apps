<script setup lang="ts">
/**
 * @desc FlowCanvas
 * @author MiyueFE <https://github.com/miyuesc>
 * @since 2024/7/17 下午5:19
 */

import { type PropType, onMounted, ref } from 'vue'
import {
  dragEndHandler,
  dragHandler,
  dragStartHandler,
  initCanvasViewbox,
  wheelHandler,
} from '@/utils/zoom'
import type { FlowDirection } from '@/types'

defineOptions({ name: 'FlowCanvas' })

const $props = defineProps({
  direction: {
    type: String as PropType<FlowDirection>,
    default: 'vertical',
    validator: (v: FlowDirection) => ['vertical', 'horizontal'].includes(v),
  },
})

const $emits = defineEmits(['zoomChanged'])

const canvasParent = ref<HTMLDivElement>()
const canvasRoot = ref<HTMLDivElement>()

const zoom = ref(1)

function zoomChanger(newZoom: number) {
  zoom.value = newZoom
  $emits('zoomChanged', zoom.value)
}

function mousewheelHandler(e: WheelEvent) {
  wheelHandler(canvasRoot.value!, e, zoomChanger)
}

function initCenter() {
  const { width, height } = canvasParent.value!.getBoundingClientRect()
  const { width: rootWidth, height: rootHeight }
    = canvasRoot.value!.getBoundingClientRect()

  if ($props.direction === 'vertical') {
    initCanvasViewbox(canvasRoot.value!, (width - rootWidth) / 2, 0)
  }
  else {
    initCanvasViewbox(canvasRoot.value!, 0, (height - rootHeight) / 2)
  }
}

onMounted(() => initCenter())
</script>

<template>
  <div
    ref="canvasParent"
    class="ding-flow_canvas"
    @wheel.stop="mousewheelHandler"
    @mousedown.stop="dragStartHandler"
    @mousemove.stop="(e) => dragHandler(canvasRoot!, e)"
    @mouseup.stop="dragEndHandler"
    @click.stop
  >
    <svg class="ding-flow_root-bg">
      <defs>
        <pattern
          id="djs-small-grid-pattern"
          width="10"
          height="10"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 10,0 L 0,0 0,10 10,10 Z"
            style="
              fill: none;
              stroke: rgb(204, 204, 204);
              stroke-width: 1px;
              opacity: 0.1;
            "
          />
        </pattern>
        <pattern
          id="djs-grid-pattern"
          width="100"
          height="100"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 100,0 L 0,0 0,100 100,100 Z"
            style="
              fill: none;
              stroke: rgb(204, 204, 204);
              stroke-width: 2px;
              opacity: 0.2;
            "
          />
          <rect
            width="100"
            height="100"
            style="fill: url('#djs-small-grid-pattern')"
          />
        </pattern>
      </defs>
      <g class="layer-djs-grid-line">
        <rect
          x="-50000"
          y="-50000"
          width="100000"
          height="100000"
          style="fill: url('#djs-grid-pattern')"
        />
      </g>
    </svg>
    <div ref="canvasRoot" class="ding-flow_root">
      <slot />
    </div>
  </div>
</template>
