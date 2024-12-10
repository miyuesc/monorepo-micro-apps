<script setup lang="ts">
import LedSimulator from './components/LedSimulator.vue'
import TextComp from './components/TextComp.vue'
</script>

<template>
  <LedSimulator />

  <TextComp style="margin-top: 100px">
    <template #name>
      <span>name111111</span>
    </template>
    <template #sex>
      <span>sex2222</span>
    </template>
  </TextComp>
</template>
