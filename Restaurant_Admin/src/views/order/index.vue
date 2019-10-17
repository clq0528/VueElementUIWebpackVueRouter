<template>
  <div class="main-wrap">
    <!--操作栏-->
    <div class="action-bar">
      <!--操作按钮-->
      <div class="left-bar">
        <ul class="order-status__tags">
          <li
            :class="(searchData.orderStatus == item.status)?'is-active':''"
            v-for="(item, index) in orderStatusArr"
            :key="index"
            @click="changeOrderStatus(item.status)">
            {{item.name}}
          </li>
        </ul>
      </div>
      <!--操作按钮-->
      <!--搜索栏-->
      <div class="right-bar">
        <el-form :inline="true" :model="searchData" ref="searchData">
          <el-form-item prop="orderId">
            <el-input v-model="searchData.orderId" placeholder="订单号" @change="pageChangeList" @keyup.enter.native="pageChangeList"></el-input>
          </el-form-item>
          <el-form-item prop="orderTime" style="max-width:none;">
            <el-date-picker
              style="width:350px;"
              v-model="searchData.orderTime"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd HH:mm:ss"
              @change="pageChangeList">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-refresh" @click="pageChangeList(1, true)">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!--搜索栏-->
    </div>
    <!--操作栏-->

    <!--表格-->
    <div class="table-wrap">
      <!--表格-->
      <el-table :data="tableData" ref="tableData" height="100%" fit v-loading="loading">
        <!--<el-table-column type="selection" width="50"></el-table-column>-->
        <el-table-column label="订单状态" prop="orderStatus" align="center">
          <template slot-scope="scope">
            <el-tag type="warning" v-if="scope.row.orderStatus === 10">进行中</el-tag>
            <el-tag type="danger" v-if="scope.row.orderStatus === 20">已取消</el-tag>
            <el-tag type="success" v-if="scope.row.orderStatus === 30">已完成</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="支付状态" prop="tradeStatus" align="center">
          <template slot-scope="scope">
            <el-tag type="warning" v-if="scope.row.tradeStatus === 'W'">等待付款</el-tag>
            <el-tag type="success" v-if="scope.row.tradeStatus === 'Y'">交易完成</el-tag>
            <el-tag type="danger" v-if="scope.row.tradeStatus === 'N'">交易关闭</el-tag>
            <el-tag type="info" v-if="scope.row.tradeStatus === 'F'">交易异常</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="下单时间" prop="createTime" show-overflow-tooltip align="center" width="160">
          <template slot-scope="scope">
            {{formatTime(scope.row.createTime) || '-'}}
          </template>
        </el-table-column>
        <el-table-column label="订单编号" prop="orderId" show-overflow-tooltip align="center" width="160">
          <template slot-scope="scope">
            <a :href="'#/order/detail?orderId=' + scope.row.orderId" target="_blank">{{scope.row.orderId || '-'}}</a>
          </template>
        </el-table-column>
        <el-table-column label="订单总金额(￥)" prop="orderAmount" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column label="餐桌名称" prop="tableName" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column label="用餐人数" prop="userNum" show-overflow-tooltip align="center">
          <template slot-scope="scope">
            {{scope.row.userNum || '-'}}
          </template>
        </el-table-column>
        <!--<el-table-column label="菜品数量" prop="productQuantity" show-overflow-tooltip align="center"></el-table-column>-->
        <el-table-column label="操作" width="160" align="center">
          <template slot-scope="scope">
            <el-button
              icon="el-icon-close"
              :type="(scope.row.tradeStatus !== 'Y') ? 'info' : 'danger'"
              :disabled="scope.row.tradeStatus !== 'Y'"
              @click="cancelOrder(scope.row.orderId)"
              plain>取消订单</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--表格-->
      <!--分页-->
      <div class="page-bar">
        <el-pagination
          layout="prev, pager, next"
          :current-page="page"
          :page-size="pageSize"
          :total="total"
          @current-change="pageCurrentChange">
        </el-pagination>
      </div>
      <!--分页-->
    </div>
    <!--表格-->

  </div>
</template>

<script>
import { getOrderList, cancelOrderItem } from '@/api/order'
import { formatTime } from '@/utils/index'
export default {
  created () {
    this.getList()
  },
  data () {
    return {
      loading: true,
      searchData: {
        orderId: null,
        orderTime: null,
        orderStatus: null
      },
      tableData: [],
      page: 1,
      pageSize: 30,
      total: 0,
      orderStatusArr: [
        {name: '全部订单', status: null},
        {name: '进行中', status: 10},
        {name: '已取消', status: 20},
        {name: '已完成', status: 30}
      ],
      deliverTypes: [
        {name: '内用', type: 1},
        {name: '外卖', type: 2},
        {name: '自提', type: 3},
        {name: '外带', type: 4}
      ]
    }
  },
  methods: {
    // 获取列表
    getList () {
      let params = {
        orderId: this.searchData.orderId,
        orderStatus: this.searchData.orderStatus,
        startTime: (this.searchData.orderTime && this.searchData.orderTime.length > 0) ? this.searchData.orderTime[0] : null,
        endTime: (this.searchData.orderTime && this.searchData.orderTime.length > 0) ? this.searchData.orderTime[1] : null,
        offset: this.page,
        limit: this.pageSize
      }
      setTimeout(() => {
        getOrderList(params).then(res => {
          this.loading = false
          this.tableData = res.data.result
          this.total = res.data.total
        }).catch(() => {
          this.loading = false
        })
      }, 500)
    },
    // 取消订单
    cancelOrder (orderId) {
      this.$confirm('是否要取消该订单？', '提示', {
        type: 'warning'
      }).then(() => {
        cancelOrderItem(orderId).then(() => {
          this.getList()
          this.$message.success({message: '取消成功', duration: 1500})
        })
      })
    },
    // 更换页面
    pageChangeList (page, reset) {
      this.loading = true
      this.page = parseInt(page) || 1
      if (reset) {
        this.$refs.searchData.resetFields()
        this.searchData.orderStatus = null
      }
      this.getList()
    },
    // 獲取页数
    pageCurrentChange (page) {
      this.pageChangeList(page)
    },
    // 打开窗口
    openWindow (name, row) {
      this.opened[name] = !this.opened[name]
      if (row && typeof row !== 'undefined') {
        this.opened.itemData = row
      }
    },
    // 关闭窗口
    hideWindow (obj) {
      this.opened[obj.key] = obj.state
      if (!obj.state) this.getList()
    },
    // 时间戳转时间格式
    formatTime (val) {
      return formatTime(val)
    },
    // 切换状态
    changeOrderStatus (status) {
      this.searchData.orderStatus = status
      this.pageChangeList()
    }
  }
}
</script>
