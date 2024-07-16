<script setup lang="ts">
/**
 * @desc ExpressionNode
 * @author MiyueFE <https://github.com/miyuesc>
 * @since 2024/7/12 上午10:07
 */

import PropsGenerator from '@/utils/common-props'
import type { ExpressionNode } from '@/types'

defineOptions({ name: 'ExpressionNode' })

const $props = defineProps(PropsGenerator<ExpressionNode>())
const $emits = defineEmits(['click', 'update:data'])
</script>

<template>
  <div class="flow-node flow-expression">
    <div class="flow-node_header">
      {{ data.name || '条件' }}
    </div>
    <div class="flow-node_content" />
  </div>
</template>
