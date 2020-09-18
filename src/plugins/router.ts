import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import { ga } from 'vue-router-ga-lite'

Vue.use(VueRouter)

export const routes: RouteConfig[] = [
  {
    name: 'Home',
    path: '/',
    component: () => import(/* webpackChunkName: "home" */ '../views/home.vue'),
    meta: {
      icon: 'home',
    },
  },
  {
    name: 'Bilibili AV/BV ID Converter',
    path: '/av-bv-converter',
    component: () =>
      import(
        /* webpackChunkName: "av-bv-converter" */ '../views/av-bv-converter.vue'
      ),
    meta: {
      icon: 'swap-horizontal',
    },
  },
  {
    name: 'CET Score Query',
    path: '/cet-score-query',
    component: () =>
      import(
        /* webpackChunkName: "cet-score-query" */ '../views/cet-score-query.vue'
      ),
    meta: {
      icon: 'counter',
    },
  },
  {
    name: 'Diagrams',
    path: '/diagrams',
    component: () =>
      import(/* webpackChunkName: "diagrams" */ '../views/diagrams.vue'),
    meta: {
      icon: 'graph',
    },
  },
  {
    name: 'DLC Explorer',
    path: '/dlc-explorer',
    component: () =>
      import(
        /* webpackChunkName: "dlc-explorer" */ '../views/dlc-explorer.vue'
      ),
    meta: {
      icon: 'web',
    },
  },
  {
    name: 'ID Number',
    path: '/id-number',
    component: () =>
      import(
        /* webpackChunkName: "id-number" */ '../views/id-number.vue'
      ),
    meta: {
      icon: 'identifier',
    },
  },
  {
    name: 'Microsoft Store Info',
    path: '/microsoft-store-info',
    component: () =>
      import(
        /* webpackChunkName: "microsoft-store-info" */ '../views/microsoft-store-info.vue'
      ),
    meta: {
      icon: 'microsoft',
    },
  },
  {
    name: 'MIUI Dev Link',
    path: '/miui-dev-link',
    component: () =>
      import(
        /* webpackChunkName: "miui-dev-link" */ '../views/miui-dev-link.vue'
      ),
    meta: {
      icon: 'link',
    },
  },
  {
    name: 'Progress',
    path: '/progress',
    component: () =>
      import(/* webpackChunkName: "progress" */ '../views/progress.vue'),
    meta: {
      icon: 'progress-clock',
    },
  },
  {
    name: 'Substats Badge Creator',
    path: '/substats-badge-creator',
    component: () =>
      import(
        /* webpackChunkName: "substats-badge-creator" */ '../views/substats-badge-creator.vue'
      ),
    meta: {
      icon: 'shield-star',
    },
  },
  {
    name: 'Telegram Webhook Helper',
    path: '/telegram-webhook-helper',
    component: () =>
      import(
        /* webpackChunkName: "telegram-webhook-helper" */ '../views/telegram-webhook-helper.vue'
      ),
    meta: {
      icon: 'telegram',
    },
  },
  {
    name: 'xkcd why',
    path: '/xkcd-why',
    component: () =>
      import(/* webpackChunkName: "xkcd-why" */ '../views/xkcd-why.vue'),
    meta: {
      icon: 'help-circle',
    },
  },
  {
    path: '*',
    redirect: '/',
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.afterEach(({ name }) => {
  document.title = name!
})

ga('UA-140053908-5', router)

export default router
