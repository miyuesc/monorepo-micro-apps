<script setup lang="ts">
/**
 * @desc NodeBehavior
 * @author MiyueFE <https://github.com/miyuesc>
 * @since 2024/7/12 上午10:06
 */

import { shallowRef } from 'vue'
import type { BaseNodeType } from '@/types'
import { getDragData } from '@/utils/element-utils'

defineOptions({ name: 'NodeBehavior' })

const emits = defineEmits(['click', 'drop'])

const triggerRef = shallowRef<HTMLDivElement>()

function emitClick(type: BaseNodeType) {
  emits('click', type)
}

function emitDropNode(ev: DragEvent) {
  const node = getDragData(ev)
  if (node) {
    emits('drop', node)
  }
}

function validateDrop(ev: DragEvent) {
  ev.preventDefault()
}
</script>

<template>
  <div class="flow-node__behavior">
    <div ref="triggerRef" class="flow-node__behavior-btn" @drop.stop="emitDropNode" @dragover.stop="validateDrop">
      ＋
    </div>
    <TippyPopover placement="bottom-start" :target="triggerRef">
      <template #default>
        <div>
          <span class="node-behavior__header">添加节点</span>
          <div class="node-behavior__btn">
            <button @click="emitClick('task')">
              审批
            </button>
            <button @click="emitClick('service')">
              服务
            </button>
            <button @click="emitClick('event')">
              事件
            </button>
            <button @click="emitClick('gateway')">
              网关
            </button>
            <button @click="emitClick('subprocess')">
              子流程
            </button>
          </div>
        </div>
      </template>
    </TippyPopover>
  </div>
</template>
