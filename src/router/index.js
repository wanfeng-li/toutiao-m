import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 路由表
const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  },
  {
    path: '/',
    // name: 'layout', // 如果父路由有默认的子路由 那它的name没有意义
    component: () => import('@/views/layout'),
    children: [
      {
        path: '', // 默认路由 只能有一个
        name: 'home', // 首页
        component: () => import('@/views/home')
      },
      {
        path: '/qa',
        name: 'qa',
        component: () => import('@/views/qa')
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('@/views/my')
      },
      {
        path: '/video',
        name: 'video',
        component: () => import('@/views/video')
      },
    ]
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search')
  }

]

const router = new VueRouter({
  routes
})

export default router
