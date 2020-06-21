<template>
  <v-col cols="10" lg="4">
    <v-row>
      <v-text-field label="Hash" v-model="hash" />
    </v-row>
    <v-row>
      <v-text-field label="设备" v-model="device" />
    </v-row>
    <v-row>
      <v-text-field label="Android 版本" v-model="android" />
    </v-row>
    <v-row>
      <v-text-field label="版本" v-model="version" />
    </v-row>
    <v-row v-if="hash && device && android && version">
      <a class="text-break" :href="url">{{ url }}</a>
    </v-row>
  </v-col>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from '@vue/composition-api'
import dayjs from 'dayjs'
import isoWeek from 'dayjs/plugin/isoWeek'

dayjs.extend(isoWeek)

export default defineComponent({
  name: 'miui-dev-link',
  setup() {
    // Android version for each device
    const devices = {
      wayne: '9.0',
      begonia: '10.0',
    }
    const server = 'https://hugeota.d.miui.com'

    let now = dayjs()
    // New version is released after 16 o'clock on Mon. - Thu.
    if (now.isoWeekday() > 4) now = now.isoWeekday(4)
    else if (now.hour() < 16) now = now.isoWeekday(now.isoWeekday() - 1)
    // Versions released before 2020 use the last digit of the year
    // Versions released after 2020 use the last two digits of the year
    const year = now.year() - (now.year() >= 2020 ? 2000 : 2010)

    const hash = ref('')
    const device = ref('begonia')
    const android = ref('')
    const version = ref(now.format(`${year}.M.D`))

    watch(
      device,
      () => {
        if (device.value in devices)
          android.value = devices[device.value as keyof typeof devices]
      },
      { immediate: true }
    )

    const filename = computed(
      () =>
        `${[
          'miui',
          device.value.toUpperCase(),
          version.value,
          hash.value,
          android.value,
        ].join('_')}.zip`
    )
    const url = computed(() =>
      [server, version.value, filename.value].join('/')
    )

    return { hash, device, android, version, url }
  },
})
</script>
