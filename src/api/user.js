import request from '@/utils/request'

export const userApi = () => {
  return {
    login: (data) => {
      return request({
        url: 'user/login',
        method: 'post',
        data
      })
    },
    getUserinfo: () => {
      return request({
        url: 'user/userinfo',
        method: 'get'
      })
    },
    changeUserinfo: (data) => {
      return request({
        url: 'user/changeUserInfo',
        method: 'post',
        data
      })
    },
    setUserProfile: (data) => {
      return request({
        url: 'user/setUserProfile',
        method: 'post',
        data
      })
    },
    userProfile: () => {
      return request({
        url: 'user/userProfile'
      })
    }
  }
}
