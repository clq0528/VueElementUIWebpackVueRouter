import axios from 'axios'
// import store from '../store'
// import router from '../router'
import qs from 'qs'
import { Message } from 'element-ui'
import { isFormData } from './index'

// 接口URL
// const host = 'http://10.187.64.81:8084' // 成一
// const host = 'http://10.187.24.99:8084' // 远航
// const host = 'http://10.187.40.223:8084' // 井飞
// const host = 'http://10.187.57.33:8084' // 文雅
// const host = 'http://10.187.48.177:8086' // 冯军
const host = 'https://bzl.yeehot.cn' // 测试
// const version = ''

// 初始化axios
const request = axios.create({
  baseURL: `${host}`,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'app': 'pc'
  }
})

// 请求拦截
request.interceptors.request.use(
  config => {
    if (localStorage.getItem('accessToken')) {
      config.headers['accessToken'] = localStorage.getItem('accessToken')
    }
    config.data = (!isFormData(config.data)) ? qs.stringify(config.data) : config.data
    return config
  },
  error => {
    Message.error(error.data.error.message)
    Promise.reject(error)
  }
)

// 响应拦截
request.interceptors.response.use(
  ({data}) => {
    if (data.code === 200) {
      return data
    } else {
      // 错误弹窗
      Message({
        message: data.msg || '系统错误',
        type: 'error',
        duration: 1500
      })
      return Promise.reject(data)
    }
  },
  error => {
    Message.error(error.message || '请求失败')
    return Promise.reject(error)
  }
)

export default request
