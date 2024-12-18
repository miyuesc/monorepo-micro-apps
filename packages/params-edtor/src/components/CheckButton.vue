<script setup lang="ts">
import { Button } from '@arco-design/web-vue'
import type { PropType } from 'vue'
import { Icon } from '@iconify/vue'
import { computed, shallowRef } from 'vue'

defineOptions({ name: 'CheckButton' })

const props = defineProps({
  modelValue: {
    type: [String, Number, Boolean] as PropType<string | number | boolean>,
  },
  checkedValue: {
    type: [String, Number, Boolean] as PropType<string | number | boolean>,
    default: true,
  },
  checkedIcon: {
    type: String as PropType<string>,
    default: 'ant-design:check-circle-outlined',
  },
  unCheckedValue: {
    type: [String, Number, Boolean] as PropType<string | number | boolean>,
    default: false,
  },
  unCheckedIcon: {
    type: String as PropType<string>,
    default: 'ant-design:close-circle-outlined',
  },
  disabled: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
})
const emits = defineEmits(['change', 'update:modelValue'])
const slots = defineSlots<{
  icon: () => any
  default: () => any
}>()

const buttonRef = shallowRef<any>()
const checked = computed(() => props.modelValue === props.checkedValue)

function handleClick() {
  if (props.disabled)
    return
  const newValue = checked.value ? props.unCheckedValue : props.checkedValue
  emits('change', newValue)
  emits('update:modelValue', newValue)
}
</script>

<template>
  <Button
    ref="buttonRef"
    v-bind="$attrs"
    :type="checked ? 'primary' : undefined"
    :disabled="disabled"
    @click="handleClick"
  >
    <template #icon>
      <slot name="icon" />
      <template v-if="!slots.icon">
        <Icon v-if="checked" :icon="checkedIcon" />
        <Icon v-else :icon="unCheckedIcon" />
      </template>
    </template>
  </Button>
</template>
