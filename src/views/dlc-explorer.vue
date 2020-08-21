<template>
  <v-col cols="10">
    <v-row class="text-h4 mb-4" justify="center">
      <span>
        <a href="https://github.com/v2fly/domain-list-community">DLC</a>
        Explorer
      </span>
    </v-row>
    <v-row align="center">
      <v-file-input label="Select DLC dat file" v-model="file" />
      <v-btn
        class="ml-4"
        @click="latest"
        :disabled="Boolean(file)"
        :loading="downloading"
      >
        <v-icon left>mdi-download</v-icon> Use Latest
      </v-btn>
    </v-row>
    <v-row justify="center">
      <v-btn
        color="primary"
        @click="decode"
        :disabled="!file"
        :loading="decodeStatus === 'decoding'"
      >
        🚀 Decode
      </v-btn>
    </v-row>
    <template v-if="decodeStatus === 'completed'">
      <v-tabs v-model="tab" class="my-2">
        <v-tab>Browse</v-tab>
        <v-tab>Test</v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-text-field
            label="Search"
            @input="onSearchInput"
            prepend-icon="mdi-magnify"
            clearable
          />
          <v-data-table
            :headers="headers"
            :items="items"
            :search="search"
            item-key="key"
            group-by="Category"
            show-group-by
          />
        </v-tab-item>
        <v-tab-item>
          <v-text-field
            label="Domain"
            @input="onDomainInput"
            prepend-icon="mdi-web"
            clearable
          />
          <v-data-table
            :headers="headers"
            :items="matches"
            item-key="key"
            show-group-by
          />
        </v-tab-item>
      </v-tabs-items>
    </template>
  </v-col>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from '@vue/composition-api'
import ky from 'ky'
import protobuf from 'protobufjs'
import { debounce } from 'lodash'

export default defineComponent({
  name: 'dlc-explorer',
  setup() {
    const tab = ref()
    const headers = [
      { text: 'Domain', value: 'value', groupable: false },
      { text: 'Type', value: 'Type' },
      { text: 'Category', value: 'Category' },
      { text: 'Attributes', value: 'Attributes' },
    ]

    const file = ref<File>()
    // Ref is not used due to perf issue
    const items: {
      value: string
      Type: string
      Category: string
      Attributes: string
      key: number
    }[] = []

    const downloading = ref(false)
    const latest = async () => {
      downloading.value = true

      const blob = await ky(
        'https://cors-anywhere.herokuapp.com/https://github.com/v2fly/domain-list-community/releases/latest/download/dlc.dat'
      ).blob()
      file.value = new File([blob], 'latest.dat')

      downloading.value = false
    }

    const decodeStatus = ref('')
    const decode = async () => {
      decodeStatus.value = 'decoding'

      const {
        GeoSiteList,
        DomainObject: { Type },
      } = (await protobuf.load('/v2ray_geosite.proto')) as any
      const buffer = await file.value!.arrayBuffer()
      const { entry } = GeoSiteList.decode(new Uint8Array(buffer))
      const types = Object.fromEntries(
        Object.entries(Type).map(([key, value]) => [value, key])
      )

      items.length = 0
      let key = 0
      for (const { countryCode, domain } of entry) {
        for (const { value, type, attribute } of domain) {
          items.push({
            value,
            Type: types[type],
            Category: countryCode,
            Attributes: attribute[0]?.key,
            key: key++,
          })
        }
      }

      decodeStatus.value = 'completed'
      file.value = undefined
    }

    const search = ref()
    const onSearchInput = debounce((value) => (search.value = value), 750)

    const domain = ref('')
    const matches = computed(() =>
      items.filter(({ Type, value }) => {
        if (Type === 'Domain')
          return domain.value === value || domain.value.endsWith(`.${value}`)
        else if (Type === 'Full') return domain.value === value
        else if (Type === 'Regex') return RegExp(value).test(domain.value)
      })
    )
    const onDomainInput = debounce((value) => (domain.value = value), 750)

    return {
      file,
      latest,
      decode,
      decodeStatus,
      items,
      search,
      onSearchInput,
      tab,
      downloading,
      matches,
      onDomainInput,
      headers,
    }
  },
})
</script>
