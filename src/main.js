import Vue from 'vue'
import App from './App.vue'
import Axios from 'axios';
import router from './router'
import Vant from 'vant';
import 'vant/lib/index.css';
import '@vant/touch-emulator';
Vue.use(Vant);
//把Axios用Vue原型封装，之后直接访问$http即可
Vue.prototype.$http = Axios;

Axios.defaults.baseURL='http://timemeetyou.com:8889/api/private/v1/';
//axios添加拦截器，把服务器所需要的令牌给加进去
Axios.interceptors.request.use(config=>{
  //添加了一个Authorization字段，并给它赋值token信息
  config.headers.Authorization = window.sessionStorage.getItem("token");
  return config;
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
