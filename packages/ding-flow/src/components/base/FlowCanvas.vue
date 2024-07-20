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
  scaleHandler,
} from '@/utils/zoom'

defineOptions({ name: 'FlowCanvas' })

const canvasRoot = ref<HTMLDivElement>()

function mousewheelHandler(e: WheelEvent) {
  if (!e.ctrlKey || e.shiftKey)
    return

  e.preventDefault()
  scaleHandler(canvasRoot.value!, e)
}
</script>

<template>
  <div
    class="ding-flow_canvas"
    @wheel.capture.stop="mousewheelHandler"
    @mousedown.capture.stop="dragStartHandler"
    @mousemove.capture.stop="e => dragHandler(canvasRoot!, e)"
    @mouseup.capture.stop="dragEndHandler"
  >
    <div ref="canvasRoot" class="ding-flow_root">
      <slot />
    </div>
  </div>
</template>
