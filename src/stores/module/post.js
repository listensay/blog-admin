import { defineStore } from 'pinia'
import { postApi } from '@/api/post'
import { message } from 'ant-design-vue'
const usePostApi = postApi()

const usePostStore = defineStore('post', {
  state: () => ({
    list: '',
    currentArticle: ''
  }),
  actions: {
    // 添加文章
    async fetchAddPost (data) {
      try {
        const result = await usePostApi.addPost(data)
        return result
      } catch (error) {
        message.error(error)
      }
    },
    // 获取文章列表
    async fetchListPost (data) {
      const result = await usePostApi.listPost(data)
      this.list = result.data.list
      return result
    },
    // 删除文章
    async fetchDeletePost (id) {
      const result = await usePostApi.deletePost(id)
      return result
    },
    // 获取文章内容
    async fetchContentPost (post_id) {
      const result = await usePostApi.contentPost(post_id)
      this.currentArticle = result.data.list[0]
      return result
    },
    // 编辑文章
    async fetchEditPost (data) {
      const result = await usePostApi.editPost(data)
      this.fetchContentPost(data.post_id)
      return result
    }
  }
})

export default usePostStore
