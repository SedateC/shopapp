import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css'; //调用格式化浏览器插件

let wrapper = document.querySelector('.wrapper')
Vue.config.productionTip = false
Vue.prototype.$bus = new Vue();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
