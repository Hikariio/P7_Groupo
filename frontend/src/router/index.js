import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue')
    },
    {
      path: '/Login',
      name: 'Login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/Main',
      name: 'Main',
      component: () => import('../views/Main.vue')
    },
    {
      path: '/Register',
      name: 'Register',
      component: () => import('../views/Register.vue')
    },
    
    {
      path: '/Profile',
      name: 'Profile',
      component: () => import('../views/Profile.vue')
    },
  ]
})

export default router
