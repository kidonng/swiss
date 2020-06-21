<template>
  <v-col cols="10" lg="4">
    <v-row>
      <v-select label="source" v-model="source" :items="items" />
    </v-row>
    <v-row>
      <v-text-field label="queryKey" v-model="queryKey" />
    </v-row>
    <v-row class="mb-4" justify="center">
      <v-btn class="primary" @click="create">Create</v-btn>
    </v-row>
    <template v-if="result">
      <v-row justify="center">
        <a :href="result.link()">
          <v-img :src="result.image" alt="Badge" />
        </a>
      </v-row>
      <v-row>
        <div class="text-caption text--secondary mb-2">Markdown</div>
        <code class="text-break">{{ result.markdown }}</code>
      </v-row>
    </template>
  </v-col>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from '@vue/composition-api'
import { sources, badge, Source } from './utils'

export default defineComponent({
  name: 'substats-badge-maker',
  setup() {
    const items = Object.entries(sources('')).map(([value, { text }]) => ({
      text,
      value,
    }))
    const source = ref<Source>('github')
    const queryKey = ref('spencerwooo')
    const result = ref()

    const create = () =>
      (result.value = badge({ source: source.value, queryKey: queryKey.value }))

    return { items, source, queryKey, result, create }
  },
})
</script>
