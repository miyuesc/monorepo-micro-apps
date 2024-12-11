<script setup lang="ts">
import { Button } from '@arco-design/web-vue'
import { IconCheck, IconClose } from '@arco-design/web-vue/es/icon'
import type { PropType } from 'vue'
import { computed } from 'vue'

defineOptions({ name: 'CheckButton' })

const props = defineProps({
  value: {
    type: [String, Number, Boolean] as PropType<string | number | boolean>,
  },
  checkedValue: {
    type: [String, Number, Boolean] as PropType<string | number | boolean>,
    default: true,
  },
  unCheckedValue: {
    type: [String, Number, Boolean] as PropType<string | number | boolean>,
    default: false,
  },
  disabled: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
})
const emits = defineEmits(['change', 'update:value'])
const slots = defineSlots<{
  icon: () => any
  default: () => any
}>()

const checked = computed(() => props.value === props.checkedValue)

function handleClick() {
  if (props.disabled)
    return
  const newValue = checked.value ? props.unCheckedValue : props.checkedValue
  emits('change', newValue)
  emits('update:value', newValue)
}
</script>

<template>
  <Button v-bind="$attrs" :type="checked ? 'primary' : undefined" :disabled="disabled" @click="handleClick">
    <template #icon>
      <slot name="icon" />
      <template v-if="!slots.icon">
        <IconCheck v-if="checked" />
        <IconClose v-else />
      </template>
    </template>
    <slot />
  </Button>
</template>
