<template>
  <v-col cols="10" lg="4">
    <v-row>
      <v-text-field
        label="身份证号前 17 位"
        v-model="id"
        :append-icon="icon"
        maxlength="17"
      />
    </v-row>
    <v-row v-if="id.length >= 6">
      <span class="font-weight-bold">地址码：</span>
      <code>{{ address }}</code>
    </v-row>
    <v-row v-if="id.length >= 14">
      <span class="font-weight-bold">出生日期：</span>
      <code>
        {{ dob }}
      </code>
    </v-row>
    <v-row v-if="id.length === 17">
      <span class="font-weight-bold">顺序码：</span>
      <code>{{ order }}</code>
      <v-icon class="ml-1"> mdi-gender-{{ gender }} </v-icon>
    </v-row>
  </v-col>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from '@vue/composition-api'

export default defineComponent({
  name: 'id-number',
  setup() {
    const id = ref('34052419800101001')
    const address = computed(() => id.value.substring(0, 6))
    const dob = computed(
      () =>
        `${id.value.substring(6, 10)}-${id.value.substring(
          10,
          12
        )}-${id.value.substring(12, 14)}`
    )
    const order = computed(() => id.value.substring(14, 17))
    const gender = computed(() =>
      Number(id.value[16]) === 1 ? 'male' : 'female'
    )

    // https://zh.wikipedia.org/wiki/%E4%B8%AD%E5%8D%8E%E4%BA%BA%E6%B0%91%E5%85%B1%E5%92%8C%E5%9B%BD%E5%85%AC%E6%B0%91%E8%BA%AB%E4%BB%BD%E5%8F%B7%E7%A0%81
    const icon = computed(() => {
      if (id.value.length === 17) {
        const sum = [...id.value].reduce(
          (sum, digit, index) => (sum += 2 ** (17 - index) * Number(digit)),
          0
        )
        const code = 12 - (sum % 11)

        return code === 10 ? 'mdi-alpha-x' : `mdi-numeric-${code}`
      }

      return 'mdi-alert-circle'
    })

    return { id, address, dob, order, gender, icon }
  },
})
</script>
