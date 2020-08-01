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
import { IDInfo } from './utils'

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
