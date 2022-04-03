import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/main',
    name: 'Main',
    component: () => import('../views/Main.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router