<template>
  <v-col cols="10" lg="6">
    <v-row
      v-for="(value, unit) in { year, month, week, day, hour, minute }"
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
import { defineComponent, ref, computed } from '@vue/composition-api'
import dayjs from 'dayjs'
import isLeapYear from 'dayjs/plugin/isLeapYear'
import isoWeek from 'dayjs/plugin/isoWeek'

dayjs.extend(isLeapYear)
dayjs.extend(isoWeek)

export default defineComponent({
  name: 'progress-alt',
  setup() {
    const time = ref(dayjs())
    const days = [
      31,
      dayjs().isLeapYear() ? 29 : 28,
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

    setInterval(() => (time.value = dayjs()), 1000)

    const minute = computed(() => time.value.second() / 60)
    const hour = computed(() => (time.value.minute() + minute.value) / 60)
    const day = computed(() => (time.value.hour() + hour.value) / 24)
    const week = computed(() => (time.value.isoWeekday() - 1 + day.value) / 7)
    const month = computed(
      () => (time.value.date() + day.value) / days[time.value.month()]
    )
    const year = computed(() => (time.value.month() + month.value) / 12)

    return { year, month, week, day, hour, minute }
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
