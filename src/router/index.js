import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home',
      component: () => import('@/Layout/index.vue'),
      children: [
        {
          path: '/home',
          component: () => import('@/views/Home/index.vue')
        },
        {
          path: '/changeUserinfo',
          component: () => import('@/views/changeUserinfo/index.vue')
        },
        {
          path: '/postArticle',
          component: () => import('@/views/postArticle/index.vue')
        },
        {
          path: '/editArticle',
          component: () => import('@/views/editArticle/index.vue')
        },
        {
          path: '/articleList',
          component: () => import('@/views/articleList/index.vue')
        }
      ]
    },
    {
      path: '/login',
      component: () => import('@/views/login/index.vue')
    }
  ]
})

export default router
