<script setup>
import {
  PieChartOutlined,
  DesktopOutlined,
  UserOutlined,
  FileOutlined
} from '@ant-design/icons-vue'

import { ref } from 'vue'
import { useRouter } from 'vue-router'
const selectedKeys = ref(['1'])
const router = useRouter()
const changeMenuRouter = (to) => {
  router.push({ path: '/' + to })
}
</script>

<template>
  <div class="sider-menu">
    <a-menu v-model:selectedKeys="selectedKeys" mode="inline">
      <a-menu-item key="1" @click="changeMenuRouter('home')">
        <pie-chart-outlined />
        <span>仪表盘</span>
      </a-menu-item>
      <a-menu-item key="2" @click="changeMenuRouter('postArticle')">
        <desktop-outlined />
        <span>用户管理</span>
      </a-menu-item>
      <a-sub-menu key="sub1">
        <template #title>
          <span>
            <user-outlined />
            <span>文章管理</span>
          </span>
        </template>
        <a-menu-item key="3" @click="changeMenuRouter('articleList')">文章列表</a-menu-item>
        <a-menu-item key="4">文章分类</a-menu-item>
        <a-menu-item key="5">文章标签</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub2">
        <template #title>
          <span>
            <user-outlined />
            <span>互动</span>
          </span>
        </template>
        <a-menu-item key="33">通知</a-menu-item>
        <a-menu-item key="44">评论</a-menu-item>
      </a-sub-menu>
      <a-menu-item key="6">
        <file-outlined />
        <span>图片管理</span>
      </a-menu-item>
      <a-menu-item key="7">
        <file-outlined />
        <span>系统设置</span>
      </a-menu-item>
    </a-menu>
  </div>
</template>

<style lang="less" scoped>
.sider-menu {
  padding: 10px 15px;
  border-right: 1px solid #eee;
}
:where(.css-dev-only-do-not-override-kqecok).ant-menu-light.ant-menu-root.ant-menu-inline {
  border-inline-end: none;
}
</style>
