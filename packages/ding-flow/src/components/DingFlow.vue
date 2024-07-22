<script setup lang="ts">
/**
 * @desc DingFlow
 * @author MiyueFE <https://github.com/miyuesc>
 * @since 2024/7/17 下午5:21
 */

import type { ComponentInstance, PropType } from 'vue'
import { computed, ref, shallowRef, watchEffect } from 'vue'
import type {
  AsyncExecutionValidator,
  BaseNode,
  CanAppend,
  CanDropped,
  CanMove,
  CanRemove,
  ExecutionValidator,
  FlowDirection,
} from '@/types'
import { createPresetProcess } from '@/utils/element-utils'
import { setGlobalConfig } from '@/utils/global-config'
import FlowCanvas from '@/components/base/FlowCanvas.vue'

defineOptions({ name: 'DingFlow' })

const $props = defineProps({
  data: {
    type: Object as PropType<BaseNode>,
    default: () => null,
  },
  canRemove: {
    type: [Boolean, Function] as PropType<CanRemove>,
    default: true,
  },
  canAppend: {
    type: [Boolean, Function] as PropType<CanAppend>,
    default: () => (node: BaseNode) => node.businessData?.$type !== 'endEvent',
  },
  canMove: {
    type: [Boolean, Function] as PropType<CanMove>,
    default: () => (node: BaseNode) => node.businessData?.$type !== 'endEvent' && node.businessData?.$type !== 'startEvent' && node.type !== 'expression',
  },
  canDropped: {
    type: [Boolean, Function] as PropType<CanDropped>,
    default: () => (target: BaseNode, node: BaseNode) => {
      return target.next?.id !== node.id && target.id !== node.id
    },
  },

  removeValidator: {
    type: Function as PropType<AsyncExecutionValidator>,
    default: () => async () => true,
  },
  completenessValidator: {
    type: Function as PropType<ExecutionValidator>,
    default: () => async () => true,
  },
  direction: {
    type: String as PropType<FlowDirection>,
    default: 'vertical',
    validator: (v: FlowDirection) => ['vertical', 'horizontal'].includes(v),
  },
})
const $emits = defineEmits(['update:data', 'nodeClick', 'zoomChanged'])

const computedFlowData = computed<BaseNode>({
  get: () => $props.data || ref(createPresetProcess()).value,
  set: (v) => {
    $emits('update:data', v)
  },
})

const canvas = shallowRef<ComponentInstance<typeof FlowCanvas>>()
const fitViewport = (padding?: number) => canvas.value?.fitViewport(padding)

watchEffect(() => {
  setGlobalConfig('canAppend', $props.canAppend)
  setGlobalConfig('canRemove', $props.canRemove)
  setGlobalConfig('canMove', $props.canMove)
  setGlobalConfig('canDropped', $props.canDropped)
  setGlobalConfig('removeValidator', $props.removeValidator)
  setGlobalConfig('completenessValidator', $props.completenessValidator)
})

defineExpose({
  fitViewport,
})
</script>

<template>
  <FlowCanvas ref="canvas" @zoom-changed="$emit('zoomChanged', $event)">
    <DingFlowList v-model:data="computedFlowData" :direction="direction" />
  </FlowCanvas>
</template>
