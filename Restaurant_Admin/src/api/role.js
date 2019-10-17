import request from '@/utils/request'

// 查询角色列表
export function getRoleList (data) {
  return request({
    baseURL: 'https://bzl.yeehot.cn/manager',
    url: '/role/getAllRoles',
    method: 'POST',
    data: data
  })
}

// 创建新角色
export function insertRoleItem (data) {
  return request({
    baseURL: 'https://bzl.yeehot.cn/manager',
    url: '/role/createRole',
    method: 'POST',
    data: data
  })
}

// 更新角色
export function updateRoleItem (data) {
  return request({
    baseURL: 'https://bzl.yeehot.cn/manager',
    url: '/role/updateRole',
    method: 'POST',
    data: data
  })
}

// 根据主键ID删除角色
export function deleteRoleItem (id) {
  return request({
    baseURL: 'https://bzl.yeehot.cn/manager',
    url: '/role/delRoleById',
    method: 'POST',
    data: {
      id
    }
  })
}

// 更新角色权限
export function updateRoleAcl (data) {
  return request({
    baseURL: 'https://bzl.yeehot.cn/manager',
    url: '/roleAcl/createRoleAcl',
    method: 'POST',
    data: data
  })
}

// 根据角色ID获取权限
export function getRoleAcl (roleId) {
  return request({
    baseURL: 'https://bzl.yeehot.cn/manager',
    url: '/roleAcl/getRoeAclByRoleId',
    method: 'POST',
    data: {
      roleId
    }
  })
}

// 获取所有角色列表
export function getRoleOptions () {
  return request({
    baseURL: 'https://bzl.yeehot.cn/manager',
    url: '/role/getAllRolesForAuthen',
    method: 'POST'
  })
}

// 根据用户Id查询用户角色
export function getUserRole (userId) {
  return request({
    baseURL: 'https://bzl.yeehot.cn/manager',
    url: '/userRole/getUserRoeByUserId',
    method: 'POST',
    data: {
      userId
    }
  })
}
