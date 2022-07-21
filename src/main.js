import Vue from 'vue'
import App from './App.vue'
// 引入路由
import router from './router'
// 引入全局vant组件
import vant, { Lazyload, Dialog } from 'vant'
import 'vant/lib/index.css'
// 引入全局css
import '@/styles/index.css'
import '@/styles/font/iconfont.css'
import 'vant/lib/icon/local.css'
import 'amfe-flexible'
// 定义全局组件
import NavBar from '@/components/NavBar'
import store from './store'
// 全局百度提土组件
import BaiduMap from 'vue-baidu-map'
Vue.use(BaiduMap, {
  ak: 'f41njttIAb4ZStfkYvlQK1TSF9pAjUlC'
})
// 全局注册
Vue.use(Dialog)
Vue.component('NavBar', NavBar)
Vue.config.productionTip = false
Vue.use(vant)
Vue.use(Lazyload)
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
