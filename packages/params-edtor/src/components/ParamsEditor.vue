<script setup lang="ts">
/**
 * @desc ParamsEditor
 * @author DragonTeam <https://www.bpmport.com>
 * @since 2024/12/10 17:00
 */

import type { PropType } from 'vue'
import { computed, nextTick, ref, watch } from 'vue'

import { Input, Tooltip } from '@arco-design/web-vue'
import { IconQuestionCircle } from '@arco-design/web-vue/es/icon'
import { debounce } from '@miyue-mma/shared'
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
  columnLayout: {
    type: String as PropType<string>,
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

const emits = defineEmits(['update:modelValue', 'change'])

const editable = computed(() => {
  return !props.readonly && !props.disabled
})

const computedParamItems = computed(() => {
  return props.config.filter(item => item.show !== false)
})

const computedGridStyles = computed(() => {
  if (props.columnLayout) {
    return { gridTemplateColumns: props.columnLayout }
  }
  let repeatColumns = `repeat(${computedParamItems.value.length}, 1fr)`
  if (editable.value) {
    repeatColumns = `${repeatColumns} 60px`
  }
  return { gridTemplateColumns: repeatColumns }
})

const computedParamData = computed({
  get: () => props.modelValue,
  set: val => emitChange(val),
})

function emitChange(data: any[]) {
  emits('update:modelValue', data)
  emits('change', data)
}

watch(
  () => computedParamData.value,
  () => emitChange(computedParamData.value),
  { deep: true },
)

const appendItem = ref<any>({})
const inputRefs = ref<any>({})
const inputRefsSet = new Set<any>()

function setRefMap(el: any, key: string) {
  if (el && !inputRefsSet.has(el)) {
    inputRefsSet.add(el)
    if (!inputRefs.value[key]) {
      inputRefs.value[key] = [el]
    }
    else {
      inputRefs.value[key].push(el)
    }
  }
}
const debounceAddRow = debounce((key: string) => {
  computedParamData.value.push({ ...appendItem.value })
  appendItem.value = {}
  emitChange(computedParamData.value)
  nextTick(() => {
    const idx = computedParamData.value.length - 1
    inputRefs.value[key]?.[idx]?.focus()
  })
}, 0)
</script>

<template>
  <div class="params-editor_wrap">
    <div class="params-editor_content">
      <div class="params-editor_header" :style="computedGridStyles">
        <div v-for="i in computedParamItems" :key="i.paramKey" class="params-editor_header-title">
          <Tooltip v-if="i.helpMessage" :content="i.helpMessage">
            <IconQuestionCircle class="params-editor_header-title-icon" />
          </Tooltip>
          <span>{{ i.paramLabel }}</span>
        </div>
        <div v-if="editable" class="params-editor_header-appender" />
      </div>
      <div class="params-editor_table" :style="computedGridStyles">
        <template v-for="(param, idx) in computedParamData" :key="idx">
          <div v-for="j in computedParamItems" :key="j.paramKey" class="params-editor_table-item">
            <Input
              :ref="(el) => setRefMap(el, j.paramKey)"
              v-model="param[j.paramKey]"
              :disabled="disabled"
              :readonly="readonly"
              :placeholder="j.paramLabel"
            />
          </div>

          <div v-if="editable" class="params-editor_table-item">
            删除
          </div>
        </template>
      </div>
      <div v-if="editable" class="params-editor_appender" :style="computedGridStyles">
        <div v-for="i in computedParamItems" :key="i.paramKey" class="params-editor_appender-item">
          <Input
            v-model="appendItem[i.paramKey]"
            :placeholder="i.paramLabel"
            @input="() => debounceAddRow(i.paramKey)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.params-editor_wrap {
  width: 100%;
}
.params-editor_header,
.params-editor_table,
.params-editor_appender {
  width: 100%;
  display: grid;
  gap: 0.5rem;
}
.params-editor_table,
.params-editor_appender {
  padding-top: 10px;
}

.params-editor_header {
  line-height: 32px;
  .params-editor_header-title-icon {
    padding-right: 10px;
  }
}
</style>
