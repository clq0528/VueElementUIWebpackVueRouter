// 判断对象是否为空
export function isEmptyObject (obj) {
  for (let key in obj) return false
  return true
}

// 转为字符串
export function getString (obj) {
  for (let k in obj) {
    if (typeof obj[k] === 'object') {
      getString(obj[k])
    } else {
      obj[k] = obj[k].toString()
    }
  }
  return obj
}

// 判断是否为对象
export function isObject (obj) {
  return Object.prototype.toString.call(obj) === '[object Object]'
}

// 判断是否为數組
export function isArray (arr) {
  if (typeof Array.isArray === 'function') {
    return Array.isArray(arr)
  } else {
    return Object.prototype.toString.call(arr) === '[object Array]'
  }
}

// 判断是否为FormData
export function isFormData (v) {
  return Object.prototype.toString.call(v) === '[object FormData]'
}

// 筛选对象内空的元素 filter Object Value
export function filterObjEmptyValue (obj) {
  let param = {}
  if (obj === null || obj === undefined || obj === '') return param
  for (let key in obj) {
    if (typeof obj[key] === 'object' && !isEmptyObject(obj[key])) {
      param[key] = filterObjEmptyValue(obj[key])
    } else if (obj[key] !== null && obj[key] !== undefined && obj[key] !== '' && !isEmptyObject(obj[key])) {
      param[key] = obj[key]
    }
  }
  return param
}

// 时间戳 转 时间格式
export function formatTime (v) {
  if (!v) return v
  const date = new Date(v)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

// 时间戳 转 时间格式
export function formatTime2 (v) {
  if (!v) return v
  const date = new Date(v)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return [year, month, day].map(formatNumber).join('-')
}

// 1位数前面补0
export function formatNumber (n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
