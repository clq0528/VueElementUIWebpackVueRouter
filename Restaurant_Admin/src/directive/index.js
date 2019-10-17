import Vue from 'vue'
import store from '@/store'

// 判断是否有权限操作按钮
const directive = Vue.directive('auth', {
  bind: (el, binding) => {
    let code = binding.value.code
    let roles = store.getters.roles
    if (!(roles.indexOf(code) !== -1)) {
      el.parentElement.removeChild(el)
    }
  }
})

export {directive}
