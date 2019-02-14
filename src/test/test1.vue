<template>
  <div>
    <h1>this is test one page</h1>
    <button @click="getUser">请求用户信息</button>
  <div>
    <label>{{ name }}</label>
    <label>{{ type }}</label>
    <label>{{ isAdmin }}</label>
  </div>
  <el-button
          type="primary"
        >发起审批</el-button>
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
      ex_get({ userGuid: '68D5333D-F106-4A45-9A5B-61589DA05FFD' }).then(function(response) {
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
