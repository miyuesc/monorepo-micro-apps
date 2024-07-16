<script setup lang="ts">
/**
 * @desc GatewayNode
 * @author MiyueFE <https://github.com/miyuesc>
 * @since 2024/7/12 上午10:06
 */

import { type PropType, computed } from 'vue'
import PropsGenerator from '@/utils/common-props'
import type { BaseNode, BranchNodeList, FlowDirection, GatewayNode } from '@/types'
import { createNode } from '@/utils/element-utils'

defineOptions({ name: 'GatewayNode' })

const $props = defineProps({
  ...PropsGenerator<GatewayNode>(),
  direction: {
    type: String as PropType<FlowDirection>,
    default: 'vertical',
    validator: (v: FlowDirection) => ['vertical', 'horizontal'].includes(v),
  },
})
const $emits = defineEmits(['click', 'update:data'])

const computedGatewayNode = computed<GatewayNode>({
  get: () => $props.data,
  set: node => $emits('update:data', node),
})

function nextNodeTraversal(node: BaseNode | null): BaseNode[] {
  if (!node) {
    return []
  }
  const list: BaseNode[] = []
  let curNode: BaseNode | null = node
  while (curNode) {
    list.push(curNode)
    curNode = curNode.next
  }
  return list
}
const branchesNodeList = computed<BranchNodeList[]>(() => {
  const branches: BranchNodeList[] = []
  const expressions = computedGatewayNode.value.expressions
  for (const ex of expressions) {
    branches.push({
      expression: ex,
      nextNodeList: nextNodeTraversal(ex.next),
    })
  }
  return branches
})

function addExpression() {
  const newExpression = createNode('expression', `条件-${computedGatewayNode.value.expressions.length + 1}`)
  newExpression.parent = computedGatewayNode.value
  computedGatewayNode.value.expressions.push(newExpression)
}
</script>

<template>
  <div class="flow-node flow-gateway">
    <div class="gateway-node__behavior">
      <button class="df-button df-button-primary df-button-round" @click="addExpression">
        <span>添加条件</span>
      </button>
    </div>

    <div class="gateway-node__branches">
      <div
        v-for="(branch, bi) in branchesNodeList"
        :key="branch.expression.id"
        class="branch-col"
      >
        <DingFlow
          v-model:data="branchesNodeList[bi].expression"
          :idx="bi"
          :direction="direction"
          :can-remove="canRemove"
          :can-append="canAppend"
          :can-move="canMove"
          :remove-validator="removeValidator"
          @click="$emits('click', $event)"
        />
      </div>
    </div>
  </div>
</template>
