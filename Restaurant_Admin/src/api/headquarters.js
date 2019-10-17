import request from '@/utils/request'

// 获取列表
export function getHeadquarterList (data) {
  return request({
    url: '/canteen/headQuarter/list',
    method: 'POST',
    data: data
  })
}

// 添加信息
export function insertHeadquarterItem (data) {
  return request({
    url: '/canteen/headQuarter/save',
    method: 'POST',
    data: data
  })
}

// 编辑信息
export function updateHeadquarterItem (data) {
  return request({
    url: '/canteen/headQuarter/update',
    method: 'POST',
    data: data
  })
}

// 删除信息
export function deleteHeadquarterItem (id) {
  return request({
    url: '/canteen/headQuarter/delete',
    method: 'POST',
    data: {
      id
    }
  })
}

// 获取下拉选项
export function getHeadquarterOptions () {
  return request({
    url: '/canteen/headQuarter/options',
    method: 'POST'
  })
}

// 查看信息
export function getHeadquarterItem (id) {
  return request({
    url: '/canteen/headQuarter/findById',
    method: 'POST',
    data: {
      id
    }
  })
}
