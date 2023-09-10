<script setup>
import {
  PieChartOutlined,
  DesktopOutlined,
  UserOutlined,
  TeamOutlined,
  FileOutlined,
} from '@ant-design/icons-vue';

import { ref } from 'vue';

const selectedKeys = ref();
</script>

<template>
  <div class="sider-menu">
    <div class="logo">
      Listen Admin
    </div>
    <a-menu v-model:selectedKeys="selectedKeys" mode="inline">
      <a-menu-item key="1">
        <pie-chart-outlined />
        <span>Option 1</span>
      </a-menu-item>
      <a-menu-item key="2">
        <desktop-outlined />
        <span>Option 2</span>
      </a-menu-item>
      <a-sub-menu key="sub1">
        <template #title>
          <span>
            <user-outlined />
            <span>User</span>
          </span>
        </template>
        <a-menu-item key="3">Tom</a-menu-item>
        <a-menu-item key="4">Bill</a-menu-item>
        <a-menu-item key="5">Alex</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub2">
        <template #title>
          <span>
            <team-outlined />
            <span>Team</span>
          </span>
        </template>
        <a-menu-item key="6">Team 1</a-menu-item>
        <a-menu-item key="8">Team 2</a-menu-item>
      </a-sub-menu>
      <a-menu-item key="9">
        <file-outlined />
        <span>File</span>
      </a-menu-item>
    </a-menu>
  </div>
</template>

<style lang="less" scoped>
.sider-menu {
  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 64px;
    margin-bottom: 10px;
    font-size: 18px;
    color: #fff;
    cursor: pointer;
    background-color: cadetblue;
  }

}
:where(.css-dev-only-do-not-override-kqecok).ant-menu .ant-menu-item {
  border-radius: 4px;
}
</style>
