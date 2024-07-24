<script setup lang="ts">
/**
 * @desc NodeWrapper
 * @author MiyueFE <https://github.com/miyuesc>
 * @since 2024/7/12 下午2:25
 */

import type { PropType, Ref } from 'vue'
import { computed, ref } from 'vue'
import { isUndefined } from '@miyue-mma/shared'
import type { BaseNode, BaseNodeType, FlowDirection } from '@/types'
import {
  appendNode,
  createNode,
  moveNode,
  setDragData,
} from '@/utils/element-utils'
import type { GlobalConfigKey } from '@/utils/global-config'
import { getGlobalConfig } from '@/utils/global-config'

defineOptions({ name: 'NodeWrapper' })

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

const $emits = defineEmits(['update:data', 'click'])

const computedModelNode = computed<BaseNode>({
  get: () => $props.data,
  set: (node: BaseNode) => {
    $emits('update:data', node)
  },
})

function validateProp(key: GlobalConfigKey) {
  const config = getGlobalConfig(key)

  if (isUndefined(config))
    return true

  if (typeof config === 'function') {
    return config(computedModelNode.value) as boolean
  }

  return config
}

const appendable = ref(false)
const removable = ref(false)
const movable = ref(false)
// const isCompleteness = ref(false)

function init() {
  appendable.value = validateProp('canAppend')
  removable.value = validateProp('canRemove')
  movable.value = validateProp('canMove')
  // isCompleteness.value = validateProp('completenessValidator')
}

init()

// 校验提示
const isCompleteness = computed(() => {
  return validateProp('completenessValidator')
})

// 追加节点
function appendNewNode(
  type: BaseNodeType,
  name: string,
  bo: Record<string, any> = {},
) {
  let canAppend = getGlobalConfig('canAppend')
  if (typeof canAppend !== 'function') {
    canAppend = () => canAppend as boolean
  }
  if (canAppend(computedModelNode.value)) {
    // @ts-expect-error
    const newNode = ref(createNode(type, computedModelNode.value?.$parent, name, bo))
    appendNode(computedModelNode, newNode)
  }
}

// 拖拽与放置
function initDrag() {
  setDragData(computedModelNode)
}
function setDropNode(node: Ref<BaseNode>) {
  if (node.value.id === computedModelNode.value.id) {
    return
  }
  moveNode(computedModelNode, node)
}

// 点击事件
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
      class="flow-node__container" :class="{
        'flow-node__movable': movable,
        'flow-node__uncompleted': !isCompleteness,
      }"
      :draggable="movable"
      @dragstart.stop="initDrag"
      @click.stop="emitClick"
      @mousedown.stop
    >
      <component
        :is="transformNodeName(computedModelNode)"
        v-model:data="computedModelNode"
        :direction="direction"
      />
    </div>
    <NodeBehavior
      v-if="appendable"
      :data="$props.data"
      @append="appendNewNode"
      @dropped="setDropNode"
    />
  </div>
</template>
