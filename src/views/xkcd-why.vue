<template>
  <v-col cols="10">
    <v-row justify="center" class="text-h3">
      <template v-if="loading">
        why<span class="loading overflow-hidden">...</span>
      </template>
      <template v-else>
        <a :href="`https://www.google.com/search?q=${_question}`">
          {{ _question }}
        </a>
      </template>
    </v-row>
    <v-row justify="center" class="mt-4">
      <v-btn class="primary" @click="() => getQuestion()">why</v-btn>
    </v-row>
  </v-col>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from '@vue/composition-api'
import ky from 'ky'

export default defineComponent({
  name: 'xkcd-why',
  setup() {
    const _question = ref('')
    const loading = ref(true)

    const getQuestion = async (_number?: string) => {
      loading.value = true

      try {
        const { number, question } = await ky(
          '/api/xkcd-why',
          _number ? { searchParams: { number: _number } } : {}
        ).json()

        _question.value = question
        location.hash = number
      } catch {
        _question.value = 'why is there a request error'
      }

      loading.value = false
    }

    onMounted(() => getQuestion(location.hash.slice(1)))

    return { _question, getQuestion, loading }
  },
})
</script>

<style lang="sass" scoped>
@keyframes loading
  25%
    width: 0

  50%
    width: .25em

  75%
    width: .5em

  100%
    width: .75em

.loading
  animation: loading 1s steps(1, start) infinite
</style>
