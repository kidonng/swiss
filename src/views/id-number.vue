<template>
  <v-col cols="10" lg="4">
    <v-row class="text-h4 mb-4" justify="center">
      ID Number
    </v-row>
    <v-row>
      <v-text-field
        label="身份证号前 17 位"
        v-model="id"
        :append-icon="icon"
        maxlength="17"
      />
    </v-row>
    <v-row v-if="info.address">
      <span class="font-weight-bold">地址码：</span>
      <code>{{ info.address }}</code>
    </v-row>
    <v-row v-if="info.dob">
      <span class="font-weight-bold">出生日期：</span>
      <code>
        {{ info.dob }}
      </code>
    </v-row>
    <v-row v-if="info.order">
      <span class="font-weight-bold">顺序码：</span>
      <code>{{ info.order }}</code>
      <v-icon class="ml-1"> mdi-gender-{{ info.gender }} </v-icon>
    </v-row>
  </v-col>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from '@vue/composition-api'

function IDVerification(id: string): string | null
function IDVerification(id: string, verification: string): boolean | null
function IDVerification(id: string, verification?: string) {
  if (id.length !== 17) return null

  // https://zh.wikipedia.org/wiki/%E4%B8%AD%E5%8D%8E%E4%BA%BA%E6%B0%91%E5%85%B1%E5%92%8C%E5%9B%BD%E5%85%AC%E6%B0%91%E8%BA%AB%E4%BB%BD%E5%8F%B7%E7%A0%81
  const sum = [...id].reduce(
    (sum, digit, index) => (sum += 2 ** (17 - index) * Number(digit)),
    0
  )
  const _code = 12 - (sum % 11)
  const code = _code === 10 ? 'x' : String(_code)

  return verification ? verification === code : code
}

const IDInfo = (id: string) => ({
  address: id.length >= 6 ? id.substring(0, 6) : null,
  dob:
    id.length >= 14
      ? `${id.substring(6, 10)}-${id.substring(10, 12)}-${id.substring(12, 14)}`
      : null,
  order: id.length >= 17 ? id.substring(14, 17) : null,
  gender:
    id.length >= 17 ? (Number(id[16]) % 2 === 0 ? 'female' : 'male') : null,
  verification: id.length >= 18 ? id[17] : IDVerification(id),
})

export default defineComponent({
  name: 'id-number',
  setup() {
    const id = ref('34052419800101001')
    const info = computed(() => IDInfo(id.value))
    const icon = computed(() => {
      const { verification } = info.value

      if (verification)
        return verification === 'x'
          ? 'mdi-alpha-x'
          : `mdi-numeric-${verification}`

      return 'mdi-alert-circle'
    })

    return { id, info, icon }
  },
})
</script>
