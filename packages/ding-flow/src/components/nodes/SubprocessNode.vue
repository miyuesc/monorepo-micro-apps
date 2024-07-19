<script setup lang="ts">
/**
 * @desc SubprocessNode
 * @author MiyueFE <https://github.com/miyuesc>
 * @since 2024/7/12 上午10:07
 */

import type { PropType } from 'vue'
import type { FlowDirection, SubprocessNode } from '@/types'

defineOptions({ name: 'SubprocessNode' })

const $props = defineProps({
  data: {
    type: Object as PropType<SubprocessNode>,
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
  <div class="flow-node flow-subprocess">
    <div class="flow-node_header">
      子流程
    </div>
    <DingFlowList :data="data.start!" :direction="direction" />
  </div>
</template>
