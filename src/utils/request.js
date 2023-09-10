import axios from 'axios'

// create an axios instance
const service = axios.create({
  baseURL: 'http://127.0.0.1:3000/api',
  timeout: 5000 // request timeout
})

export default service
