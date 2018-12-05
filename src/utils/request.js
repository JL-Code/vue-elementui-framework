import axios from 'axios'
// import Vue from 'vue'

const instance = axios.create({
  baseURL: 'http://localhost:4041',
  timeout: 10000
})

// 配置请求拦截器
instance.interceptors.request.use(config => {
  return config
}, (error) => {
  return Promise.reject(error)
})

// 配置响应拦截器
instance.interceptors.response.use(response => {
  return response
}, (error) => {
  return Promise.reject(error)
})

const $axios = {
  get: (url, data) => {
    return new Promise((resolve, reject) => {
      instance.get(url, {
        params: data
      }).then(response => resolve(response)).catch(error => reject(error))
    })
  },
  post: (url, data) => {
    return new Promise((resolve, reject) => {
      instance.post(url, {
        data: data
      }).then(response => resolve(response)).catch(error => reject(error))
    })
  }
}

// 绑定axios实例到vue原型，方便全局调用
// Vue.prototype.$axios = instance

export default $axios

