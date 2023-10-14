import { defineStore } from 'pinia'
import { getToken } from '@/utils/auth'
import { userApi } from '../../api/user'
import { message } from 'ant-design-vue'

const useUserStore = defineStore('useUser', {
  state: () => ({
    token: getToken() ? getToken() : '',
    userinfo: '',
    userProfile: {}
  }),
  actions: {
    // 获取用户信息
    async fetchUserinfo() {
      try {
        const result = await userApi().getUserinfo()
        this.userinfo = result.data.userinfo
      } catch (error) {
        console.log(error)
      }
    },
    // 修改用户资料
    async fetchChangeUserinfo(data) {
      try {
        const result = await userApi().changeUserinfo(data)
        await this.fetchUserinfo()
        return result.success
      } catch (error) {
        console.log(error)
      }
    },
    async fetchSetUserProfile(data) {
      try {
        const result = await userApi().setUserProfile(data)
        message.success(result.message)
        this.fetchUserProfile()
        return result.success
      } catch (error) {
        message.error(error.message)
      }
    },
    async fetchUserProfile() {
      try {
        const result = await userApi().userProfile()
        this.userProfile = JSON.parse(result.data.profiles)
        return result
      } catch (error) {
        message.error(error.message)
      }
    }
  }
})

export default useUserStore
