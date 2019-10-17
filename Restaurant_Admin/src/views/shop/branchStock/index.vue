<template>
  <div class="main-wrap">
    <!--操作栏-->
    <div class="action-bar">
      <!--操作按钮-->
      <div class="left-bar">
        <el-button type="primary" icon="el-icon-plus" @click="openWindow('add')">新增</el-button>
      </div>
      <!--操作按钮-->
      <!--搜索栏-->
      <div class="right-bar">
        <el-form :inline="true" :model="searchData" ref="searchData">
          <el-form-item prop="productName">
            <el-input v-model="searchData.productName" placeholder="菜品名称" @change="pageChangeList" @keyup.enter.native="pageChangeList"></el-input>
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
        <!--<el-table-column type="selection" width="55"></el-table-column>-->
        <el-table-column label="所属分店" prop="branchName" show-overflow-tooltip align="center" v-if="$store.getters.userType === '1'"></el-table-column>
        <el-table-column label="菜品名称" prop="productName" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column label="菜品库存" prop="stock" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column label="操作" width="220" align="center">
          <template slot-scope="scope">
            <el-button type="text" icon="el-icon-edit-outline" plain @click="openWindow('edit', scope.row)">更改库存</el-button>
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

    <!--新增弹出窗-->
    <add-form
      :opened="opened.add"
      :foodOptions="foodOptions"
      :branchOptions="branchOptions"
      @on-opened-change="hideWindow">
    </add-form>

    <!--编辑弹出窗-->
    <edit-form
      :opened="opened.edit"
      :itemData="opened.itemData"
      @on-opened-change="hideWindow">
    </edit-form>

  </div>
</template>

<script>
import addForm from './add.vue'
import editForm from './edit.vue'
import { getBranchStockList } from '@/api/branchStock'
import { getBranchOptions } from '@/api/branch'
import { getFoodOptions } from '@/api/food'
export default {
  components: {
    addForm,
    editForm
  },
  created () {
    this.getList()
    this.getFoodOptions()
    this.getBranchOptions()
  },
  data () {
    return {
      loading: true,
      searchData: {
        productName: null
      },
      foodOptions: [],
      branchOptions: [],
      tableData: [],
      page: 1,
      pageSize: 30,
      total: 0,
      opened: {
        add: false,
        edit: false,
        itemData: null
      }
    }
  },
  methods: {
    // 获取分店下拉选项
    getBranchOptions () {
      getBranchOptions().then(res => {
        this.branchOptions = res.data.result
      })
    },
    // 获取菜品下拉选项
    getFoodOptions () {
      getFoodOptions().then(res => {
        this.foodOptions = res.data.result
      })
    },
    // 获取列表
    getList () {
      setTimeout(() => {
        getBranchStockList({
          productName: this.searchData.productName,
          offset: this.page,
          limit: this.pageSize
        }).then(res => {
          this.loading = false
          this.tableData = res.data.result
          this.total = res.data.total
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
    }
  }
}
</script>
