import request from '@/utils/request'

// 获取类型列表
export function getTableCategoryList (data) {
  return request({
    url: '/canteen/tableCategory/list',
    method: 'POST',
    data: data
  })
}

// 添加信息
export function insertTableCategoryItem (data) {
  return request({
    url: '/canteen/tableCategory/save',
    method: 'POST',
    data: data
  })
}

// 编辑信息
export function updateTableCategoryItem (data) {
  return request({
    url: '/canteen/tableCategory/update',
    method: 'POST',
    data: data
  })
}

// 删除信息
export function deleteTableCategoryItem (id) {
  return request({
    url: '/canteen/tableCategory/delete',
    method: 'POST',
    data: {
      id
    }
  })
}

// 获取类型下拉选项
export function getTableCategoryOptions () {
  return request({
    url: '/canteen/tableCategory/options',
    method: 'POST'
  })
}

// 获取列表
export function getTableList (data) {
  return request({
    url: '/canteen/table/list',
    method: 'POST',
    data: data
  })
}

// 添加信息
export function insertTableItem (data) {
  return request({
    url: '/canteen/table/save',
    method: 'POST',
    data: data
  })
}

// 编辑信息
export function updateTableItem (data) {
  return request({
    url: '/canteen/table/update',
    method: 'POST',
    data: data
  })
}

// 删除信息
export function deleteTableItem (id) {
  return request({
    url: '/canteen/table/delete',
    method: 'POST',
    data: {
      id
    }
  })
}
