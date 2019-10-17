import request from '@/utils/request'

// 获取列表
export function getUnitList (data) {
  return request({
    url: '/canteen/unit/list',
    method: 'POST',
    data: data
  })
}

// 添加信息
export function insertUnitItem (data) {
  return request({
    url: '/canteen/unit/save',
    method: 'POST',
    data: data
  })
}

// 编辑信息
export function updateUnitItem (data) {
  return request({
    url: '/canteen/unit/update',
    method: 'POST',
    data: data
  })
}

// 删除信息
export function deleteUnitItem (id) {
  return request({
    url: '/canteen/unit/delete',
    method: 'POST',
    data: {
      id
    }
  })
}

// 获取下拉选项
export function getUnitOptions () {
  return request({
    url: '/canteen/unit/options',
    method: 'POST'
  })
}
