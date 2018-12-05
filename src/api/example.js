import $http from '../utils/request.js'

export function ex_get(query) {
  return $http.get('/api/user', query)
}

export function ex_post(data) {
  return $http.post('/postapi', data)
}