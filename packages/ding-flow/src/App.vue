<script setup lang="ts">
import { ref } from 'vue'
import DingFlow from '@/components/DingFlow.vue'
import type { FlowDirection } from '@/types'
import TippyPopover from '@/components/base/TippyPopover.vue'

const dir = ref<FlowDirection>('vertical')
function toggleDir() {
  dir.value = dir.value === 'vertical' ? 'horizontal' : 'vertical'
}
function toggleTheme() {
  const isDark = document.body.getAttribute('arco-theme') === 'dark'
  if (isDark) {
    document.body.removeAttribute('arco-theme')
  }
  else {
    document.body.setAttribute('arco-theme', 'dark')
  }
}

const zoomValue = ref(1)
function changeZoomValue(value: number) {
  zoomValue.value = value
}
</script>

<template>
  <div class="demo-page">
    <div class="demo-btns">
      <button class="header-tips">
        Tips
      </button>
      <button @click="toggleDir">
        切换排列
      </button>
      <button @click="toggleTheme">
        切换主题
      </button>
      <div>
        缩放倍率
        <input :value="zoomValue">
      </div>
    </div>
    <TippyPopover target=".demo-page .header-tips">
      <template #default>
        <p>练习项目</p>
        <p>画布拖拽与缩放</p>
        <p>节点拖拽移动, 拖拽前置校验, 放置前置校验</p>
        <p>节点删除校验, 操作校验, 节点配置完整性校验</p>
      </template>
    </TippyPopover>
    <DingFlow :direction="dir" @zoom-changed="changeZoomValue" />
  </div>
</template>

<style lang="scss">
html,
body,
#app,
.demo-page {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  position: relative;
}
.demo-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.demo-btns {
  display: flex;
  gap: 10px;
  z-index: 10;
}
</style>
