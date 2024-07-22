<script setup lang="ts">
/**
 * @desc GatewayNode
 * @author MiyueFE <https://github.com/miyuesc>
 * @since 2024/7/12 上午10:06
 */

import { type PropType, computed } from 'vue'
import type { BaseNode, BranchNodeList, FlowDirection, GatewayNode } from '@/types'
import { createNode } from '@/utils/element-utils'

defineOptions({ name: 'GatewayNode' })

const $props = defineProps({
  data: {
    type: Object as PropType<GatewayNode>,
    required: true,
  },
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

function nextNodeTraversal(node?: BaseNode): BaseNode[] {
  if (!node) {
    return []
  }
  const list: BaseNode[] = []
  let curNode: BaseNode | undefined = node
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
      <button class="df-button df-button-primary df-button-mini df-button-round" @click="addExpression">
        <span>添加条件</span>
      </button>
    </div>

    <div class="gateway-node__branches">
      <div
        v-for="(branch, bi) in branchesNodeList"
        :key="branch.expression.id"
        class="branch-col"
      >
        <div class="branch-col_prefix" />
        <div class="branch-col_content">
          <DingFlowList
            v-model:data="branchesNodeList[bi].expression"
            :idx="bi"
            :direction="direction"
            @click="$emits('click', $event)"
          />
        </div>
        <div class="branch-col_suffix" />
      </div>
    </div>
  </div>
</template>
