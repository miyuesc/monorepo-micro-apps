<script setup lang="ts">
/**
 * @desc NodeBehavior
 * @author MiyueFE <https://github.com/miyuesc>
 * @since 2024/7/12 上午10:06
 */

import type { ComponentInstance, PropType, Ref } from 'vue'
import { ref, shallowRef } from 'vue'
import TippyPopover from './TippyPopover.vue'
import type { BaseNode, BaseNodeType } from '@/types'
import { getDragData } from '@/utils/element-utils'
import { getGlobalConfig } from '@/utils/global-config'

defineOptions({ name: 'NodeBehavior' })

const $props = defineProps({
  data: {
    type: Object as PropType<BaseNode>,
    required: true,
  },
})

const $emits = defineEmits<{
  append: [type: BaseNodeType, name: string, bo?: Record<string, any>]
  dropped: [node: Ref<BaseNode>]
}>()

const triggerRef = shallowRef<HTMLDivElement>()
const popRef = shallowRef<ComponentInstance<typeof TippyPopover>>()
const droppable = ref(false)
const dropin = ref(false)

function emitClick(type: BaseNodeType, name: string) {
  $emits('append', type, name)
  popRef.value?.hidden()
}

async function emitDropNode(ev: DragEvent) {
  ev.preventDefault()
  dropin.value = false
  const node = getDragData()
  if (node && await validateDrop()) {
    $emits('dropped', node)
  }
}

async function validateDrop() {
  if (!getDragData()) {
    return false
  }
  const canDropped = getGlobalConfig('canDropped')

  if (typeof canDropped === 'function') {
    return await canDropped($props.data, getDragData()?.value) as boolean
  }

  return canDropped
}

async function toggleDroppableState(droppin: boolean) {
  dropin.value = droppin
  droppable.value = await validateDrop()
}
</script>

<template>
  <div class="flow-node__behavior">
    <div
      ref="triggerRef"
      class="flow-node__behavior-btn df-button df-button-circle df-button-primary"
      :class="{ 'flow-node__droppable': dropin && droppable, 'flow-node__not-droppable': dropin && !droppable }"
      @drop.stop="emitDropNode"
      @dragover.capture.stop.prevent="toggleDroppableState(true)"
      @dragleave.capture.stop.prevent="toggleDroppableState(false)"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="icon"
      >
        <path d="M12 5l0 14" />
        <path d="M5 12l14 0" />
      </svg>
    </div>
    <TippyPopover ref="popRef" placement="bottom-start" :target="triggerRef">
      <template #default>
        <div>
          <span class="node-behavior__header">添加节点</span>
          <div class="node-behavior__btn-grid">
            <button class="node-behavior__btn" @click.stop="emitClick('task', '任务节点')">
              任务
            </button>
            <button class="node-behavior__btn" @click.stop="emitClick('service', '服务节点')">
              服务
            </button>
            <button class="node-behavior__btn" @click.stop="emitClick('event', '事件')">
              事件
            </button>
            <button class="node-behavior__btn" @click.stop="emitClick('gateway', '网关节点')">
              网关
            </button>
            <button class="node-behavior__btn" @click.stop="emitClick('subprocess', '子流程')">
              子流程
            </button>
          </div>
        </div>
      </template>
    </TippyPopover>
  </div>
</template>
