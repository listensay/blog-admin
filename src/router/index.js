import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home',
      component: () => import('@/Layout/index.vue'),
      meta: {
        hiding: true
      },
      children: [
        {
          path: '/home',
          component: () => import('@/views/Home/index.vue'),
          meta: {
            title: '仪表盘'
          }
        },
        {
          path: '/postArticle',
          component: () => import('@/views/postArticle/index.vue'),
          meta: {
            title: '发布文章'
          }
        },
        {
          path: '/article-management',
          redirect: '/article-management/article-list',
          meta: {
            title: '文章管理'
          },
          children: [
            {
              path: '/article-management/article-list',
              component: () => import('@/views/articleList/index.vue'),
              meta: {
                title: '文章列表'
              }
            },
            {
              path: '/article-management/editArticle',
              name: 'EditArticle',
              component: () => import('@/views/editArticle/index.vue'),
              meta: {
                hiding: true
              }
            },
            {
              path: '/article-management/article-category',
              component: () => import('@/views/category/index.vue'),
              meta: {
                title: '文章分类'
              }
            }
          ]
        },
        {
          path: '/changeUserinfo',
          component: () => import('@/views/changeUserinfo/index.vue'),
          meta: {
            hiding: true
          }
        },
        {
          path: '/images',
          component: () => import('@/views/images/index.vue'),
          meta: {
            title: '图片管理'
          }
        }
      ]
    },
    {
      path: '/login',
      component: () => import('@/views/login/index.vue'),
      meta: {
        hiding: true
      }
    }
  ]
})

export default router
