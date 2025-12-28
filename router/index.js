import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../Layout.vue'

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/',
        name: 'Home',
        component: () => import('../pages/index.vue')
      },
      {
        path: '/login',
        name: 'Login',
        component: () => import('../pages/login.vue')
      },
      {
        path: '/users',
        name: 'Users',
        component: () => import('../pages/users/index.vue')
      },
      {
        path: '/users/add',
        name: 'AddUser',
        component: () => import('../pages/users/add.vue')
      },
      {
        path: '/users/dashboard',
        name: 'Dashboard',
        component: () => import('../pages/users/dashboard.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router