import "@babel/polyfill"
import Vue from 'vue'
import App from './app.vue'
import CreateVueRouter from './router/router.js'
import CrateStore from './store/store.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/styles/global.styl'

Vue.use(ElementUI)

new Vue({
  render: h => h(App),
  router: CreateVueRouter(),
  store: CrateStore(),
}).$mount('#root')