<template>
  <div>
    <h1>this is test one page</h1>
    <button @click="getUser">请求用户信息</button>
  <div>
    <label>{{ name }}</label>
    <label>{{ type }}</label>
    <label>{{ isAdmin }}</label>
  </div>
  </div>
</template>

<script>
import { ex_get } from '../api/example.js'

export default {
  data() {
    return {
      name: null,
      type: null,
      isAdmin: null
    }
  },
  methods: {
    getUser() {
      const _vue = this
      ex_get({ userGuid: '9A3FA9BF-BDCD-E811-80D2-848AE3185301' }).then(function(response) {
        const user = response.data
        _vue.name = user.UserName
        _vue.type = user.UserType
        _vue.isAdmin = user.IsAdmin ? '是' : '否'
      }, function(error) {
        console.log(error.message)
      })
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
