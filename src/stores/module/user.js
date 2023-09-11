import { defineStore } from "pinia";
import { getToken } from '@/utils/auth'
import { userApi } from "../../api/user"

const useUserStore = defineStore('useUser', {
  state: () => ({
    token: getToken() ? getToken() : '',
    userinfo: ''
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
    }
  }
})

export default useUserStore
