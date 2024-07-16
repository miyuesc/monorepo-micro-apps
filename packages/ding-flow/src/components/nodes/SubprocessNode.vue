<script setup lang="ts">
/**
 * @desc SubprocessNode
 * @author MiyueFE <https://github.com/miyuesc>
 * @since 2024/7/12 上午10:07
 */

import PropsGenerator from '@/utils/common-props'
import type { SubprocessNode } from '@/types'

defineOptions({ name: 'SubprocessNode' })
const $props = defineProps(PropsGenerator<SubprocessNode>())
</script>

<template>
  <div class="flow-node flow-subprocess">
    <div class="flow-node_header">
      子流程
    </div>
    <DingFlow :data="data.start" />
  </div>
</template>
