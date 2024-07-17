<script setup lang="ts">
/**
 * @desc ServiceNode
 * @author MiyueFE <https://github.com/miyuesc>
 * @since 2024/7/12 上午10:06
 */

import PropsGenerator from '@/utils/common-props'
import type { ServiceNode } from '@/types'

defineOptions({ name: 'ServiceNode' })

defineProps({ ...PropsGenerator<ServiceNode>() })
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
