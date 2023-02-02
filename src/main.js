import Vue from 'vue'
import App from './App.vue'
import Vant from 'vant';
import 'vant/lib/index.css';
import router from '@/router/index.js'
import axios from 'axios';
import { Tree } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/font/iconfont.css';
axios.defaults.baseURL = "http://218.29.42.147:8081/gov/"
Vue.prototype.$axios = axios

Vue.config.productionTip = false
Vue.use(Vant)
Vue.use(Tree);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
