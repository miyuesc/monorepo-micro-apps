<script setup lang="ts">
/**
 * @desc FlowCanvas
 * @author MiyueFE <https://github.com/miyuesc>
 * @since 2024/7/17 下午5:19
 */

import { ref } from 'vue'
import { scaleHandler } from '@/utils/zoom'

defineOptions({ name: 'FlowCanvas' })

const canvasRoot = ref<HTMLDivElement>()

function mousewheelHandler(e: WheelEvent) {
  if (!e.ctrlKey || e.shiftKey)
    return

  e.preventDefault()
  // zoomHandler(e)
  scaleHandler(canvasRoot.value!, e)
}
</script>

<template>
  <div class="ding-flow_canvas" @wheel.capture.stop="mousewheelHandler">
    <div ref="canvasRoot" class="ding-flow_root">
      <slot />
    </div>
  </div>
</template>
