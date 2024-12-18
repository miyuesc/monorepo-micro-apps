<script setup lang="ts">
import { Checkbox, ConfigProvider, Space } from '@arco-design/web-vue'
import { computed, ref } from 'vue'
import SelectPopover from '@/components/SelectPopover.vue'
import CheckButton from '@/components/CheckButton.vue'

const params = ref<any[]>([])
const readonly = ref(false)
const disabled = ref(false)
const allowAdd = ref(true)
const allowDelete = ref(true)

const options = [
  { value: 'BOOLEAN', label: '布尔' },
  { value: 'STRING', label: '字符串' },
  { value: 'INTEGER', label: '整形' },
  { value: 'FLOAT', label: '浮点' },
  { value: 'DOUBLE', label: '双精度' },
  { value: 'DATE', label: '日期' },
]

const layout = computed(() => {
  if (readonly.value || disabled.value || !allowDelete.value) {
    return '1fr 1fr 32px 1fr 1fr'
  }
  return '1fr 1fr 32px 1fr 1fr 48px'
})
</script>

<template>
  <ConfigProvider size="mini">
    <Space direction="vertical">
      <Space>
        <!--        <Checkbox v-model="readonly"> -->
        <!--          Readonly -->
        <!--        </Checkbox> -->
        <Checkbox v-model="disabled">
          Disabled
        </Checkbox>
        <Checkbox v-model="allowAdd">
          AllowAdd
        </Checkbox>
        <Checkbox v-model="allowDelete">
          AllowDelete
        </Checkbox>
      </Space>
      <ParamsEditor
        v-model="params"
        :readonly="readonly"
        :disabled="disabled"
        :allow-add="allowAdd"
        :allow-delete="allowDelete"
        :config="[
          {
            paramLabel: '参数名',
            paramKey: 'fieldName',
            pattern: {
              exp: /^[A-Za-z][A-Za-z0-9]*$/,
              message: '属性名只能由字母作为开头，并且只能由字母或数字组成',
            },
            unrepeatable: true,
            required: true,
            helpMessage: '属性名只能由字母作为开头，并且只能由字母或数字组成',
          },
          {
            paramLabel: '类型',
            paramKey: 'fieldType',
            component: SelectPopover,
            defaultValue: 'STRING',
            componentProps: { options, block: true },
          },
          {
            paramLabel: '',
            paramKey: 'empty',
            component: CheckButton,
            defaultValue: true,
            componentProps: {
              checkedIcon: 'mdi:required',
              unCheckedIcon: 'mdi:required',
            },
          },
          { paramLabel: '描述名称', paramKey: 'fieldLabel', required: true },
          { paramLabel: '默认值', paramKey: 'fieldValue' },
        ]"
        :column-layout="layout"
      />
    </Space>
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
