<template>
  <v-col cols="10" lg="4">
    <v-row>
      <v-text-field
        label="AV/BV 号"
        v-model="origin"
        :rules="[() => valid || 'AV/BV 号无效']"
      />
    </v-row>
    <v-row v-if="valid">
      <code>{{ converted }}</code>
    </v-row>
  </v-col>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from '@vue/composition-api'
import { reg, AVtoBV, BVtoAV } from './utils'

export default defineComponent({
  name: 'bilibili-av-bv',
  setup() {
    const origin = ref('')
    const valid = computed(() => reg.test(origin.value))
    const converted = computed(() => {
      const { value } = origin

      if (valid.value)
        return value.startsWith('BV') ? BVtoAV(value) : AVtoBV(value)
    })

    return { origin, converted, valid }
  },
})
</script>
