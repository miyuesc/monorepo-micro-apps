<script setup lang="ts">
/**
 * @desc NodeBehavior
 * @author MiyueFE <https://github.com/miyuesc>
 * @since 2024/7/12 上午10:06
 */

import type { ComponentInstance, Ref } from 'vue'
import { shallowRef } from 'vue'
import TippyPopover from './TippyPopover.vue'
import type { BaseNode, BaseNodeType } from '@/types'
import { getDragData } from '@/utils/element-utils'

defineOptions({ name: 'NodeBehavior' })

const $emits = defineEmits<{
  append: [type: BaseNodeType]
  dropped: [node: Ref<BaseNode>]
}>()

const triggerRef = shallowRef<HTMLDivElement>()
const popRef = shallowRef<ComponentInstance<typeof TippyPopover>>()

function emitClick(type: BaseNodeType) {
  $emits('append', type)
  popRef.value?.hidden()
}

function emitDropNode(ev: DragEvent) {
  const node = getDragData(ev)
  if (node) {
    $emits('dropped', node)
  }
}

function validateDrop(ev: DragEvent) {
  ev.preventDefault()
}
</script>

<template>
  <div class="flow-node__behavior">
    <div
      ref="triggerRef"
      class="flow-node__behavior-btn df-button df-button-circle df-button-primary"
      @drop.stop="emitDropNode"
      @dragover.stop="validateDrop"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="icon icon-tabler icons-tabler-outline icon-tabler-plus"
      >
        <path d="M12 5l0 14" />
        <path d="M5 12l14 0" />
      </svg>
    </div>
    <TippyPopover ref="popRef" placement="bottom-start" :target="triggerRef">
      <template #default>
        <div>
          <span class="node-behavior__header">添加节点</span>
          <div class="node-behavior__btn">
            <button @click.stop="emitClick('task')">
              任务
            </button>
            <button @click.stop="emitClick('service')">
              服务
            </button>
            <button @click.stop="emitClick('event')">
              事件
            </button>
            <button @click.stop="emitClick('gateway')">
              网关
            </button>
            <button @click.stop="emitClick('subprocess')">
              子流程
            </button>
          </div>
        </div>
      </template>
    </TippyPopover>
  </div>
</template>
