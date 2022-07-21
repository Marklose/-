import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home',
    component: () => import('@/views/Layout'),
    children: [
      {
        path: 'home',
        component: () => import('@/views/Home')
      },
      {
        path: '/home/list',
        component: () => import('@/views/List')
      },
      {
        path: '/home/news',
        component: () => import('@/views/News')
      },
      {
        path: '/home/profile',
        component: () => import('@/views/Profile')
      }
    ]
  },
  {
    path: '/map',
    component: () => import('@/views/Map')
  },
  {
    path: '/city',
    component: () => import('@/views/City')
  },
  {
    path: '/login',
    component: () => import('@/views/Login')
  },
  {
    path: '/register',
    component: () => import('@/views/Register')
  },
  {
    path: '/useredit',
    component: () => import('@/views/UserEdit')
  },
  {
    path: '/favorite',
    component: () => import('@/views/Favorite')
  },
  {
    path: '/rent',
    component: () => import('@/views/Rent')
  },
  {
    path: '/rent/add',
    component: () => import('@/views/RentAdd'),
    children: [
      {
        path: '/rent/search',
        component: () => import('@/views/RentSearch')
      }
    ]
  },
  {
    path: '/detail',
    component: () => import('@/views/Detail')
  }
]
const router = new VueRouter({
  routes
})

export default router
