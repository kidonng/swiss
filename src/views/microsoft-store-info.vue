<template>
  <v-col cols="10" lg="8">
    <v-row>
      <v-text-field label="productId" v-model="productId" />
    </v-row>
    <v-row>
      <v-text-field label="market" v-model="market" />
    </v-row>
    <v-row>
      <v-text-field label="locale" v-model="locale" />
    </v-row>
    <v-row class="mb-4" justify="center">
      <v-btn class="primary" @click="get">Get</v-btn>
    </v-row>
    <template v-if="info">
      <v-row>
        <span>
          <strong>
            <a :href="store">{{ info.Title }}</a>
          </strong>
          by {{ info.PublisherName }}
        </span>
      </v-row>
      <v-row>
        <strong>Release date</strong>: {{ format(info.ReleaseDateUtc) }}
      </v-row>
      <v-row>
        <strong>Update date</strong>: {{ format(info.LastUpdateDateUtc) }}
      </v-row>
      <v-row><strong>Description</strong>:</v-row>
      <v-row v-html="info.Description.replace(/(\r\n)/g, '<br>')" />
    </template>
  </v-col>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from '@vue/composition-api'
import ky from 'ky'
import dayjs, { ConfigType } from 'dayjs'
import { last } from 'lodash'

export default defineComponent({
  name: 'microsoft-store-info',
  setup() {
    const productId = ref('9wzdncrdzhs0')
    const market = ref('US')
    const locale = ref('en-US')
    const info = ref()
    const store = computed(
      () =>
        `https://www.microsoft.com/${locale.value}/p/${info.value.Title}/${productId.value}`
    )

    const get = async () => {
      // https://gitlab.com/subversion/wpsnitch
      const res = await ky(
        'https://cors-anywhere.herokuapp.com/https://storeedgefd.dsx.mp.microsoft.com/v8.0/pages/pdp',
        {
          searchParams: {
            productId: productId.value,
            market: market.value,
            locale: locale.value,
            appversion: '11703.1001.45.0',
          },
        }
      ).json<any[]>()

      info.value = last(res).Payload
    }

    const format = (utc: ConfigType) => dayjs(utc).format('YYYY-MM-DD')

    return { productId, market, locale, info, store, format, get }
  },
})
</script>
