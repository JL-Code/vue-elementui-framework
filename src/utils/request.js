import axios from 'axios'
// import Vue from 'vue'

const instance = axios.create({
  baseURL: '',
  headers: '',
  timeout: 3000
})

// 配置请求拦截器
instance.interceptors.request.use((config) => {
  return config
}, (error) => {
  return Promise.reject(error)
})

// 配置响应拦截器
instance.interceptors.response.use((response) => {
  return response
}, (error) => {
  return Promise.reject(error)
})

// 绑定axios实例到vue原型，方便全局调用
// Vue.prototype.$axios = instance

export default instance

