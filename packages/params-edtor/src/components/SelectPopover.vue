<script setup lang="ts">
import type { PropType } from 'vue'
import { computed, onMounted, ref } from 'vue'
import { Popover } from '@arco-design/web-vue'

defineOptions({ name: 'SelectPopover' })

const props = defineProps({
  modelValue: {
    type: [String, Number, Boolean] as PropType<string | number | boolean>,
  },
  options: {
    type: Array as PropType<Array<string | number | SelectOptions>>,
    default: () => [],
  },
  block: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  disabled: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  title: {
    type: String as PropType<string>,
    default: '请选择',
  },
  placement: {
    type: String as PropType<string>,
    default: 'right',
  },
  defaultValue: {
    type: [String, Number, Boolean, Object] as PropType<any>,
  },
})

const emits = defineEmits(['change', 'update:modelValue', 'update:popover-visible'])

const slots = defineSlots<{
  icon: () => any
  default: () => any
}>()

const computedOptions = computed<SelectOptions[]>(() => {
  const options: SelectOptions[] = []
  for (const op of props.options) {
    if (typeof op === 'string') {
      options.push({ label: op, value: op })
      continue
    }
    if (typeof op === 'number') {
      options.push({ label: op.toString(), value: op })
      continue
    }
    options.push(op)
  }
  return options
})
const computedLabel = computed(() => {
  console.log(props.modelValue, computedOptions.value, computedOptions.value.find(item => item.value === props.modelValue))
  return computedOptions.value.find(item => item.value === props.modelValue)?.label
})

const computedClasses = computed(() => {
  const classes: string[] = ['select-popover_wrap']
  if (props.block) {
    classes.push('select-popover_wrap-block')
  }
  if (props.disabled) {
    classes.push('select-popover_wrap-disabled')
  }
  return classes.join(' ')
})

const popVisible = ref(false)

function togglePopover() {
  if (props.disabled)
    return
  popVisible.value = !popVisible.value
}

function showPopover() {
  if (props.disabled)
    return
  popVisible.value = true
}

function hidePopover() {
  if (props.disabled)
    return
  popVisible.value = false
}

function updateModelValue(item: SelectOptions) {
  if (item.value === props.modelValue) {
    hidePopover()
    return
  }
  emits('change', item.value, item)
  emits('update:modelValue', item.value)
  hidePopover()
}

interface SelectOptions {
  label: string
  value: any
  disabled?: boolean
}

onMounted(() => {
  if (props.defaultValue !== undefined) {
    emits('change', props.defaultValue)
    emits('update:modelValue', props.defaultValue)
  }
})

defineExpose({ togglePopover, showPopover, hidePopover })
</script>

<template>
  <span :class="computedClasses">
    <Popover v-model:popup-visible="popVisible" trigger="click" :title="title" :position="placement">
      <template #content>
        <div class="select-popover_list">
          <div
            v-for="i in computedOptions"
            :key="i.value" class="select-popover_item"
            :class="modelValue === i.value ? 'select-popover_item-selected' : ''"
            @click="updateModelValue(i)"
          >{{ i.label }}</div>
        </div>
      </template>
      <span class="select-popover_label" @click="togglePopover">
        <span v-if="!slots.default">{{ computedLabel }}</span>
      </span>
    </Popover>
    <slot name="append" />
  </span>
</template>

<style lang="scss">
.select-popover_wrap {
  display: inline-block;
  padding: 0 6px;
  transition: all ease 0.2s;
  &.select-popover_wrap-block {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    border: 1px solid #d9d9d9;
    line-height: 22px;
    height: 22px;
    border-radius: 2px;
    &:hover {
      border-color: #0958d9;
    }
  }
  &.select-popover_wrap-disabled {
    cursor: not-allowed;
    .select-popover_label {
      color: rgba(0, 0, 0, 0.45);
    }
  }

  .select-popover_label {
    cursor: pointer;
    font-size: 12px;
    &:hover {
      text-decoration: underline;
    }
  }
}
.select-popover_item {
  min-width: 80px;
  cursor: pointer;
  padding: 4px 10px;
  border-radius: 4px;
  transition: all ease 0.2s;
  &:hover {
    background-color: rgba(0, 0, 0, 0.06);
  }
  &.select-popover_item-selected {
    background-color: #e6f4ff;
    &:hover {
      background-color: #e6f4ff;
    }
  }
}
</style>
