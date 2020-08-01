<template>
  <v-col cols="10" lg="4">
    <v-row>
      <v-text-field label="diagrams.net link" v-model="url" />
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
import _copy from 'copy-text-to-clipboard'

export default defineComponent({
  name: 'diagrams',
  setup() {
    const url = ref('')
    const converted = computed(() => {
      try {
        const { search, hash } = new URL(url.value)
        return `https://swiss.vercel.app/api/diagrams${search}&hash=${hash.slice(
          1
        )}`
      } catch {}
    })

    const snackbar = ref(false)

    const copy = (content: string) => {
      _copy(content)
      snackbar.value = true
    }

    return { url, converted, copy, snackbar }
  },
})
</script>
