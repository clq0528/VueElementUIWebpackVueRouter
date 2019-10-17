<template>
  <div class="main-wrap">
    <!--操作栏-->
    <div class="action-bar">
      <!--操作按钮-->
      <div class="left-bar">
        <el-button type="primary" icon="el-icon-plus" @click="visible.add = true">新增</el-button>
      </div>
      <!--操作按钮-->
      <!--搜索栏-->
      <div class="right-bar">
        <el-form :inline="true" :model="searchData" ref="searchData">
          <el-form-item prop="unitName">
            <el-input v-model="searchData.unitName" placeholder="单位名称" @change="pageChangeList" @keyup.enter.native="pageChangeList"></el-input>
          </el-form-item>
          <el-form-item prop="status">
            <el-select v-model="searchData.status" placeholder="状态" clearable @change="pageChangeList">
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
        <el-table-column label="单位名称" prop="unitName" show-overflow-tooltip></el-table-column>
        <el-table-column label="状态" prop="status" align="center">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.status === 'Y'">已启用</el-tag>
            <el-tag type="danger" v-if="scope.row.status === 'N'">已停用</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="220" align="center">
          <template slot-scope="scope">
            <el-button type="text" icon="el-icon-edit-outline" plain @click="updateItem(scope.row)">編辑</el-button>
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
      v-model="visible.add"
      @in-close="getList">
    </add-form>

    <!--编辑弹出窗-->
    <edit-form
      v-model="visible.edit"
      :itemData="visible.itemData"
      @in-close="getList">
    </edit-form>

  </div>
</template>

<script>
import addForm from './add.vue'
import editForm from './edit.vue'
import { getUnitList, deleteUnitItem } from '@/api/unit'
import { formatTime } from '@/utils/index'
export default {
  components: {
    addForm,
    editForm
  },
  created () {
    this.getList()
  },
  data () {
    return {
      loading: true,
      searchData: {
        unitName: null,
        status: null
      },
      tableData: [],
      page: 1,
      pageSize: 30,
      total: 0,
      visible: {
        add: false,
        edit: false,
        itemData: null
      }
    }
  },
  methods: {
    // 获取列表
    getList () {
      setTimeout(() => {
        getUnitList({
          unitName: this.searchData.unitName,
          status: this.searchData.status,
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
    // 删除信息
    delItem (id) {
      console.log(id)
      this.$confirm('是否删除该信息？', '提示', {
        type: 'warning'
      }).then(() => {
        deleteUnitItem(id).then(() => {
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
    updateItem (row) {
      this.visible['edit'] = true
      this.visible['itemData'] = row
    },
    // 时间戳转时间格式
    formatTime (val) {
      return formatTime(val)
    }
  }
}
</script>
