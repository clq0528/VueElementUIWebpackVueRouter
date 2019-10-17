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
          <el-form-item prop="aclName">
            <el-input v-model="searchData.aclName" placeholder="资源名称" @change="pageChangeList" @keyup.enter.native="pageChangeList"></el-input>
          </el-form-item>
          <el-form-item prop="aclType">
            <el-select v-model="searchData.aclType" placeholder="资源类型" clearable @change="pageChangeList">
              <el-option label="菜单" value="1"></el-option>
              <el-option label="功能" value="2"></el-option>
              <el-option label="接口" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="aclStatus">
            <el-select v-model="searchData.aclStatus" placeholder="资源状态" clearable @change="pageChangeList">
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
        <el-table-column label="排序" prop="aclSort" show-overflow-tooltip align="center" width="80"></el-table-column>
        <el-table-column label="资源类型" prop="aclType" align="center" width="80">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.aclType === '1'">菜单</el-tag>
            <el-tag type="danger" v-if="scope.row.aclType === '2'">功能</el-tag>
            <el-tag v-if="scope.row.aclType === '3'">接口</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="资源编号" prop="aclCode" show-overflow-tooltip></el-table-column>
        <el-table-column label="资源名称" prop="aclName" show-overflow-tooltip></el-table-column>
        <el-table-column label="资源类别" prop="aclCategory" show-overflow-tooltip align="center">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.aclCategory === '0'">通用资源</el-tag>
            <el-tag type="danger" v-if="scope.row.aclCategory === '1'">超管资源</el-tag>
            <el-tag type="warning" v-if="scope.row.aclCategory === '2'">总店资源</el-tag>
            <el-tag v-if="scope.row.aclCategory === '3'">分店资源</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="资源URL" prop="aclUrl" show-overflow-tooltip>
          <template slot-scope="scope">
            {{scope.row.aclUrl || '-'}}
          </template>
        </el-table-column>
        <el-table-column label="资源状态" prop="aclStatus" align="center" width="80">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.aclStatus === 'Y'">已启用</el-tag>
            <el-tag type="danger" v-if="scope.row.aclStatus === 'N'">已停用</el-tag>
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
import { getAclList, deleteAclItem } from '@/api/acl'
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
        aclName: null,
        aclType: null,
        aclStatus: null
      },
      tableData: [],
      page: 1,
      pageSize: 1000,
      total: 0,
      opened: {
        add: false,
        edit: false,
        itemData: null
      }
    }
  },
  methods: {
    // 获取列表
    getList () {
      let params = {
        aclName: this.searchData.aclName,
        aclType: this.searchData.aclType,
        aclStatus: this.searchData.aclStatus,
        offset: this.page,
        limit: this.pageSize
      }
      setTimeout(() => {
        getAclList(params).then(res => {
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
      this.$confirm('是否删除该信息？', '提示', {
        type: 'warning'
      }).then(() => {
        deleteAclItem(id).then(() => {
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
    }
  }
}
</script>
