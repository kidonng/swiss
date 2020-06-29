<template>
  <v-col cols="10" lg="4">
    <v-row justify="center" class="text-h3 mb-4">Home</v-row>
    <v-row class="body-1">
      <span>
        <strong>🔪 Swiss</strong> is a collection of random utilities and demos.
      </span>
    </v-row>
    <v-row class="body-1 mt-4">
      Click the menu icon to browse available items, or click GitHub icon to
      view the source code.
    </v-row>
  </v-col>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'home',
})
</script>
