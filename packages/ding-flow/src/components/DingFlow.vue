<script setup lang="ts">
/**
 * @desc DingFlow
 * @author MiyueFE <https://github.com/miyuesc>
 * @since 2024/7/17 下午5:21
 */

defineOptions({ name: 'DingFlow' })
</script>

<template>
  <FlowCanvas>
    <DingFlowList v-bind="{ ...$attrs }" />
  </FlowCanvas>
</template>
