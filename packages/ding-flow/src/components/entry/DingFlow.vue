<script setup lang="ts">
/**
 * @desc DingFlow
 * @author MiyueFE <https://github.com/miyuesc>
 * @since 2024/7/12 上午10:06
 */

import type { PropType } from 'vue'
import { computed, ref, toRef, watchEffect } from 'vue'
import type { BaseNode, FlowDirection } from '@/types'
import PropsGenerator from '@/utils/common-props'
import { createPresetProcess } from '@/utils/element-utils'

defineOptions({ name: 'DingFlow' })

const $props = defineProps({
  ...PropsGenerator<BaseNode>(),
  direction: {
    type: String as PropType<FlowDirection>,
    default: 'vertical',
    validator: (v: FlowDirection) => ['vertical', 'horizontal'].includes(v),
  },
})
const $emits = defineEmits(['update:data', 'node-click'])

const computedCls = computed<string>(() => `ding-flow_container ding-flow_${$props.direction || 'vertical'}`)

const startNode = $props.data ? toRef($props, 'data') : ref(createPresetProcess())

const nodeList = computed<BaseNode[]>(() => {
  const list: BaseNode[] = []
  let nextNode: BaseNode | null = startNode.value
  while (nextNode) {
    list.push(nextNode)
    nextNode = nextNode.next
  }
  return list
})

function transformNodeName(node: BaseNode): string {
  return `${node.type}-node`
}

watchEffect(() => {
  $emits('update:data', startNode)
})
</script>

<template>
  <div class="ding-flow_wrapper">
    <div :class="computedCls">
      <NodeWrapper
        v-for="(node, i) in nodeList"
        :key="node.id"
        v-model:data="nodeList[i]"
        :can-append="canAppend"
      >
        <component
          :is="transformNodeName(node)"
          v-model:data="nodeList[i]"
          :direction="direction"
          :can-append="canAppend"
          :can-remove="i > 0 && canRemove"
          :can-move="i > 0 && canMove"
          :remove-validator="removeValidator"
          @click="$emits('node-click', $event)"
        />
      </NodeWrapper>
    </div>
  </div>
</template>
