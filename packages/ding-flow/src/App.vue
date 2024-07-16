<script setup lang="ts">
import { ref } from 'vue'
import DingFlow from '@/components/entry/DingFlow.vue'
import type { FlowDirection } from '@/types'

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
</script>

<template>
  <div class="demo-page">
    <div class="demo-btns">
      <button @click="toggleDir">
        切换排列
      </button>
      <button @click="toggleTheme">
        切换主题
      </button>
    </div>
    <DingFlow :direction="dir" />
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
.demo-btns {
  display: flex;
  gap: 10px;
  position: absolute;
  left: 20px;
  top: 20px;
  z-index: 10;
}
</style>
