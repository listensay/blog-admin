<script setup>
import { DownOutlined } from '@ant-design/icons-vue'
import { removeToken } from '@/utils/auth'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import useUserStore from '../../stores/module/user'
import { inject, ref } from 'vue'
const router = useRouter()
const userStore = useUserStore()

const logout = () => {
  removeToken()
  router.push({ path: '/login' })
  message.success('退出成功')
}

const changeUserinfo = () => {
  router.push({ path: '/changeUserinfo' })
}

const baseurl = ref(inject('$baseurl'))
</script>

<template>
  <div class="layout-header">
    <div class="left">
      <h1>仪表盘</h1>
    </div>
    <div class="right">
      <a-dropdown>
        <a class="ant-dropdown-link" style="color: #fff; display: block" @click.prevent>
          <a-avatar
            size="large"
            :src="baseurl + userStore.userinfo.avatar"
            :style="{ verticalAlign: 'middle', 'margin-right': '5px' }"
          />
          {{ userStore.userinfo.nickname }}
          <DownOutlined />
        </a>
        <template #overlay>
          <a-menu>
            <a-menu-item>
              <a href="javascript:;" @click="changeUserinfo">修改资料</a>
            </a-menu-item>
            <a-menu-divider />
            <a-menu-item>
              <a href="javascript:;" @click="logout">退出登陆</a>
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
