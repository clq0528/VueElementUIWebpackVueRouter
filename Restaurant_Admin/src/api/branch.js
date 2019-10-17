import request from '@/utils/request'

// 获取列表
export function getBranchList (data) {
  return request({
    url: '/canteen/branch/list',
    method: 'POST',
    data: data
  })
}

// 添加信息
export function insertBranchItem (data) {
  return request({
    url: '/canteen/branch/save',
    method: 'POST',
    data: data
  })
}

// 编辑信息
export function updateBranchItem (data) {
  return request({
    url: '/canteen/branch/update',
    method: 'POST',
    data: data
  })
}

// 删除信息
export function deleteBranchItem (id) {
  return request({
    url: '/canteen/branch/delete',
    method: 'POST',
    data: {
      id
    }
  })
}

// 获取下拉选项
export function getBranchOptions (data) {
  return request({
    url: '/canteen/branch/options',
    method: 'POST',
    data: data
  })
}

// 门店库存列表
export function getBranchStockList (data) {
  return request({
    url: '/canteen/branchStock/list',
    method: 'POST',
    data: data
  })
}

// 门店新增库存
export function insertBranchStockItem (data) {
  return request({
    url: '/canteen/branchStock/save',
    method: 'POST',
    data: data
  })
}

// 门店修改库存
export function updateBranchStockItem (data) {
  return request({
    url: '/canteen/branchStock/update',
    method: 'POST',
    data: data
  })
}
