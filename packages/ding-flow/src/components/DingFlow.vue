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
    default: undefined,
  },
  canMove: {
    type: [Boolean, Function] as PropType<CanMove>,
    default: undefined,
  },
  canDropped: {
    type: [Boolean, Function] as PropType<CanDropped>,
    default: undefined,
  },

  removeValidator: {
    type: Function as PropType<AsyncExecutionValidator>,
    default: undefined,
  },
  completenessValidator: {
    type: Function as PropType<ExecutionValidator>,
    default: undefined,
  },
  direction: {
    type: String as PropType<FlowDirection>,
    default: 'vertical',
    validator: (v: FlowDirection) => ['vertical', 'horizontal'].includes(v),
  },
})
const $emits = defineEmits([
  'update:data',
  'zoomChanged',
  'nodeClick',
  'nodeDblclick',
  'nodeHover',
  'nodeContextmenu',
])

const root = ref<BaseNode>()
const computedFlowData = computed<BaseNode>({
  get: () => $props.data || ref(createPresetProcess()).value,
  set: (v) => {
    $emits('update:data', v)
  },
})
const computedVisibleFlowData = computed<BaseNode>({
  get: () => {
    if (root.value) {
      return root.value
    }
    return computedFlowData.value
  },
  set: () => $emits('update:data', computedFlowData.value),
})

const canvas = shallowRef<ComponentInstance<typeof FlowCanvas>>()
const fitViewport = (padding?: number) => canvas.value?.fitViewport(padding)

function toggleRoot(r?: BaseNode) {
  root.value = r
}

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
  toggleRoot,
})
</script>

<template>
  <FlowCanvas ref="canvas" @zoom-changed="$emit('zoomChanged', $event)">
    <DingFlowList
      v-model:data="computedVisibleFlowData"
      :direction="direction"
      @node-click="$emits('nodeClick', $event)"
      @node-dblclick="$emits('nodeDblclick', $event)"
      @node-hover="$emits('nodeHover', $event)"
      @node-contextmenu="$emits('nodeContextmenu', $event)"
    />
  </FlowCanvas>
</template>
