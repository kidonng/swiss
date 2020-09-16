<template>
  <v-col cols="10" lg="8">
    <v-row class="text-h4 mb-4" justify="center">
      Telegram Webhook Helper
    </v-row>
    <v-row>
      <v-text-field label="Bot Token" v-model="token" clearable />
    </v-row>
    <v-row class="mb-4" justify="space-around">
      <v-btn @click="getWebhookInfo" :disabled="!token" :loading="loading"
        >ℹ️ Info</v-btn
      >
      <v-btn
        @click="setWebhook"
        color="primary"
        :disabled="!token || !url"
        :loading="loading"
      >
        🚀 Set
      </v-btn>
      <v-btn
        @click="deleteWebhook"
        color="warning"
        :disabled="!token"
        :loading="loading"
      >
        🗑️ Delete
      </v-btn>
      <v-btn
        @click="clearPendingUpdates"
        color="warning"
        :disabled="!token || pendingUpdates === 0"
        :loading="loading"
      >
        🧹 Clear pending updates ({{ pendingUpdates }})
      </v-btn>
    </v-row>
    <v-row>
      <v-text-field label="Webhook URL" v-model="url" clearable />
    </v-row>
    <v-row>
      <v-select
        label="Allowed Updates"
        v-model="allowedUpdates"
        :items="updates"
        multiple
        chips
      />
    </v-row>
    <v-snackbar v-model="snackbar.show" :color="snackbar.color" timeout="2000">
      {{ snackbar.message }}
    </v-snackbar>
  </v-col>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import ky from 'ky'
import { last } from 'lodash'
import { WebhookInfo, Update } from 'telegram-typings'

interface WebhookInfoSuccess {
  ok: true
  result: WebhookInfo
}

interface WebhookSuccess {
  ok: true
  result: boolean
  description: string
}

interface UpdatesSuccess {
  ok: true
  result: Update[]
}

interface WebhookError {
  ok: false
  error_code: number
  description: string
}

export default defineComponent({
  name: 'telegram-webhook-helper',
  setup() {
    const base = 'https://api.telegram.org/bot'
    const token = ref('')
    const url = ref('')
    const updates = [
      'message',
      'edited_message',
      'channel_post',
      'edited_channel_post',
      'inline_query',
      'chosen_inline_result',
      'callback_query',
      'shipping_query',
      'pre_checkout_query',
      'poll',
      'poll_answer',
    ]
    const allowedUpdates = ref<string[]>([])
    const pendingUpdates = ref(0)
    const loading = ref(false)
    const snackbar = ref({
      show: false,
      color: '',
      message: '',
    })

    const getWebhookInfo = async () => {
      loading.value = true

      const res = await ky(`${base}${token.value}/getWebhookInfo`, {
        throwHttpErrors: false,
      }).json<WebhookInfoSuccess | WebhookError>()

      if (res.ok) {
        url.value = res.result.url
        allowedUpdates.value = res.result.allowed_updates || []
        pendingUpdates.value = res.result.pending_update_count
      } else {
        snackbar.value = {
          show: true,
          color: 'error',
          message: `${res.error_code}: ${res.description}`,
        }
      }

      loading.value = false
    }

    const setWebhook = async () => {
      loading.value = true

      const res = await ky(`${base}${token.value}/setWebhook`, {
        searchParams: {
          url: url.value,
          allowed_updates: JSON.stringify(allowedUpdates.value),
        },
        throwHttpErrors: false,
      }).json<WebhookSuccess | WebhookError>()

      if (res.ok) {
        snackbar.value = {
          show: true,
          color: 'success',
          message: res.description,
        }
      } else {
        snackbar.value = {
          show: true,
          color: 'error',
          message: `${res.error_code}: ${res.description}`,
        }
      }

      loading.value = false
    }

    const deleteWebhook = async () => {
      loading.value = true

      const res = await ky(`${base}${token.value}/deleteWebhook`, {
        throwHttpErrors: false,
      }).json<WebhookSuccess | WebhookError>()

      if (res.ok) {
        url.value = ''
        snackbar.value = {
          show: true,
          color: 'success',
          message: res.description,
        }
      } else {
        snackbar.value = {
          show: true,
          color: 'error',
          message: `${res.error_code}: ${res.description}`,
        }
      }

      loading.value = false
    }

    const clearPendingUpdates = async () => {
      await deleteWebhook()

      loading.value = true

      const res = await ky(`${base}${token.value}/getUpdates`, {
        throwHttpErrors: false,
      }).json<UpdatesSuccess | WebhookError>()

      if (res.ok) {
        await ky(`${base}${token.value}/getUpdates`, {
          searchParams: {
            offset: last(res.result)!.update_id + 1,
          },
        })

        pendingUpdates.value = 0
        snackbar.value = {
          show: true,
          color: 'success',
          message: 'Pending updates cleared',
        }
      } else {
        snackbar.value = {
          show: true,
          color: 'error',
          message: `${res.error_code}: ${res.description}`,
        }
      }

      loading.value = false
    }

    return {
      token,
      url,
      updates,
      allowedUpdates,
      pendingUpdates,
      loading,
      snackbar,
      getWebhookInfo,
      setWebhook,
      deleteWebhook,
      clearPendingUpdates,
    }
  },
})
</script>
