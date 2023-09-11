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
    }
  }
}
