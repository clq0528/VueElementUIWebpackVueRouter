import request from '@/utils/request'

export function getUserList (data) {
  return request({
    url: '/canteen/consumer/list',
    method: 'POST',
    data: data
  })
}
