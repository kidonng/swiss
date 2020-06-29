<template>
  <v-col cols="10" lg="4">
    <v-row class="text-h4 mb-4" justify="center">
      <span>
        <a href="https://github.com/spencerwooo/Substats">Substats</a> Badge
        Creator
      </span>
    </v-row>
    <v-row>
      <v-select label="Source" v-model="source" :items="items" />
    </v-row>
    <v-row>
      <v-text-field label="Query Key" v-model="queryKey" />
    </v-row>
    <v-row class="mb-4" justify="center">
      <v-btn class="primary" @click="create">Create</v-btn>
    </v-row>
    <template v-if="result">
      <v-row class="flex-column">
        <div class="text-caption text--secondary mb-2">Badge</div>
        <a class="mx-auto" :href="result.link()">
          <v-img :src="result.image" alt="Badge" />
        </a>
      </v-row>
      <v-row>
        <v-text-field label="Image" v-model="result.image" readonly>
          <template #append-outer>
            <v-tooltip bottom>
              <template #activator="{ on, attrs }">
                <v-icon @click="copy(result.image)" v-bind="attrs" v-on="on">
                  mdi-content-copy
                </v-icon>
              </template>
              <span>Copy</span>
            </v-tooltip>
          </template>
        </v-text-field>
      </v-row>
      <v-row>
        <v-text-field label="Markdown" v-model="result.markdown" readonly>
          <template #append-outer>
            <v-tooltip bottom>
              <template #activator="{ on, attrs }">
                <v-icon @click="copy(result.markdown)" v-bind="attrs" v-on="on">
                  mdi-content-copy
                </v-icon>
              </template>
              <span>Copy</span>
            </v-tooltip>
          </template>
        </v-text-field>
      </v-row>
    </template>
  </v-col>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import copy from 'copy-text-to-clipboard'
import { sources, badge, Source } from './utils'

export default defineComponent({
  name: 'substats-badge-creator',
  setup() {
    const items = Object.entries(
      sources('')
    ).map(([value, { title: text }]) => ({ text, value }))
    const source = ref<Source>('github')
    const queryKey = ref('spencerwooo')
    const result = ref()

    const create = () =>
      (result.value = badge({ source: source.value, queryKey: queryKey.value }))

    return { items, source, queryKey, result, create, copy }
  },
})
</script>
