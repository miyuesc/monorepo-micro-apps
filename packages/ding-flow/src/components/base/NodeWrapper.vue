<script setup lang="ts">
/**
 * @desc NodeWrapper
 * @author MiyueFE <https://github.com/miyuesc>
 * @since 2024/7/12 下午2:25
 */

import type { PropType } from 'vue'
import { computed, ref } from 'vue'
import type { BaseNode, CanAppend } from '@/types'
import { appendNode, createNode } from '@/utils/element-utils'

defineOptions({ name: 'NodeWrapper' })

const $props = defineProps({
  data: {
    type: Object as PropType<BaseNode>,
    default: () => null,
  },
  canAppend: {
    type: [Boolean, Function] as PropType<CanAppend>,
    default: true,
  },
})
const $emits = defineEmits(['update:data'])
const computedModelNode = computed<BaseNode>({
  get: () => $props.data,
  set: (node: BaseNode) => $emits('update:data', node),
})

function appendNewNode(type) {
  let canAppend: CanAppend
  if (typeof $props.canAppend === 'function') {
    canAppend = $props.canAppend
  }
  else {
    canAppend = () => $props.canAppend as boolean
  }

  if (canAppend(computedModelNode.value)) {
    const newNode = ref(createNode(type))
    appendNode(computedModelNode, newNode)
  }
}
</script>

<template>
  <div v-if="$props.data" class="flow-node__wrapper">
    <slot />
    <NodeBehavior @append="appendNewNode" />
  </div>
</template>
