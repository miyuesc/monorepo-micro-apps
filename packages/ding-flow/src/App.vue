<script setup lang="ts">
import type { ComponentInstance } from 'vue'
import { ref, toRaw } from 'vue'
import DingFlow from '@/components/DingFlow.vue'
import type { FlowDirection } from '@/types'
import TippyPopover from '@/components/base/TippyPopover.vue'
import { createPresetProcess } from '@/utils/element-utils'

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

const dingFlowRef = ref<ComponentInstance<typeof DingFlow>>()

function center() {
  dingFlowRef.value?.fitViewport()
}

const processData = ref(createPresetProcess())

function getData() {
  console.log(toRaw(processData.value))
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
      <button @click="center">
        自适应居中
      </button>
      <button @click="getData">
        数据打印
      </button>
      <div>
        缩放倍率
        <input :value="zoomValue">
      </div>
      <a href="https://github.com/miyuesc/monorepo-micro-apps" target="_blank">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-github"
        >
          <path
            d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"
          />
          <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
      </a>
    </div>
    <TippyPopover target=".demo-page .header-tips">
      <template #default>
        <p>练习项目</p>
        <p>画布拖拽与缩放, 鼠标滚动控制</p>
        <p>节点拖拽移动, 拖拽前置校验, 放置前置校验</p>
        <p>节点删除校验, 操作校验, 节点配置完整性校验</p>
      </template>
    </TippyPopover>
    <DingFlow ref="dingFlowRef" v-model:data="processData" :direction="dir" @zoom-changed="changeZoomValue" />
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
  padding: 20px;
  border: 2px solid var(--color-border-3);
  background-color: var(--color-bg-1);
  color: var(--color-text-1);
}
.demo-btns {
  display: flex;
  gap: 10px;
  z-index: 10;
}
</style>
