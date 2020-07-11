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
    <template v-if="result">
      <v-row class="flex-column">
        <div class="text-caption text--secondary mb-2">Badge</div>
        <a class="mx-auto mb-2" :href="result.link">
          <v-img :src="result.image" alt="Badge" />
        </a>
      </v-row>
      <v-row v-for="(value, label) in result.items" :key="label">
        <v-text-field :label="label" :value="value" readonly>
          <template #append-outer>
            <v-tooltip bottom>
              <template #activator="{ on, attrs }">
                <v-icon @click="copy(value)" v-bind="attrs" v-on="on">
                  mdi-content-copy
                </v-icon>
              </template>
              <span>Copy</span>
            </v-tooltip>
          </template>
        </v-text-field>
      </v-row>
    </template>
    <v-snackbar v-model="snackbar" timeout="2000">
      <v-icon color="success">mdi-check</v-icon> Copied!
    </v-snackbar>
  </v-col>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from '@vue/composition-api'
import _copy from 'copy-text-to-clipboard'
import { sources, badge, Source } from './utils'

export default defineComponent({
  name: 'substats-badge-creator',
  setup() {
    const items = Object.entries(sources).map(
      ([value, { category, title }]) => ({
        text: `${category} - ${title}`,
        value,
      })
    )
    const source = ref<Source>('github')
    const queryKey = ref('spencerwooo')
    const result = computed(() => {
      const _badge = badge(source.value, queryKey.value)

      return {
        ..._badge,
        items: {
          Image: _badge.image,
          Markdown: _badge.markdown,
          API: _badge.api,
        },
      }
    })
    const snackbar = ref(false)

    const copy = (content: string) => {
      _copy(content)
      snackbar.value = true
    }

    return { items, source, queryKey, result, copy, snackbar }
  },
})
</script>
