<script setup lang="ts">
/**
 * @desc ParamsEditor
 * @author DragonTeam <https://www.bpmport.com>
 * @since 2024/12/10 17:00
 */

import type { PropType } from 'vue'
import { computed } from 'vue'
import { Tooltip } from '@arco-design/web-vue'
import { IconQuestionCircle } from '@arco-design/web-vue/es/icon'
import type { ParamsEditorConfig } from '@/types/ParamsEditor'

defineOptions({ name: 'ParamsEditor' })

const props = defineProps({
  modelValue: {
    type: Array as PropType<Array<Record<string, any>>>,
    default: () => [],
  },
  config: {
    type: Array as PropType<Array<ParamsEditorConfig>>,
    default: () => [
      { paramLabel: '参数名', paramKey: 'fieldName' },
      { paramLabel: '类型', paramKey: 'type', helpMessage: '123123' },
      { paramLabel: '描述', paramKey: 'fieldLabel' },
      { paramLabel: '默认值', paramKey: 'fieldValue' },
    ],
  },
  rowKey: {
    type: String as PropType<string>,
    default: 'id',
  },
  removeEffect: {
    type: Function as PropType<(item: any) => Promise<boolean>>,
  },
  readonly: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  disabled: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
})

const computedParamItems = computed(() => {
  return props.config.filter(item => item.show !== false)
})
</script>

<template>
  <div class="params-editor_wrap">
    <div class="params-editor_content">
      <div class="params-editor_header">
        <div v-for="i in computedParamItems" :key="i.paramKey" class="params-editor_header-title">
          <Tooltip v-if="i.helpMessage" :content="i.helpMessage">
            <IconQuestionCircle class="params-editor_header-title-icon" />
          </Tooltip>
          <span>{{ i.paramLabel }}</span>
        </div>
      </div>
      <div class="params-editor_table" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.params-editor_wrap {
  width: 100%;
}
</style>
