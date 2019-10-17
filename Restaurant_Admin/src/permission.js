import router from './router'
import store from './store'

// 白名单
const whiteList = ['/login']

router.beforeEach((to, from, next) => {
  let roles = store.getters.roles // 权限
  console.log('角色权限：', roles)
  if (localStorage.getItem('accessToken')) {
    if (to.path === '/login') {
      next({path: '/index'})
    } else {
      if (!roles || roles.length <= 0) {
        store.dispatch('GetUserInfo').then(() => {
          next({ ...to })
        }).catch(() => {
          store.dispatch('LoginOut').then(() => {
            next({path: '/login'})
          }).catch(() => {
            store.dispatch('LoginOutFront').then(() => {
              next({path: '/login'})
            })
          })
        })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
    }
  }
})

router.afterEach((to, from) => {
  localStorage.setItem('backUrl', from.path)
})
