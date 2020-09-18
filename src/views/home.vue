<template>
  <v-col cols="10" lg="4">
    <v-row justify="center" class="text-h3 mb-4">Home</v-row>
    <v-row class="body-1">
      <span>
        <strong>Swiss</strong> is a collection of random utilities, mostly for
        <a href="https://github.com/kidonng">@kidonng</a>'s personal use.
      </span>
    </v-row>
    <v-row class="body-1 mt-4">
      <a @click="drawer = true">Browse all utilities</a>, or
      <a href="https://github.com/kidonng/swiss">checkout the source code</a>.
    </v-row>
  </v-col>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import { drawer } from '../App.vue'

export default defineComponent({
  name: 'home',
  setup: () => ({ drawer }),
})
</script>
