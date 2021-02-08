<template>
  <v-col cols="10" lg="4">
    <v-row class="text-h4 mb-4" justify="center"> Diagrams </v-row>
    <v-row class="text-h6"> What is this </v-row>
    <v-row>
      <span>
        <a href="https://www.notion.so/">Notion</a> doesn't support embedding
        links containing hash (which will get stripped), this tool convert
        <a href="https://www.diagrams.net/">diagrams.net</a> link into
        embeddable link which Notion supports.
      </span>
    </v-row>
    <v-row>
      <strong>
        ℹ️ This page is deprecated, just choose File > Embed > Notion... on
        diagrams.net.
      </strong>
    </v-row>
    <v-row>
      <v-text-field
        placeholder="https://viewer.diagrams.net/..."
        v-model="url"
      />
    </v-row>
    <v-row v-if="converted">
      <v-text-field label="Converted" :value="converted" readonly>
        <template #append-outer>
          <v-tooltip bottom>
            <template #activator="{ on, attrs }">
              <v-icon @click="copy(converted)" v-bind="attrs" v-on="on">
                mdi-content-copy
              </v-icon>
            </template>
            <span>Copy</span>
          </v-tooltip>
        </template>
      </v-text-field>
    </v-row>
    <v-snackbar v-model="snackbar" timeout="2000">
      <v-icon color="success">mdi-check</v-icon> Copied!
    </v-snackbar>
  </v-col>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from '@vue/composition-api'

export default defineComponent({
  name: 'diagrams',
  setup() {
    const url = ref('')
    const converted = computed(() => {
      if (!url.value.startsWith('https://viewer.diagrams.net/')) return

      try {
        const { search, hash } = new URL(url.value)
        return `${location.origin}/api/diagrams${search}&hash=${hash.slice(1)}`
      } catch {}
    })

    const snackbar = ref(false)

    const copy = async (content: string) => {
      await navigator.clipboard.writeText(content)
      snackbar.value = true
    }

    return { url, converted, copy, snackbar }
  },
})
</script>
