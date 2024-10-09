import Vue from 'vue'
import App from './App.vue'
import router from './scripts/router';
import store from './scripts/store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
