<script setup lang="ts">
</script>

<template>
  <a-config-provider size="mini">
    <a-tabs>
      <a-tab-pane key="1" title="Query参数">
        Content of Tab Panel 1
      </a-tab-pane>
      <a-tab-pane key="2" title="Path参数">
        Content of Tab Panel 2
      </a-tab-pane>
      <a-tab-pane key="3" title="Body参数">
        Content of Tab Panel 3
      </a-tab-pane>
      <a-tab-pane key="4" title="Headers参数">
        Content of Tab Panel 4
      </a-tab-pane>
    </a-tabs>
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
</style>
