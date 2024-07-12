<script setup lang="ts">
/**
 * @desc NodeWrapper
 * @author MiyueFE <https://github.com/miyuesc>
 * @since 2024/7/12 下午2:25
 */

import type { PropType } from 'vue'
import type { BaseNode, CanAdd } from '@/types'

defineOptions({ name: 'NodeWrapper' })

const $props = defineProps({
  data: {
    type: Object as PropType<BaseNode>,
    default: () => null,
  },
  canAdd: {
    type: [Boolean, Function] as PropType<CanAdd>,
    default: true,
  },
})
</script>

<template>
  <div v-if="$props.data" class="flow-node__wrapper">
    <slot />
    <NodeBehavior />
  </div>
</template>
