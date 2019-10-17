import request from '@/utils/request'

// 获取权限列表
export function getAclList (data) {
  return request({
    baseURL: 'https://bzl.yeehot.cn/manager',
    url: '/acl/getAllAcl',
    method: 'POST',
    data: data
  })
}

// 创建权限
export function insertAclItem (data) {
  return request({
    baseURL: 'https://bzl.yeehot.cn/manager',
    url: '/acl/createAcl',
    method: 'POST',
    data: data
  })
}

// 编辑权限
export function updateAclItem (data) {
  return request({
    baseURL: 'https://bzl.yeehot.cn/manager',
    url: '/acl/updateAcl',
    method: 'POST',
    data: data
  })
}

// 删除权限
export function deleteAclItem (id) {
  return request({
    baseURL: 'https://bzl.yeehot.cn/manager',
    url: '/acl/delAclById',
    method: 'POST',
    data: {
      id
    }
  })
}

// 根据角色ID查询权限列表
export function getAclByRole (roleId) {
  return request({
    baseURL: 'https://bzl.yeehot.cn/manager',
    url: '/acl/getAclByRole',
    method: 'POST',
    data: {
      roleId
    }
  })
}

// 获取模块下拉选项
export function getAclModelOptions () {
  return request({
    baseURL: 'https://bzl.yeehot.cn/manager',
    url: '/acl/getModels',
    method: 'POST'
  })
}

// 动态获取父级模块名称
export function getAclDynamicOptions (data) {
  return request({
    baseURL: 'https://bzl.yeehot.cn/manager',
    url: '/acl/getModelTree',
    method: 'POST',
    data: data
  })
}

// 获取资源树
export function getAclTree () {
  return request({
    baseURL: 'https://bzl.yeehot.cn/manager',
    url: '/acl/getAclTree',
    method: 'POST'
  })
}
