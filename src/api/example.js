import request from '../utils/request.js'

export function ex_get(query) {
  return request({
    url: '/testapi',
    method: 'get',
    params: query
  })
}

export function ex_post(data) {
  return request({
    url: '/testapi',
    method: 'post',
    data: data
  })
}