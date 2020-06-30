<template>
  <v-col cols="10" lg="6">
    <v-row
      v-for="(value, unit) in _moments"
      :class="['unit', unit !== 'hour' && 'white--text', unit]"
      justify="center"
      align="center"
      :style="{ width: `${value * 100}%` }"
    >
      {{ Math.round(value * 100) }}%
    </v-row>
  </v-col>
</template>

<script lang="ts">
import { defineComponent, ref, onUnmounted } from '@vue/composition-api'
import { moments } from './utils'

export default defineComponent({
  name: 'progress-alt',
  setup() {
    const getMoments = () => {
      const { year, month, week, day, hour, minute } = moments()
      return { year, month, week, day, hour, minute }
    }
    const _moments = ref(getMoments())

    const interval = setInterval(() => (_moments.value = getMoments()), 1000)

    onUnmounted(() => clearInterval(interval))

    return { _moments }
  },
})
</script>

<style lang="sass" scoped>
.unit
  height: 10vh
  transition: width 1s linear
  user-select: none

.year
  background-color: #f44336 /* red */

.month
  background-color: #9c27b0 /* purple */

.week
  background-color: #3f51b5 /* indigo */

.day
  background-color: #009688 /* teal */

.hour
  background-color: #cddc39 /* lime */

.minute
  background-color: #607d8b /* blue-grey */
</style>
