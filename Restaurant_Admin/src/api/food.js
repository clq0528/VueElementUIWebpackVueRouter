import request from '@/utils/request'

// 获取类型列表
export function getFoodCategoryList (data) {
  return request({
    url: '/canteen/productCategory/list',
    method: 'POST',
    data: data
  })
}

// 添加类型信息
export function insertFoodCategoryItem (data) {
  return request({
    url: '/canteen/productCategory/save',
    method: 'POST',
    data: data
  })
}

// 编辑类型信息
export function updateFoodCategoryItem (data) {
  return request({
    url: '/canteen/productCategory/update',
    method: 'POST',
    data: data
  })
}

// 删除类型信息
export function deleteFoodCategoryItem (id) {
  return request({
    url: '/canteen/productCategory/delete',
    method: 'POST',
    data: {
      id
    }
  })
}

// 获取分类下拉列表
export function getFoodCategoryOptions () {
  return request({
    url: '/canteen/productCategory/options',
    method: 'POST'
  })
}

// 获取列表
export function getFoodList (data) {
  return request({
    url: '/canteen/product/list',
    method: 'POST',
    data: data
  })
}

// 添加信息
export function insertFoodItem (data) {
  return request({
    url: '/canteen/product/save',
    method: 'POST',
    data: data
  })
}

// 编辑信息
export function updateFoodItem (data) {
  return request({
    url: '/canteen/product/update',
    method: 'POST',
    data: data
  })
}

// 删除信息
export function deleteFoodItem (id) {
  return request({
    url: '/canteen/product/delete',
    method: 'POST',
    data: {
      id
    }
  })
}

// 获取下拉
export function getFoodOptions () {
  return request({
    url: '/canteen/product/options',
    method: 'POST'
  })
}

// 获取规格类型列表
export function getFoodSpecCategoryList (data) {
  return request({
    url: '/canteen/specCategory/list',
    method: 'POST',
    data: data
  })
}

// 添加规格类型信息
export function insertFoodSpecCategoryItem (data) {
  return request({
    url: '/canteen/specCategory/save',
    method: 'POST',
    data: data
  })
}

// 编辑规格类型信息
export function updateFoodSpecCategoryItem (data) {
  return request({
    url: '/canteen/specCategory/update',
    method: 'POST',
    data: data
  })
}

// 删除规格类型信息
export function deleteFoodSpecCategoryItem (id) {
  return request({
    url: '/canteen/specCategory/delete',
    method: 'POST',
    data: {
      id
    }
  })
}

// 获取分类下拉列表
export function getFoodSpecCategoryOptions () {
  return request({
    url: '/canteen/specCategory/options',
    method: 'POST'
  })
}

// 规格列表
export function getSpecList (productId) {
  return request({
    url: '/canteen/spec/list',
    method: 'POST',
    data: {
      productId
    }
  })
}

// 新增规格
export function insertSpecItem (data) {
  return request({
    url: '/canteen/spec/save',
    method: 'POST',
    data: data
  })
}

// 编辑规格
export function updateSpecItem (data) {
  return request({
    url: '/canteen/spec/update',
    method: 'POST',
    data: data
  })
}

// 删除规格
export function deleteSpecItem (id) {
  return request({
    url: '/canteen/spec/delete',
    method: 'POST',
    data: {
      id
    }
  })
}

// 导入菜品
export function importFoodData (data) {
  return request({
    url: '/canteen/product/importExcel',
    method: 'POST',
    data: data
  })
}

// 导出菜品
export function exportFoodData () {
  return request({
    url: '/canteen/product/exportExcel',
    method: 'GET'
  })
}
