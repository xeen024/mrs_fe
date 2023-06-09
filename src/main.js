import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
// import './plugins/axios'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

window.moment = require('moment');
Vue.config.productionTip = false
Vue.use(BootstrapVueIcons);
Vue.use(BootstrapVue);
// console.log(baseUrl())

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
