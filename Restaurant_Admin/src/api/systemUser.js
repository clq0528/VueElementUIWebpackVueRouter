import request from '@/utils/request'

// 获取列表
export function getSystemUserList (data) {
  return request({
    baseURL: 'https://bzl.yeehot.cn/manager',
    url: '/sysUser/getAllUsers',
    method: 'POST',
    data: data
  })
}

// 新增信息
export function insertSystemUserItem (data) {
  return request({
    baseURL: 'https://bzl.yeehot.cn/manager',
    url: '/sysUser/createUser',
    method: 'POST',
    data: data
  })
}

// 编辑信息
export function updateSystemUserItem (data) {
  return request({
    baseURL: 'https://bzl.yeehot.cn/manager',
    url: '/sysUser/updateUser',
    method: 'POST',
    data: data
  })
}

// 删除信息
export function deleteSystemUserItem (id) {
  return request({
    baseURL: 'https://bzl.yeehot.cn/manager',
    url: '/sysUser/delUserById',
    method: 'POST',
    data: {
      id
    }
  })
}

// 编辑用户角色
export function updateSystemUserRole (data) {
  return request({
    baseURL: 'https://bzl.yeehot.cn/manager',
    url: '/userRole/createUserRole',
    method: 'POST',
    data: data
  })
}
