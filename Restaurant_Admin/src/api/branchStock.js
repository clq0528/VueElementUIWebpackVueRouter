import request from '@/utils/request'

// 获取列表
export function getBranchStockList (data) {
  return request({
    url: '/canteen/branchStock/list',
    method: 'POST',
    data: data
  })
}

// 添加信息
export function insertBranchStockItem (data) {
  return request({
    url: '/canteen/branchStock/save',
    method: 'POST',
    data: data
  })
}

// 编辑信息
export function updateBranchStockItem (data) {
  return request({
    url: '/canteen/branchStock/update',
    method: 'POST',
    data: data
  })
}

// 删除信息
export function deleteBranchStockItem (id) {
  return request({
    url: '/canteen/branchStock/delete',
    method: 'POST',
    data: {
      id
    }
  })
}
