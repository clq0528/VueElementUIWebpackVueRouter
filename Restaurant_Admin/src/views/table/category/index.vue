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
          <el-form-item prop="branchId" v-if="$store.getters.userType === '1'">
            <el-select v-model="searchData.branchId" placeholder="所属分店" clearable @change="pageChangeList">
              <el-option v-for="(item, index) in canteenOptions" :key="index" :label="item.description" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="name">
            <el-input v-model="searchData.name" placeholder="类型名称" @change="pageChangeList" @keyup.enter.native="pageChangeList"></el-input>
          </el-form-item>
          <el-form-item prop="status">
            <el-select v-model="searchData.status" placeholder="类型状态" clearable @change="pageChangeList">
              <el-option label="启用" value="Y"></el-option>
              <el-option label="停用" value="N"></el-option>
            </el-select>
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
        <el-table-column label="类型名称" prop="name" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column label="餐桌人数" prop="number" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column label="类型描述" prop="description" show-overflow-tooltip align="center">
          <template slot-scope="scope">
            {{scope.row.description || "-"}}
          </template>
        </el-table-column>
        <el-table-column label="类型状态" prop="status" align="center">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.status === 'Y'">已启用</el-tag>
            <el-tag type="danger" v-if="scope.row.status === 'N'">已停用</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="220" align="center">
          <template slot-scope="scope">
            <el-button type="text" icon="el-icon-edit-outline" plain @click="openWindow('edit', scope.row)">編辑</el-button>
            <el-button type="text " icon="el-icon-delete" plain @click="delItem(scope.row.id)">删除</el-button>
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
      :canteenOptions="canteenOptions"
      @on-opened-change="hideWindow">
    </add-form>

    <!--编辑弹出窗-->
    <edit-form
      :opened="opened.edit"
      :canteenOptions="canteenOptions"
      :itemData="opened.itemData"
      @on-opened-change="hideWindow"></edit-form>

  </div>
</template>

<script>
import addForm from './add.vue'
import editForm from './edit.vue'
import { getTableCategoryList, deleteTableCategoryItem } from '@/api/table'
import { getBranchOptions } from '@/api/branch'
import { formatTime } from '@/utils/index'
export default {
  components: {
    addForm,
    editForm
  },
  created () {
    this.getList()
    this.getBranchOptions()
  },
  data () {
    return {
      loading: true,
      searchData: {
        branchId: null,
        name: null,
        status: null
      },
      canteenOptions: [],
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
        this.canteenOptions = res.data.result
      })
    },
    // 获取列表
    getList () {
      setTimeout(() => {
        getTableCategoryList({
          branchId: this.searchData.branchId,
          name: this.searchData.name,
          status: this.searchData.status,
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
    // 删除信息
    delItem (id) {
      console.log(id)
      this.$confirm('是否删除该信息？', '提示', {
        type: 'warning'
      }).then(() => {
        deleteTableCategoryItem(id).then(() => {
          this.getList()
          this.$message.success({message: '删除成功', duration: 1500})
        })
      })
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
    },
    // 时间戳转时间格式
    formatTime (val) {
      return formatTime(val)
    }
  }
}
</script>
