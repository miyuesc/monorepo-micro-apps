<script setup lang="ts">
/**
 * @desc FlowCanvas
 * @author MiyueFE <https://github.com/miyuesc>
 * @since 2024/7/17 下午5:19
 */

import { ref } from 'vue'
import {
  dragEndHandler,
  dragHandler,
  dragStartHandler,
  wheelHandler,
} from '@/utils/zoom'

defineOptions({ name: 'FlowCanvas' })

const $emits = defineEmits(['zoomChanged'])

const canvasRoot = ref<HTMLDivElement>()

const zoom = ref(1)

function zoomChanger(newZoom: number) {
  zoom.value = newZoom
  $emits('zoomChanged', zoom.value)
}

function mousewheelHandler(e: WheelEvent) {
  wheelHandler(canvasRoot.value!, e, zoomChanger)
}
</script>

<template>
  <div
    class="ding-flow_canvas"
    @wheel.stop="mousewheelHandler"
    @mousedown.stop="dragStartHandler"
    @mousemove.stop="e => dragHandler(canvasRoot!, e)"
    @mouseup.stop="dragEndHandler"
  >
    <div ref="canvasRoot" class="ding-flow_root">
      <slot />
    </div>
  </div>
</template>
