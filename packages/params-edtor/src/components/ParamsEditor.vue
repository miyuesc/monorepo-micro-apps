<script setup lang="ts">
/**
 * @desc ParamsEditor
 * @author DragonTeam <https://www.bpmport.com>
 * @since 2024/12/10 17:00
 */

import type { PropType } from 'vue'
import { computed, nextTick, ref, watch } from 'vue'

import { Input, Popconfirm, Tooltip } from '@arco-design/web-vue'
import { IconMinusCircle, IconQuestionCircle } from '@arco-design/web-vue/es/icon'
import type { ParamsEditorConfig } from '@/types/ParamsEditor'

defineOptions({ name: 'ParamsEditor' })

const props = defineProps({
  modelValue: {
    type: Array as PropType<Array<Record<string, any>>>,
    default: () => [],
  },
  config: {
    type: Array as PropType<Array<ParamsEditorConfig>>,
    default: () => [],
  },
  rowKey: {
    type: String as PropType<string>,
    default: 'id',
  },
  columnLayout: {
    type: String as PropType<string>,
  },
  confirmText: {
    type: String as PropType<string>,
    default: '确定删除这个参数吗？',
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
  // 允许添加
  allowAdd: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
  // 允许移除
  allowDelete: {
    type: Boolean as PropType<boolean>,
    default: true,
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
  if (editable.value && props.allowDelete) {
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
function validateUnique(config: ParamsEditorConfig, val: string) {
  const { paramKey, pattern, unrepeatable, required, paramLabel, disabled } = config
  // 不可编辑时直接忽略
  if (disabled) {
    return
  }
  // 必填验证
  if (required && !val) {
    return `${paramLabel}不能为空`
  }
  // 正则验证
  if (pattern) {
    const expressions = Array.isArray(pattern) ? pattern : [pattern]
    for (const expression of expressions) {
      if (!expression.exp.test(val)) {
        return expression.message
      }
    }
  }
  // 重复验证
  if (unrepeatable) {
    const idx: number[] = []
    computedParamData.value.forEach((item, index) => {
      if (item[paramKey] === val) {
        idx.push(index + 1)
      }
    })
    if (idx.length > 1) {
      return `第 ${idx.join('，')} 行重复`
    }
  }
}

function debounceAddRow(key: string) {
  const newItem: any = {}
  for (const p of computedParamItems.value) {
    newItem[p.paramKey] = p.defaultValue
  }
  computedParamData.value.push({})
  nextTick(() => {
    const idx = computedParamData.value.length - 1
    inputRefs.value[key]?.[idx]?.focus?.()
    computedParamData.value[idx] = { ...newItem, ...appendItem.value }
    appendItem.value = {}
    emitChange(computedParamData.value)
  })
}

async function removeRow(idx: number, item: any) {
  if (!editable.value)
    return
  try {
    let canRemove = true
    if (props.removeEffect) {
      canRemove = await props.removeEffect(item)
    }
    if (canRemove) {
      const values = [...computedParamData.value]
      values.splice(idx, 1)
      computedParamData.value = values
    }
  }
  catch (e) {
    console.error(e)
  }
}

function validate() {
  return new Promise((resolve, reject) => {
    for (const param of computedParamData.value) {
      for (const config of computedParamItems.value) {
        if (validateUnique(config, param[config.paramKey])) {
          reject(new Error('参数校验失败'))
          return
        }
      }
    }
    resolve(true)
  })
}

defineExpose({ validate })
</script>

<template>
  <div class="params-editor_wrap">
    <div class="params-editor_content">
      <div class="params-editor_header" :style="computedGridStyles">
        <div v-for="i in computedParamItems" :key="i.paramKey" class="params-editor_header-title">
          <Tooltip v-if="i.helpMessage" :content="i.helpMessage">
            <IconQuestionCircle class="params-editor_header-title-icon" />
          </Tooltip>
          <span>{{ i.paramLabel || '' }}</span>
        </div>
        <div v-if="editable && allowDelete" class="params-editor_header-appender" />
      </div>
      <div class="params-editor_table" :style="computedGridStyles">
        <template v-for="(param, idx) in computedParamData" :key="idx">
          <div v-for="j in computedParamItems" :key="j.paramKey" class="params-editor_table-item">
            <component
              :is="j.component"
              v-if="j.component"
              :ref="(el) => setRefMap(el, j.paramKey)"
              v-model="param[j.paramKey]"
              :disabled="j.disabled || disabled"
              :readonly="readonly"
              :placeholder="j.paramLabel"
              v-bind="j.componentProps || {}"
            />
            <ValidatorInput
              v-else-if="j.required"
              :ref="(el) => setRefMap(el, j.paramKey)"
              v-model="param[j.paramKey]"
              :disabled="j.disabled || disabled"
              :readonly="readonly"
              :placeholder="j.paramLabel"
              :validator="(val) => validateUnique(j, val)"
            />
            <Input
              v-else
              :ref="(el) => setRefMap(el, j.paramKey)"
              v-model:value="param[j.paramKey]"
              :placeholder="j.paramLabel"
              :disabled="j.disabled || disabled"
              :readonly="readonly"
            />
          </div>

          <div v-if="editable && allowDelete" class="params-editor_table-item">
            <Popconfirm
              :content="confirmText"
              @ok="() => removeRow(idx, param)"
              @cancel="() => {}"
            >
              <span class="params-editor_table-remove">
                <IconMinusCircle />
              </span>
            </Popconfirm>
          </div>
        </template>
      </div>
      <div v-if="editable && allowAdd" class="params-editor_appender" :style="computedGridStyles">
        <div v-for="i in computedParamItems" :key="i.paramKey" class="params-editor_appender-item">
          <template v-if="i.showAppender !== false">
            <component
              :is="i.component"
              v-if="i.component"
              v-model="appendItem[i.paramKey]"
              v-bind="i.componentProps || {}"
              :placeholder="i.paramLabel"
              @change="() => debounceAddRow(i.paramKey)"
            />
            <Input
              v-else
              v-model:value="appendItem[i.paramKey]"
              :placeholder="i.paramLabel"
              @input="() => debounceAddRow(i.paramKey)"
            />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
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

.params-editor_header {
  line-height: 32px;
  border-bottom: 1px solid #f0f0f0;
  .params-editor_header-title-icon {
    padding-right: 10px;
  }
}

.params-editor_table {
  padding-top: 10px;
  .params-editor_table-item-icon {
    &.validate-error {
      color: red;
    }
    &.validate-success {
      color: green;
    }
  }

  .params-editor_table-remove {
    cursor: pointer;
    color: red;
  }
}
.params-editor_appender {
  padding-top: 0.5rem;
}
</style>
