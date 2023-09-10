import request from '@/utils/request'

export const userApi = () => {
  return {
    login: data => {
      return request({
        url: '/user/login',
        method: 'post',
        data
      })
    }
  }
}
