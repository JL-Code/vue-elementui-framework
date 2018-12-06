import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:4041',
  timeout: 10000
})

// 配置请求拦截器
instance.interceptors.request.use(config => {
  // token在登录成功后返回并存储在sessionStorage中，
  // 在每一次发起请求前把token添加到请求头。
  if(sessionStorage.getItem('token')) {
    instance.defaults.headers.common['Authorization'] = sessionStorage.getItem('token')
  }
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

export default $axios

