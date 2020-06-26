<template>
  <v-col cols="10">
    <v-row justify="center" class="text-h3">{{ _question }}</v-row>
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

    const getQuestion = async (_number?: string) => {
      _question.value = 'why...'

      const { number, question } = await ky(
        '/api/xkcd-why',
        _number ? { searchParams: { number: _number } } : {}
      ).json()

      _question.value = question
      location.hash = number
    }

    onMounted(() => getQuestion(location.hash.slice(1)))

    return { _question, getQuestion }
  },
})
</script>
