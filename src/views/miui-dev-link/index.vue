<template>
  <v-col cols="10" lg="4">
    <v-row class="text-h4 mb-4" justify="center">
      MIUI Dev Link
    </v-row>
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
      <v-text-field label="版本" v-model="_version" />
    </v-row>
    <v-row v-if="hash && device && android && _version">
      <a class="text-break" :href="url">{{ url }}</a>
    </v-row>
  </v-col>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from '@vue/composition-api'
import { devices, server, version } from './utils'

export default defineComponent({
  name: 'miui-dev-link',
  setup() {
    const hash = ref('')
    const device = ref('begonia')
    const android = ref('')
    const _version = ref(version())

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
          _version.value,
          hash.value,
          android.value,
        ].join('_')}.zip`
    )
    const url = computed(() =>
      [server, _version.value, filename.value].join('/')
    )

    return { hash, device, android, _version, url }
  },
})
</script>
