import axios from 'axios'
import useUserStore from '../stores/module/user'
import { getToken, removeToken } from '@/utils/auth'
import { message } from 'ant-design-vue'
import router from '../router'

// create an axios instance
const service = axios.create({
  baseURL: 'http://127.0.0.1:3000/api',
  timeout: 5000 // request timeout
})

// request interceptor 请求拦截器
service.interceptors.request.use(
  (config) => {
    const userStore = useUserStore()
    if (userStore.token) {
      config.headers['Authorization'] = 'Bearer ' + getToken()
    }
    return config
  },
  (error) => {
    console.log(error)
    return Promise.reject(error)
  }
)

// response interceptor 响应拦截器
service.interceptors.response.use(
  (response) => {
    const res = response.data

    if (res.code !== 2000) {
      message.error(res.message || 'Error')

      // 5014 Token过期 503 Token 无效
      if (res.code === 5014 || res.code === 5013) {
        // to re-login
        // location.reload()
        removeToken()
        router.push({ path: '/login' })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  (error) => {
    console.log('err' + error) // for debug
    message.error(error)
    return Promise.reject(error)
  }
)

export default service
