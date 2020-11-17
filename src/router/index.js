import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/add-card',
    name: 'AddCard',
    component: () => import('@/views/AddCard.vue')
  },
  {
    path: '/edit-card/:id',
    name: 'EditCard',
    component: () => import('@/views/EditCard.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
