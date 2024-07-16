<script setup lang="ts">
/**
 * @desc TippyPopover
 * @author MiyueFE <https://github.com/miyuesc>
 * @since 2024/7/12 上午10:06
 */

import type { PropType } from 'vue'
import { nextTick, onMounted, onUnmounted, shallowRef, watch } from 'vue'
import type {
  Placement,
  Instance as TInstance,
  Props as TProps,
} from 'tippy.js'

import tippy, {
  followCursor as TFollowCursor,
} from 'tippy.js'

defineOptions({ name: 'TippyPopover' })

const $props = defineProps({
  target: {
    type: [String, Object] as PropType<string | HTMLElement>,
    default: '',
  },
  appendToBody: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
  arrow: {
    type: [Boolean, String] as PropType<boolean | string>,
    default: true,
  },
  delay: {
    type: [Number, Array] as PropType<number | [number, number]>,
    default: 0,
  },
  duration: {
    type: [Number, Array] as PropType<number | [number, number]>,
    default: () => [300, 250],
  },
  followCursor: {
    type: [String, Boolean] as PropType<boolean | 'horizontal' | 'vertical' | 'initial'>,
    default: false,
  },
  hideOnClick: {
    type: [String, Boolean] as PropType<boolean | 'toggle'>,
    default: true,
  },
  inertia: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  interactive: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
  interactiveBorder: {
    type: Number as PropType<number>,
    default: 2,
  },
  interactiveDebounce: {
    type: Number as PropType<number>,
    default: 0,
  },
  maxWidth: {
    type: [Number, Boolean] as PropType<number | 'none'>,
    default: 350,
  },
  offset: {
    type: Array as PropType<number[]>,
    default: () => [0, 10],
  },
  zIndex: {
    type: Number as PropType<number>,
    default: 2000,
  },
  placement: {
    type: String as PropType<Placement>,
    default: 'top',
  },
  animation: {
    type: [String, Boolean] as PropType<string | boolean>,
    default: 'scale',
  },
  trigger: {
    type: String as PropType<string>,
    default: 'click click',
  },
  triggerTarget: {
    type: [Object, Array] as PropType<Element | [Element, Element] | null>,
    default: null,
  },
})
const $slots = defineSlots<
  { default: () => null, trigger: () => null }
>()

const triggerRef = shallowRef<HTMLDivElement>()
const tippyWrapper = shallowRef<HTMLDivElement>()
const tippyInstance = shallowRef<TInstance | TInstance[]>()

function normalizeProps() {
  const normProps: Partial<TProps> = {
    ignoreAttributes: true,
    allowHTML: false,
    showOnCreate: false,
    // sticky: false
  }

  normProps.appendTo = $props.appendToBody ? () => document.body : 'parent'
  normProps.arrow = $props.arrow
  normProps.delay = $props.delay
  normProps.duration = $props.duration
  normProps.hideOnClick = $props.hideOnClick
  normProps.followCursor = $props.followCursor
  normProps.inertia = $props.inertia
  normProps.interactive = $props.interactive
  normProps.interactiveBorder = $props.interactiveBorder
  normProps.interactiveDebounce = $props.interactiveDebounce
  normProps.maxWidth = $props.maxWidth
  normProps.zIndex = $props.zIndex
  normProps.offset = $props.offset as [number, number]
  normProps.placement = $props.placement
  normProps.animation = $props.animation
  normProps.trigger = $props.trigger
  normProps.triggerTarget = $props.triggerTarget

  return normProps
}

async function initTippy() {
  await nextTick()

  destroyTippy()

  const target = $props.target
    ? typeof $props.target === 'string' ? document.querySelector($props.target) : $props.target
    : triggerRef.value

  if (!target)
    return console.warn('Tippy\'s target element can not be null')

  const tippyProps = normalizeProps()

  tippyInstance.value = tippy(target, {
    ...tippyProps,
    content: tippyWrapper.value!,
    plugins: [TFollowCursor],
  })
}

function destroyTippy() {
  if (tippyInstance.value) {
    if (Array.isArray(tippyInstance.value)) {
      tippyInstance.value.forEach((ins) => {
        ins.unmount()
        ins.destroy()
      })
    }
    else {
      tippyInstance.value.unmount()
      tippyInstance.value.destroy()
    }
  }
}

function hidden() {
  if (tippyInstance.value) {
    if (Array.isArray(tippyInstance.value)) {
      tippyInstance.value.forEach((ins) => {
        ins.hide()
      })
    }
    else {
      tippyInstance.value.hide()
    }
  }
}

onMounted(() => initTippy())

onUnmounted(() => destroyTippy())

watch(() => $props.target, initTippy)

defineExpose({ hidden })
</script>

<template>
  <div ref="tippyWrapper" class="tippy-pop_wrapper">
    <div class="tippy-content">
      <slot />
    </div>
  </div>
  <div v-if="!!$slots.trigger" ref="triggerRef" class="tippy-pop_trigger">
    <slot name="trigger" />
  </div>
</template>

<style lang="scss">
  @import 'tippy.js/dist/tippy.css';
  @import 'tippy.js/animations/scale.css';
  @import 'tippy.js/animations/scale-extreme.css';
  @import 'tippy.js/animations/scale-subtle.css';
  @import 'tippy.js/animations/shift-away.css';
  @import 'tippy.js/animations/shift-away-extreme.css';
  @import 'tippy.js/animations/shift-away-subtle.css';
  @import 'tippy.js/animations/shift-toward.css';
  @import 'tippy.js/animations/shift-toward-extreme.css';
  @import 'tippy.js/animations/shift-toward-subtle.css';
  @import 'tippy.js/animations/perspective.css';
  @import 'tippy.js/animations/perspective-extreme.css';
  @import 'tippy.js/animations/perspective-subtle.css';
  .tippy-box {
    background-color: var(--color-bg-4);
    box-shadow: 0 2px 8px #00000026;
  }
  .tippy-arrow {
    color: var(--color-bg-4);
  }
</style>
