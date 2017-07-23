import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App'
import router from './router'
import store from './store'
import i18n from './i18n'
import util from './util'

Vue.config.productionTip = false
Vue.use(VueResource)

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  VueResource,
  template: '<App/>',
  components: { App }
})
