<script setup lang="ts">
/**
 * @desc DingFlowList
 * @author MiyueFE <https://github.com/miyuesc>
 * @since 2024/7/12 上午10:06
 */

import type { PropType } from 'vue'
import { computed } from 'vue'
import type { BaseNode, FlowDirection } from '@/types'

defineOptions({ name: 'DingFlowList' })

const $props = defineProps({
  data: {
    type: Object as PropType<BaseNode>,
    required: true,
  },
  direction: {
    type: String as PropType<FlowDirection>,
    default: 'vertical',
    validator: (v: FlowDirection) => ['vertical', 'horizontal'].includes(v),
  },
})
const $emits = defineEmits(['update:data', 'node-click'])

const startNode = computed<BaseNode>({
  get: () => $props.data,
  set: (v) => {
    $emits('update:data', v)
  },
})

const computedCls = computed<string>(
  () => `ding-flow_container ding-flow_${$props.direction || 'vertical'}`,
)

const nodeList = computed<BaseNode[]>(() => {
  const list: BaseNode[] = []
  let nextNode: BaseNode | undefined = startNode.value
  while (nextNode) {
    list.push(nextNode)
    nextNode = nextNode.next
  }
  return list
})
</script>

<template>
  <div class="ding-flow_wrapper">
    <div :class="computedCls">
      <NodeWrapper
        v-for="(node, i) in nodeList"
        :key="node.id"
        v-model:data="nodeList[i]"
        :direction="direction"
        @click="$emits('node-click', $event)"
      />
    </div>
  </div>
</template>
