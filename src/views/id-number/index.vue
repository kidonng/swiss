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
import { IDVerification } from './utils'

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

    const icon = computed(() => {
      const verification = IDVerification(id.value)

      if (verification)
        return verification === 'x'
          ? 'mdi-alpha-x'
          : `mdi-numeric-${verification}`

      return 'mdi-alert-circle'
    })

    return { id, address, dob, order, gender, icon }
  },
})
</script>
