<template>
  <v-col cols="10" lg="6">
    <v-row class="text-h4 mb-4" justify="center">
      Bilibili AV/BV ID Converter
    </v-row>
    <v-row>
      <v-text-field
        label="AV/BV ID"
        v-model="origin"
        :rules="[() => valid || 'Invalid AV/BV ID']"
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
  name: 'av-bv-converter',
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
