import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
const layout = _import('layout/layout')

Vue.use(Router)

export default new Router({
  routes: [
    { path: '*', redirect: '/error/404' },
    { path: '/error/:status', name: 'Error', component: _import('error/error'), meta: {title: '无效访问'} },
    { path: '/login', name: 'Login', component: _import('login/index'), meta: {title: '账号登录'} },
    {
      path: '/',
      component: layout,
      redirect: '/index',
      children: [
        {path: 'index', name: 'Index', component: _import('index/index'), meta: {title: '欢迎回来'}}
      ]
    }, {
      path: '/system',
      component: layout,
      children: [
        {path: 'user', name: 'SystemUser', component: _import('system/user/index'), meta: {title: '用户管理', role: 'SYSTEM_USER', isTab: true}},
        {path: 'role', name: 'SystemRole', component: _import('system/role/index'), meta: {title: '角色管理', role: 'SYSTEM_ROLE', isTab: true}},
        {path: 'acl', name: 'SystemAcl', component: _import('system/acl/index'), meta: {title: '资源管理', role: 'SYSTEM_ACL', isTab: true}}
      ]
    }, {
      path: '/shop',
      component: layout,
      children: [
        {path: 'headQuarters', name: 'HeadQuarters', component: _import('shop/headQuarters/index'), meta: {title: '总店管理', role: 'SHOP_HEADQUARTERS', isTab: true}},
        {path: 'branch', name: 'Branch', component: _import('shop/branch/index'), meta: {title: '分店管理', role: 'SHOP_BRANCH', isTab: true}},
        {path: 'branchStock', name: 'BranchStock', component: _import('shop/branchStock/index'), meta: {title: '库存管理', role: 'SHOP_STOCK', isTab: true}},
        {path: 'news', name: 'News', component: _import('news/index'), meta: {title: '头条管理', role: 'SHOP_NEWS', isTab: true}},
        {path: 'banner', name: 'Banner', component: _import('banner/index'), meta: {title: '轮播图管理', role: 'SHOP_BANNER', isTab: true}}
      ]
    }, {
      path: '/table',
      component: layout,
      children: [
        {path: 'category', name: 'TableCategory', component: _import('table/category/index'), meta: {title: '餐桌类型', role: 'TABLE_CATEGORY', isTab: true}},
        {path: 'index', name: 'TableIndex', component: _import('table/index/index'), meta: {title: '餐桌信息', role: 'TABLE_INDEX', isTab: true}}
      ]
    }, {
      path: '/food',
      component: layout,
      children: [
        {path: 'category', name: 'FoodCategory', component: _import('food/category/index'), meta: {title: '菜品分类', role: 'FOOD_CATEGORY', isTab: true}},
        {path: 'index', name: 'FoodIndex', component: _import('food/index/index'), meta: {title: '菜品信息', role: 'FOOD_INDEX', isTab: true}},
        {path: 'specCategory', name: 'SpecCategory', component: _import('food/specCategory/index'), meta: {title: '规格类型', role: 'SYSTEMPARAMS_SPEC_CATEGORY', isTab: true}},
        {path: 'unit', name: 'Unit', component: _import('food/unit/index'), meta: {title: '单位信息', role: 'SYSTEMPARAMS_UNIT', isTab: true}}
      ]
    }, {
      path: '/order',
      component: layout,
      children: [
        {path: 'index', name: 'Order', component: _import('order/index'), meta: {title: '订单信息', role: 'ORDER_INDEX', isTab: true}}
      ]
    }, {
      path: '/order/detail',
      name: 'OrderDetail',
      component: _import('order/detail')
    }, {
      path: '/user',
      component: layout,
      children: [
        {path: 'index', name: 'User', component: _import('user/index'), meta: {title: '会员信息', role: 'USER_INDEX', isTab: true}}
      ]
    }
  ]
})
