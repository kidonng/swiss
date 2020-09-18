<template>
  <v-col cols="10" lg="6">
    <v-row class="text-h4 mb-4" justify="center">
      Progress
    </v-row>
    <v-row
      v-for="(value, unit) in _moments"
      :class="['unit', unit !== 'hour' && 'white--text', unit]"
      justify="center"
      align="center"
      :style="{ width: `${value * 100}%` }"
      :key="unit"
    >
      {{ Math.round(value * 100) }}%
    </v-row>
  </v-col>
</template>

<script lang="ts">
import { defineComponent, ref, onUnmounted } from '@vue/composition-api'
import dayjs from 'dayjs'
import isLeapYear from 'dayjs/plugin/isLeapYear'
import isoWeek from 'dayjs/plugin/isoWeek'

dayjs.extend(isLeapYear)
dayjs.extend(isoWeek)

const moments = () => {
  const now = dayjs()
  const days = [
    31,
    now.isLeapYear() ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ]
  const minute = now.second() / 60
  const hour = (now.minute() + minute) / 60
  const day = (now.hour() + hour) / 24
  const week = (now.isoWeekday() - 1 + day) / 7
  const month = (now.date() - 1 + day) / days[now.month()]
  const year = (now.month() + month) / 12

  return { now, days, minute, hour, day, week, month, year }
}

export default defineComponent({
  name: 'progress-alt',
  setup() {
    const getMoments = () => {
      const { now, days, ..._moments } = moments()
      return _moments
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
