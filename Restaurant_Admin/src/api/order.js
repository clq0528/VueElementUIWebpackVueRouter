import request from '@/utils/request'

// 获取列表
export function getOrderList (data) {
  return request({
    url: '/canteen/order/list',
    method: 'POST',
    data: data
  })
}

// 删除订单
export function cancelOrderItem (orderId) {
  return request({
    url: '/canteen/order/update',
    method: 'POST',
    data: {
      orderId
    }
  })
}
