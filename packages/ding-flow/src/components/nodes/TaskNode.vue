<script setup lang="ts">
/**
 * @desc TaskNode
 * @author MiyueFE <https://github.com/miyuesc>
 * @since 2024/7/12 上午10:06
 */

import type { PropType } from 'vue'
import type { FlowDirection, TaskNode } from '@/types'

defineOptions({ name: 'TaskNode' })

defineProps({
  data: {
    type: Object as PropType<TaskNode>,
    required: true,
  },
  direction: {
    type: String as PropType<FlowDirection>,
    default: 'vertical',
    validator: (v: FlowDirection) => ['vertical', 'horizontal'].includes(v),
  },
})
</script>

<template>
  <div class="flow-node flow-task">
    <div class="flow-node_header">
      任务
    </div>
    <div class="flow-node_content" />
  </div>
</template>

<style scoped></style>
