<script setup lang="ts">
/**
 * @desc TaskNode
 * @author MiyueFE <https://github.com/miyuesc>
 * @since 2024/7/12 上午10:06
 */

import type { TaskNode } from '@/types'
import PropsGenerator from '@/utils/common-props'

defineOptions({ name: 'TaskNode' })

defineProps({ ...PropsGenerator<TaskNode>() })
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
