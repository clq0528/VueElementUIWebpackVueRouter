import request from '@/utils/request'

// 登录
export function loginByAccount (data) {
  return request({
    baseURL: 'https://bzl.yeehot.cn/manager',
    url: '/login/managerLogin',
    method: 'POST',
    data: data
  })
}

// 获取用户信息
export function getUserInfo () {
  return request({
    baseURL: 'https://bzl.yeehot.cn/manager',
    url: '/login/logingRefresh',
    method: 'POST'
  })
}

// 退出登录
export function loginOut () {
  return request({
    baseURL: 'https://bzl.yeehot.cn/manager',
    url: '/login/logingOut',
    method: 'POST'
  })
}
