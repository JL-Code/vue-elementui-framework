import Vue from 'vue'
import VueRouter from 'vue-router'

// 仅供测试 各模块根据需要在modules文件夹中添加路由配置信息
// import Test1 from '../test/test1.vue'
// import Test2 from '../test/test2.vue'
// import TestHome from '../test/testhome.vue'

Vue.use(VueRouter)

export default () => {
  const router = new VueRouter({
    mode: 'history',
    scrollBehavior(to, from, savedPosition) {
      if(savedPosition)
        return savedPosition
      else
        return { x: 0, y: 0 }
    },
    routes: [
      {
        path: '/test1',
        component: () => import('../test/test1.vue')
      },
      {
        path: '/test2',
        component: () => import('../test/test2.vue')
      },
      {
        path: '/testhome',
        component: () => import('../test/testhome.vue')
      }
    ]
  })

  // 注册全局守卫，在进入页面之前验证是否存在token
  router.beforeEach((to, from, next) => {
    if(to.meta.requireAuth && sessionStorage.getItem('token')) {
      if(to.path === '/login') {
        next()
      } else {
        next('/login')
      }
    } else {
      next()
    }
  })

  return router
}