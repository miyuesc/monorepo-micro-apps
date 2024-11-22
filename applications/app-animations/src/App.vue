<script setup lang="ts">
import { create } from '@miyue-mma/shared'
import StarAround from './components/StarAround.vue'

const star = create(10)
</script>

<template>
  <StarAround :star="star" />
</template>
