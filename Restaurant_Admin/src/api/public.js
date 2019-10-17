import request from '@/utils/request'

// 上传图片
export function uploadFile (data) {
  return request({
    url: '/canteen/product/fileUpload',
    method: 'POST',
    timeout: 60000 * 30,
    data: data
  })
}

// 删除图片
export function deleteFile (filePath) {
  return request({
    url: '/canteen/product/fileDel',
    method: 'POST',
    data: {
      filePath
    }
  })
}

// 获取行政区域
export function getDistrictList (id) {
  return request({
    url: '/canteen/branch/httpGet',
    method: 'POST',
    params: {
      id
    }
  })
}
