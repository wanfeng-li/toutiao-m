import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


//  加载 Vant 核心组件库
import Vant from 'vant'
// 加载 Vant 全局样式
import 'vant/lib/index.css'

// 加载全局样式
import './styles/index.less'

// 加载用于设置 rem 的基准值
import 'amfe-flexible'

// 导入初始化时间的配置  dayjs
import '@/utils/dayjs'


// 注册使用 Vant 组件库
Vue.use(Vant);



Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
