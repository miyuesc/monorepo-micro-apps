<script setup lang="ts">
/**
 * @desc ExpressionNode
 * @author MiyueFE <https://github.com/miyuesc>
 * @since 2024/7/12 上午10:07
 */

import type { PropType } from 'vue'
import type { ExpressionNode, FlowDirection } from '@/types'

defineOptions({ name: 'ExpressionNode' })

defineProps({
  data: {
    type: Object as PropType<ExpressionNode>,
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
  <div class="flow-node flow-expression">
    <div class="flow-node_header">
      {{ data.name || '条件' }}
    </div>
    <div class="flow-node_content" />
  </div>
</template>
