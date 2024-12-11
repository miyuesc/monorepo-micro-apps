<script setup lang="ts">
import { ConfigProvider, TabPane, Tabs } from '@arco-design/web-vue'
import { ref } from 'vue'

const params = ref<any[]>([])
</script>

<template>
  <ConfigProvider size="mini">
    <Tabs>
      <TabPane key="1" title="Query参数">
        <ParamsEditor
          v-model="params"
          :config="[
            {
              paramLabel: '属性名',
              paramKey: 'fieldName',
              pattern: { exp: /^[A-Za-z][A-Za-z0-9]*$/, message: '属性名只能由字母作为开头，并且只能由字母或数字组成' },
              unrepeatable: true,
              required: true,
              helpMessage: '属性名只能由字母作为开头，并且只能由字母或数字组成',
            },
            { paramLabel: '描述名称', paramKey: 'fieldLabel', required: true },
            { paramLabel: '默认值', paramKey: 'fieldValue' },
          ]"
        />
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
