<script setup lang="ts">
import type { ComponentInstance } from 'vue'
import { ref, toRaw } from 'vue'
import { CircleHelp } from 'lucide-vue-next'
import DingFlow from '@/components/DingFlow.vue'
import type { BaseNode, FlowDirection, SubprocessNode } from '@/types'
import TippyPopover from '@/components/base/TippyPopover.vue'
import { createPresetProcess } from '@/utils/element-utils'
import { toJson } from '@/utils/transform'

const dir = ref<FlowDirection>('vertical')
const dingFlowRef = ref<ComponentInstance<typeof DingFlow>>()

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

function toggleRoot(node?: BaseNode) {
  dingFlowRef.value?.toggleRoot(node as SubprocessNode)
}

function center() {
  dingFlowRef.value?.fitViewport()
}

const processData = ref(createPresetProcess())

function getData() {
  console.log(toJson(toRaw(processData.value)))
}
</script>

<template>
  <a-config-provider size="mini">
    <div class="demo-page">
      <a-space>
        <a-button type="primary" @click="toggleDir">
          切换排列
        </a-button>
        <a-button type="primary" @click="toggleTheme">
          切换主题
        </a-button>
        <a-button type="primary" @click="center">
          自适应居中
        </a-button>
        <a-button type="primary" @click="toggleRoot()">
          还原根节点
        </a-button>
        <a-button type="primary" @click="getData()">
          打印数据
        </a-button>

        <a-button type="primary" class="header-tips">
          <template #icon>
            <CircleHelp :size="12" />
          </template>
          Tips
        </a-button>
      </a-space>
      <TippyPopover target=".demo-page .header-tips">
        <template #default>
          <h2>练习项目</h2>
          <p>画布拖拽与缩放, 鼠标滚动控制</p>
          <p>节点拖拽移动, 拖拽前置校验, 放置前置校验</p>
          <p>节点删除校验, 操作校验, 节点配置完整性校验</p>
          <p>双击进入子流程</p>
        </template>
      </TippyPopover>
      <DingFlow ref="dingFlowRef" v-model:data="processData" :direction="dir" @zoom-changed="changeZoomValue" @node-dblclick="toggleRoot" />
    </div>
  </a-config-provider>
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
  padding: 0 20px 20px 20px;
  border: 2px solid var(--color-border-3);
  background-color: var(--color-bg-1);
  color: var(--color-text-1);
}
.demo-btns {
  display: flex;
  gap: 10px;
  z-index: 10;
  width: 100%;
  .header-tips {
    margin-left: auto;
  }
}
</style>
