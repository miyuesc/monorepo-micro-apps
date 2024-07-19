<script setup lang="ts">
/**
 * @desc ServiceNode
 * @author MiyueFE <https://github.com/miyuesc>
 * @since 2024/7/12 上午10:06
 */

import type { PropType } from 'vue'
import type { FlowDirection, ServiceNode } from '@/types'

defineOptions({ name: 'ServiceNode' })

defineProps({
  data: {
    type: Object as PropType<ServiceNode>,
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
  <div class="flow-node flow-service">
    <div class="flow-node_header">
      服务
    </div>
    <div class="flow-node_content" />
  </div>
</template>

<style scoped></style>
