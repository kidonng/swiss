<template>
  <v-app>
    <v-app-bar color="primary" dark app>
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-toolbar-title>Swiss</v-toolbar-title>
      <v-spacer />
      <v-tooltip bottom>
        <template #activator="{ on, attrs }">
          <v-btn @click="toggleDarkTheme" icon v-bind="attrs" v-on="on">
            <v-icon>mdi-theme-light-dark</v-icon>
          </v-btn>
        </template>
        <span>Toggle Dark Theme</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template #activator="{ on, attrs }">
          <v-btn
            href="https://github.com/kidonng/swiss"
            icon
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-github</v-icon>
          </v-btn>
        </template>
        <span>GitHub</span>
      </v-tooltip>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <v-list-item v-for="route in routes" :to="route.path" :key="route.name">
          <v-list-item-icon>
            <v-icon>mdi-{{ route.meta.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ route.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container fill-height>
        <v-row justify="center">
          <router-view />
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import { routes } from './plugins/router'
import { darkTheme } from '@/utils/dark-theme'

export default defineComponent({
  name: 'App',
  setup(
    props,
    {
      root: {
        $vuetify: { theme },
      },
    }
  ) {
    const drawer = ref(false)
    const { toggleDarkTheme } = darkTheme(theme)

    // `slice` to drop fallback route
    return { drawer, routes: routes.slice(0, -1), toggleDarkTheme }
  },
})
</script>
