<script setup lang="ts">
/**
 * @desc ValidatorInput
 * @author DragonTeam <https://www.bpmport.com>
 * @since 2024/12/11 14:34
 */

import { Input, Tooltip } from '@arco-design/web-vue'
import { IconCheckCircle, IconCloseCircle } from '@arco-design/web-vue/es/icon'
import type { ComponentInstance, PropType } from 'vue'
import { computed, ref, watchEffect } from 'vue'
import type { ParamsEditorPattern } from '@/types/ParamsEditor'

defineOptions({ name: 'ValidatorInput' })

const props = defineProps({
  modelValue: {
    type: String as PropType<string>,
  },
  readonly: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  disabled: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  required: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  pattern: {
    type: Object as PropType<ParamsEditorPattern>,
  },
  validator: {
    type: Function as PropType<(value: string) => string | undefined>,
  },
})
const emits = defineEmits(['update:modelValue', 'change'])

const computedModelValue = computed<string>({
  get: () => props.modelValue as string,
  set: (value) => {
    emits('update:modelValue', value)
    emits('change', value)
  },
})

const suffixVisible = computed(() => {
  if (props.required || props.pattern || props.validator)
    return true
  return false
})

const inputRef = ref<ComponentInstance<typeof Input>>()

const modelValueValidate = ref<{ error: boolean, message: string }>({
  error: false,
  message: '',
})

watchEffect(() => {
  if (props.validator) {
    const message = props.validator(computedModelValue.value)
    if (message) {
      modelValueValidate.value = {
        error: true,
        message,
      }
      return
    }
  }
  if (props.required && !computedModelValue.value) {
    modelValueValidate.value = {
      error: true,
      message: '必填',
    }
    return
  }
  if (props.pattern && !props.pattern.exp.test(computedModelValue.value)) {
    modelValueValidate.value = {
      error: true,
      message: props.pattern.message,
    }
    return
  }
  modelValueValidate.value = {
    error: false,
    message: '',
  }
})

function focus() {
  inputRef.value?.focus()
}

defineExpose({
  focus,
})
</script>

<template>
  <Input v-bind="$attrs" ref="inputRef" v-model="computedModelValue" :error="modelValueValidate.error">
    <template v-if="suffixVisible" #suffix>
      <Tooltip v-if="modelValueValidate.error" :content="modelValueValidate.message">
        <IconCloseCircle class="params-editor_table-item-icon validate-error" />
      </Tooltip>
      <IconCheckCircle v-else class="params-editor_table-item-icon validate-success" />
    </template>
  </Input>
</template>
