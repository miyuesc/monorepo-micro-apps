<script setup lang="ts">
/**
 * @desc EventNode
 * @author MiyueFE <https://github.com/miyuesc>
 * @since 2024/7/12 上午10:06
 */

import type { PropType } from 'vue'
import type { EventNode, FlowDirection } from '@/types'

defineOptions({ name: 'EventNode' })

const $props = defineProps({
  data: {
    type: Object as PropType<EventNode>,
    required: true,
  },
  direction: {
    type: String as PropType<FlowDirection>,
    default: 'vertical',
    validator: (v: FlowDirection) => ['vertical', 'horizontal'].includes(v),
  },
})
const $emit = defineEmits(['click'])
</script>

<template>
  <div :class="`flow-node flow-event ${data.businessData?.cls || ''}`">
    <span>{{ data.name || $t('event-node') }}</span>
  </div>
</template>
