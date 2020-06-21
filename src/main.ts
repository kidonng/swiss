import Vue from 'vue'
import router from './plugins/router'
import vuetify from './plugins/vuetify'
import './plugins/composition-api'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount('#app')
