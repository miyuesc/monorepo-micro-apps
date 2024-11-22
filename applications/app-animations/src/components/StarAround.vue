<script setup lang="ts">
/**
 * @desc StarAround
 * @author MiyueFE <https://github.com/miyuesc>
 * @since 2024/9/4 14:52
 */

import type { PropType } from 'vue'

defineOptions({ name: 'StarAround' })

defineProps({
  star: {
    type: Array as PropType<any[]>,
    default: () => [],
  },
  hoverStop: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
})
</script>

<template>
  <div class="star-around_container">
    <div class="star-around_box">
      <div class="star-around_center" />
      <div class="star-around_orbit" />
      <div v-for="(i, idx) in star" :key="idx" class="star-around_star">
        <div class="star-around_star-content">
          {{ idx }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.star-around_container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  background-color: #000;
}
.star-around_box {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: rotate(10deg);
  transform-style: preserve-3d;
}
.star-around_center {
  position: absolute;
  left: -100px;
  top: -100px;
  width: 200px;
  height: 200px;
  border-radius: 1000px;
  border: 5px solid black;
  box-sizing: border-box;
  background-color: white;
}
.star-around_star {
  position: absolute;
  margin-left: -25px;
  margin-top: -25px;
  width: 40px;
  height: 40px;
  background-color: black;
  border: 5px solid black;
  box-sizing: border-box;
  border-radius: 50%;
  overflow: hidden;
}
</style>
