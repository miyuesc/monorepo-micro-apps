<script setup lang="ts">
import { ConfigProvider, TabPane, Tabs } from '@arco-design/web-vue'
</script>

<template>
  <ConfigProvider size="mini">
    <Tabs>
      <TabPane key="1" title="Query参数">
        <ParamsEditor />
      </TabPane>
      <TabPane key="2" title="Path参数">
        Content of Tab Panel 2
      </TabPane>
      <TabPane key="3" title="Body参数">
        Content of Tab Panel 3
      </TabPane>
      <TabPane key="4" title="Headers参数">
        Content of Tab Panel 4
      </TabPane>
    </Tabs>
  </ConfigProvider>
</template>

<style lang="scss">
html,
body,
#app {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  position: relative;
}
#app {
  padding: 20px;
}
</style>
