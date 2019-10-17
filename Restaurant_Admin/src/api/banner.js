import request from '@/utils/request'

// 获取列表
export function getBannerList (data) {
  return request({
    url: '/canteen/banner/list',
    method: 'POST',
    data: data
  })
}

// 新增信息
export function insertBannerItem (data) {
  return request({
    url: '/canteen/banner/save',
    method: 'POST',
    data: data
  })
}

// 编辑信息
export function updateBannerItem (data) {
  return request({
    url: '/canteen/banner/update',
    method: 'POST',
    data: data
  })
}

// 删除信息
export function deleteBannerItem (id) {
  return request({
    url: '/canteen/banner/delete',
    method: 'POST',
    data: {
      id
    }
  })
}
