import request from '@/utils/request'

// 获取列表
export function getCanteenNewsList (data) {
  return request({
    url: '/canteen/news/list',
    method: 'POST',
    data: data
  })
}

// 添加头条
export function insertCanteenNewsItem (data) {
  return request({
    url: '/canteen/news/save',
    method: 'POST',
    data: data
  })
}

// 编辑头条
export function updateCanteenNewsItem (data) {
  return request({
    url: '/canteen/news/update',
    method: 'POST',
    data: data
  })
}

// 编辑头条
export function deleteCanteenNewsItem (id) {
  return request({
    url: '/canteen/news/delete',
    method: 'POST',
    data: {
      id
    }
  })
}
