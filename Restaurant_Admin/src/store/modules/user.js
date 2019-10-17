import { loginByAccount, getUserInfo, loginOut } from '@/api/login'

const user = {
  state: {
    accessToken: '',
    userInfo: {},
    roles: [],
    resources: [],
    menuTree: [
      {
        aclMenuName: '安全管理',
        aclUrl: '/system',
        aclMenuIcon: 'el-icon-my-setting',
        childList: [
          { aclMenuName: '用户管理', aclUrl: '/system/user' },
          { aclMenuName: '角色管理', aclUrl: '/system/role' },
          { aclMenuName: '资源管理', aclUrl: '/system/acl' }
        ]
      }, {
        aclMenuName: '门店管理',
        aclUrl: '/shop',
        aclMenuIcon: 'el-icon-my-shop',
        childList: [
          { aclMenuName: '总店管理', aclUrl: '/shop/headquarters' },
          { aclMenuName: '分店管理', aclUrl: '/shop/branch' },
          { aclMenuName: '库存管理', aclUrl: '/shop/branchStock' },
          { aclMenuName: '头条管理', aclUrl: '/shop/news' },
          { aclMenuName: '轮播图管理', aclUrl: '/shop/banner' }
        ]
      }, {
        aclMenuName: '餐桌管理',
        aclUrl: '/table',
        aclMenuIcon: 'el-icon-my-zhuangxiushangjia-',
        childList: [
          { aclMenuName: '餐桌类型', aclUrl: '/table/category' },
          { aclMenuName: '餐桌信息', aclUrl: '/table/index' }
        ]
      }, {
        aclMenuName: '菜品管理',
        aclUrl: '/food',
        aclMenuIcon: 'el-icon-my-shiwu',
        childList: [
          { aclMenuName: '菜品分类', aclUrl: '/food/category' },
          { aclMenuName: '菜品信息', aclUrl: '/food/index' }
        ]
      }, {
        aclMenuName: '会员管理',
        aclUrl: '/user',
        aclMenuIcon: 'el-icon-my-addressbook',
        childList: [
          { aclMenuName: '会员信息', aclUrl: '/user/index' }
        ]
      }, {
        aclMenuName: '订单管理',
        aclUrl: '/order',
        aclMenuIcon: 'el-icon-my-accountbook',
        childList: [
          { aclMenuName: '订单信息', aclUrl: '/order/index' }
        ]
      }, {
        aclMenuName: '系统参数',
        aclUrl: '/systemParams',
        aclMenuIcon: 'el-icon-my-kongzhizhongxin',
        childList: [
          { aclMenuName: '规格类型', aclUrl: '/food/specCategory' },
          { aclMenuName: '单位信息', aclUrl: '/food/unit' }
        ]
      }
    ]
  },

  actions: {
    // 登录
    LoginByAccount ({commit}, params) {
      return new Promise((resolve, reject) => {
        loginByAccount(params).then(res => {
          let data = res.data.result
          commit('SET_USER_TOKEN', res.token)
          commit('SET_USER_INFO', data)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 获取用户信息
    GetUserInfo ({commit}) {
      return new Promise((resolve, reject) => {
        getUserInfo().then(res => {
          let data = res.data.result
          commit('SET_USER_INFO', data)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 退出登陸 - 后端
    LoginOut ({commit}) {
      return new Promise((resolve, reject) => {
        loginOut().then(res => {
          commit('REMOVE_USER_TOKEN')
          commit('REMOVE_USER_INFO')
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 退出登录 - 前端
    LoginOutFront ({commit}) {
      return new Promise((resolve, reject) => {
        commit('REMOVE_USER_TOKEN')
        commit('REMOVE_USER_INFO')
        resolve('已退出登录')
      })
    }
  },

  mutations: {
    // 保存TOKEN
    SET_USER_TOKEN (state, token) {
      localStorage.setItem('accessToken', token)
      state.accessToken = token
    },
    // 清除TOKEN
    REMOVE_USER_TOKEN (state) {
      localStorage.removeItem('accessToken')
      state.accessToken = ''
    },
    // 保存用户信息
    SET_USER_INFO (state, userInfo) {
      state.userInfo = userInfo
      state.menuTree = userInfo.menuTree
      state.resources = userInfo.resources
      let roles = []
      userInfo.resources.filter(v => { roles.push(v.aclCode) })
      state.roles = roles
    },
    // 清除用户信息
    REMOVE_USER_INFO (state) {
      state.userInfo = {}
      state.menuTree = []
      state.resources = []
      state.roles = []
    }
  }
}

export default user
