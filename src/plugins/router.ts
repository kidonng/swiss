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
    name: 'ID Number',
    path: '/id-number',
    component: () =>
      import(
        /* webpackChunkName: "id-number" */ '../views/id-number/index.vue'
      ),
    meta: {
      icon: 'identifier',
    },
  },
  {
    name: 'Bilibili AV BV',
    path: '/bilibili-av-bv',
    component: () =>
      import(
        /* webpackChunkName: "bilibili-av-bv" */ '../views/bilibili-av-bv/index.vue'
      ),
    meta: {
      icon: 'swap-horizontal',
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
    name: 'Substats Badge Creator',
    path: '/substats-badge-creator',
    component: () =>
      import(
        /* webpackChunkName: "substats-badge-cretor" */ '../views/substats-badge-creator/index.vue'
      ),
    meta: {
      icon: 'shield-star',
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
    name: 'Progress',
    path: '/progress',
    component: () =>
      import(/* webpackChunkName: "progress" */ '../views/progress/index.vue'),
    meta: {
      icon: 'progress-clock',
    },
  },
  {
    name: 'CET Score',
    path: '/cet-score',
    component: () =>
      import(/* webpackChunkName: "cet-score" */ '../views/cet-score.vue'),
    meta: {
      icon: 'counter',
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
