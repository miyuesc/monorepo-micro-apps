<script setup lang="ts">
/**
 * @desc EventNode
 * @author MiyueFE <https://github.com/miyuesc>
 * @since 2024/7/12 上午10:06
 */

import type { EventNode } from '@/types'
import PropsGenerator from '@/utils/common-props'

defineOptions({ name: 'EventNode' })

const $props = defineProps(PropsGenerator<EventNode>())
const $emit = defineEmits(['click'])
</script>

<template>
  <div :class="`flow-node flow-event ${data.businessData?.cls || ''}`">
    <span>{{ data.name || $t('event-node') }}</span>
  </div>
</template>
