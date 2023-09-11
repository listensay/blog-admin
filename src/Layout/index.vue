<script setup>
import LayoutSide from './components/LayoutSide.vue'
import LayoutHeader from '@/Layout/components/LayoutHeader.vue'
</script>

<template>
  <div class="layout">
    <a-layout style="min-height: 100vh">
      <a-layout-sider width="240">
        <LayoutSide></LayoutSide>
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #4338ca;color: #fff; padding: 0 20px">
          <LayoutHeader></LayoutHeader>
        </a-layout-header>
        <a-layout-content>
          <router-view></router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<style lang="less" scoped>
:where(.css-dev-only-do-not-override-kqecok).ant-layout .ant-layout-sider {
  background: #fff;
}
</style>
