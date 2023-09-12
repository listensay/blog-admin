import { defineStore } from 'pinia'
import { postApi } from '@/api/post'
import { message } from 'ant-design-vue'
const usePostApi = postApi()

const usePostStore = defineStore('post', {
  state: () => ({
    list: ''
  }),
  actions: {
    async fetchAddPost(data) {
      try {
        const result = await usePostApi.addPost(data)
        return result
      } catch (error) {
        message.error(error)
      }
    },
    async fetchListPost(data) {
      const result = await usePostApi.listPost(data)
      this.list = result.data.list
      return result
    },
    async fetchDeletePost(id) {
      const result = await usePostApi.deletePost(id)
      return result
    }
  }
})

export default usePostStore
