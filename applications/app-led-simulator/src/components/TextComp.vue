<script setup lang="ts">
/**
 * @desc TextComp
 * @author DragonTeam <https://www.bpmport.com>
 * @since 2024/11/22 16:04
 */

import { ref } from 'vue'

defineOptions({ name: 'TextComp' })

const slotArray = ref(['name', 'sex'])
</script>

<template>
  <div>
    <p v-for="i in slotArray" :key="i">
      <slot :name="i" />
    </p>
  </div>
</template>

<style scoped></style>
