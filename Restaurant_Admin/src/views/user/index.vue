<template>
  <div class="main-wrap">
    <!--操作栏-->
    <div class="action-bar">
      <!--操作按钮-->
      <div class="left-bar">
        <el-button type="primary" icon="el-icon-download" @click="exportExcel">导出</el-button>
      </div>
      <!--操作按钮-->
      <!--搜索栏-->
      <div class="right-bar">
        <el-form :inline="true" :model="searchData" ref="searchData">
          <el-form-item prop="userName">
            <el-input v-model="searchData.userName" placeholder="呢称" @change="pageChangeList" @keyup.enter.native="pageChangeList"></el-input>
          </el-form-item>
          <el-form-item prop="phone">
            <el-input v-model="searchData.phone" placeholder="手机号码" @change="pageChangeList" @keyup.enter.native="pageChangeList"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-refresh" @click="pageChangeList(1, true)">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!--搜索栏-->
    </div>
    <!--操作栏-->

    <el-dialog
      class="zoom-img__box"
      title=""
      width="130px"
      :visible.sync="zoomImg.visible"
      append-to-body>
      <img :src="zoomImg.path">
    </el-dialog>

    <!--表格-->
    <div class="table-wrap">
      <!--表格-->
      <el-table :data="tableData" ref="tableData" height="100%" fit v-loading="loading" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="头像" width="60" prop="imgUrl" align="center">
          <template slot-scope="scope">
            <img class="zoom-img__simg" :src="scope.row.imgUrl" @click="zoomImage(scope.row.imgUrl)">
          </template>
        </el-table-column>
        <el-table-column label="昵称" prop="userName" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column label="手机号码" prop="phone" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column label="详细地址" prop="address" show-overflow-tooltip align="center">
          <template slot-scope="scope">
            {{scope.row.address || '-'}}
          </template>
        </el-table-column>
        <el-table-column label="性别" prop="sex" show-overflow-tooltip align="center" width="80">
          <template slot-scope="scope">
            <el-tag type="info" v-show="scope.row.sex === null">空</el-tag>
            <el-tag v-show="scope.row.sex === 'M'">男</el-tag>
            <el-tag type="danger" v-show="scope.row.sex === 'F'">女</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="生日" prop="birthday" show-overflow-tooltip align="center" width="120">
          <template slot-scope="scope">
            {{formatTime2(scope.row.birthday) || '-'}}
          </template>
        </el-table-column>
        <el-table-column label="注册时间" prop="createTime" show-overflow-tooltip align="center">
          <template slot-scope="scope">
            {{formatTime(scope.row.createTime) || '-'}}
          </template>
        </el-table-column>
        <el-table-column label="微信OPENID" prop="openId" show-overflow-tooltip width="250"></el-table-column>
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
import { getUserList } from '@/api/user'
import { formatTime, formatTime2 } from '@/utils/index'
export default {
  created () {
    this.getList()
  },
  data () {
    return {
      loading: true,
      zoomImg: {
        visible: false,
        path: ''
      },
      searchData: {
        userName: null,
        phone: null
      },
      selectData: [],
      tableData: [],
      page: 1,
      pageSize: 30,
      total: 0
    }
  },
  methods: {
    // 获取列表
    getList () {
      setTimeout(() => {
        getUserList({
          userName: this.searchData.userName,
          phone: this.searchData.phone,
          offset: this.page,
          limit: this.pageSize
        // 请求成功
        }).then(res => {
          this.loading = false
          this.tableData = res.data.result
          this.total = res.data.total
        // 请求失败
        }).catch(() => {
          this.loading = false
        })
      }, 500)
    },
    // 更换页面
    pageChangeList (page, reset) {
      this.loading = true
      this.page = parseInt(page) || 1
      if (reset) this.$refs.searchData.resetFields()
      this.getList()
    },
    // 獲取页数
    pageCurrentChange (page) {
      this.pageChangeList(page)
    },
    // 时间戳转时间格式
    formatTime (val) {
      return formatTime(val)
    },
    // 时间戳转时间格式
    formatTime2 (val) {
      return formatTime2(val)
    },
    // 放大图片
    zoomImage (path) {
      this.zoomImg.visible = true
      this.zoomImg.path = path
    },
    // 获取选择列表
    handleSelectionChange (val) {
      this.selectData = val
    },
    // 导出
    exportExcel () {
      this.$confirm('是否导出会员信息？', '提示', {
        type: 'warning'
      }).then(() => {
        if (this.selectData.length > 0) {
          this.createExcel(this.selectData)
        } else {
          getUserList({
            userName: this.searchData.userName,
            phone: this.searchData.phone,
            offset: 1,
            limit: this.total
          }).then(res => {
            this.createExcel(res.data.result)
          })
        }
      })
    },
    // 生成excel
    createExcel (exportData) {
      let date = new Date()
      let title = '会员信息' + date.getFullYear() + (date.getMonth() + 1) + date.getDate() + date.getHours() + date.getMinutes() + date.getSeconds()
      require.ensure([], () => {
        const { exportJsonToExcel } = require('vendor/Export2Excel')
        const tHeader = ['会员ID', '头像', '昵称', '手机号码', '详细地址', '性别', '生日', '注册时间', '微信OPENID']
        const filterVal = ['id', 'imgUrl', 'userName', 'phone', 'address', 'sex', 'birthday', 'createTime', 'openId']
        const data = exportData.map(v => filterVal.map(j => v[j]))
        exportJsonToExcel(tHeader, data, title)
      })
    }
  }
}
</script>
