import request from '@/utils/request'

export const postApi = () => {
  return {
    addPost: (data) => {
      return request({
        url: '/post/addPost',
        method: 'post',
        data
      })
    },
    listPost: () => {
      return request({
        url: '/post/listPost',
        method: 'get'
      })
    },
    deletePost: (id) => {
      return request({
        url: `/post/deletePost/${id}`,
        method: 'delete'
      })
    },
    contentPost: (post_id) => {
      return request({
        url: `/post/listPost?post_id=${post_id}`,
        method: 'get'
      })
    },
    editPost: (data) => {
      return request({
        url: '/post/editPost',
        method: 'post',
        data
      })
    },
    category: () => {
      return request({ url: '/post/category' })
    }
  }
}
