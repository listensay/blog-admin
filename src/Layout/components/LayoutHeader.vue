<script setup>
import { DownOutlined } from '@ant-design/icons-vue'

</script>

<template>
  <div class="layout-header">
    <div class="left">
      <h1>仪表盘</h1>
    </div>
    <div class="right">
      <a-dropdown>
        <a class="ant-dropdown-link" @click.prevent style="color: #000;">
          Admin
          <DownOutlined />
        </a>
        <template #overlay>
          <a-menu>
            <a-menu-item>
              <a href="javascript:;">修改资料</a>
            </a-menu-item>
            <a-menu-divider />

            <a-menu-item>
              <a href="javascript:;">退出登陆</a>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>

<style lang="less" scoped>
.layout-header {
  display: flex;
  justify-content: space-between;
}
</style>