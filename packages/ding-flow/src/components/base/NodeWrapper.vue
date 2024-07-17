<script setup lang="ts">
/**
 * @desc NodeWrapper
 * @author MiyueFE <https://github.com/miyuesc>
 * @since 2024/7/12 下午2:25
 */

import type { PropType, Ref } from 'vue'
import { computed, ref, watchEffect } from 'vue'
import { isUndefined } from '@miyue-mma/shared'
import type { BaseNode, CanAppend, FlowDirection } from '@/types'
import { appendNode, createNode, moveNode, setDragData } from '@/utils/element-utils'
import PropsGenerator from '@/utils/common-props'

defineOptions({ name: 'NodeWrapper' })

const $props = defineProps({
  ...PropsGenerator<BaseNode>(),
  direction: {
    type: String as PropType<FlowDirection>,
    default: 'vertical',
    validator: (v: FlowDirection) => ['vertical', 'horizontal'].includes(v),
  },
})

const $emits = defineEmits(['update:data', 'click'])

const computedModelNode = computed<BaseNode>({
  get: () => $props.data,
  set: (node: BaseNode) => $emits('update:data', node),
})

const appendable = ref(false)
const removable = ref(false)
const movable = ref(false)

const isCompleteness = ref(false)

async function validateProp(key: string) {
  if (isUndefined($props[key]))
    return true

  if (typeof $props[key] === 'function') {
    return await $props[key](computedModelNode.value)
  }

  return $props[key]
}

watchEffect(async () => appendable.value = await validateProp('canAppend'))
watchEffect(async () => removable.value = await validateProp('canRemove'))
watchEffect(async () => movable.value = await validateProp('canMove'))
watchEffect(async () => isCompleteness.value = await validateProp('completenessValidator'))

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

function initDrag(event: DragEvent) {
  setDragData(event, computedModelNode)
}
function setDropNode(node: Ref<BaseNode>) {
  if (node.value.id === computedModelNode.value.id) {
    return
  }
  moveNode(computedModelNode, node)
}

function emitClick() {
  $emits('click', computedModelNode.value)
}

function transformNodeName(node: BaseNode): string {
  return `${node.type}-node`
}
</script>

<template>
  <div v-if="$props.data" class="flow-node__wrapper">
    <div
      :class="`flow-node__container ${movable ? 'flow-node__movable' : ''}`"
      :draggable="movable"
      @dragstart.stop="initDrag"
      @click.stop="emitClick"
    >
      <component
        :is="transformNodeName(computedModelNode)"
        v-model:data="computedModelNode"
        :direction="direction"
        :can-append="canAppend"
        :can-remove="canRemove"
        :can-move="canMove"
        :remove-validator="removeValidator"
      />
    </div>
    <NodeBehavior
      v-if="appendable"
      :data="$props.data"
      :can-append="$props.canAppend"
      :can-dropped="$props.canDropped"
      @append="appendNewNode"
      @dropped="setDropNode"
    />
  </div>
</template>
