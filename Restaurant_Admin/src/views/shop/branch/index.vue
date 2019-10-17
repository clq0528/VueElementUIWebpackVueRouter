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
          <el-form-item prop="headId" v-if="$store.getters.userType === '1'">
            <el-select v-model="searchData.headId" placeholder="所属总店" clearable @change="getSearchList" v-if="$store.getters.userType === '1'">
              <el-option v-for="(item, index) in options" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="name">
            <el-input v-model="searchData.name" placeholder="分店编号" @change="getSearchList" @keyup.enter.native="getSearchList"></el-input>
          </el-form-item>
          <el-form-item prop="status">
            <el-select v-model="searchData.status" placeholder="状态" clearable @change="getSearchList">
              <el-option label="启用" value="Y"></el-option>
              <el-option label="停用" value="N"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-refresh" @click="resetSearchForm">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!--搜索栏-->
    </div>
    <!--操作栏-->

    <!--表格-->
    <div class="table-wrap" v-loading="loading">
      <!--表格-->
      <el-table :data="tableData" ref="tableData" height="100%" fit v-show="!loading">
        <!--<el-table-column type="selection" width="55"></el-table-column>-->
        <el-table-column label="分店编号" prop="name" show-overflow-tooltip></el-table-column>
        <el-table-column label="分店名称" prop="description" show-overflow-tooltip></el-table-column>
        <el-table-column label="分店地址" prop="address" show-overflow-tooltip>
          <template slot-scope="scope">
            {{scope.row.provinceName + scope.row.cityName + scope.row.districtName + scope.row.address}}
          </template>
        </el-table-column>
        <el-table-column label="联系人" prop="contacts" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column label="电话号码" prop="telephone" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column label="手机号码" prop="mobile" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column label="状态" prop="status" align="center">
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
      <div class="page-bar" v-show="!loading">
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
      :options="options"
      :provinceData="provinceData"
      @on-opened-change="hideWindow">
    </add-form>

    <!--编辑弹出窗-->
    <edit-form
      :opened="opened.edit"
      :options="options"
      :provinceData="provinceData"
      :itemData="opened.itemData"
      @on-opened-change="hideWindow"></edit-form>

  </div>
</template>

<script>
import addForm from './add.vue'
import editForm from './edit.vue'
import { getBranchList, deleteBranchItem } from '@/api/branch'
import { getHeadquarterOptions } from '@/api/headquarters'
import { getDistrictList } from '@/api/public'
export default {
  components: {
    addForm,
    editForm
  },
  created () {
    this.getList()
    this.getOptions()
    this.getDistOptions(null, 1)
  },
  data () {
    return {
      loading: true,
      searchData: {
        name: this.$route.query.name || null,
        headId: this.$route.query.headId || null,
        status: this.$route.query.status || null
      },
      options: [],
      tableData: [],
      page: parseInt(this.$route.query.page) || 1,
      pageSize: 30,
      total: 0,
      opened: {
        add: false,
        edit: false,
        itemData: null
      },
      provinceData: [], // 省份
      cityData: [], // 城市
      districtData: [] // 地区
    }
  },
  methods: {
    // 获取总店下拉选项
    getOptions () {
      getHeadquarterOptions().then(res => {
        this.options = res.data.result
      })
    },
    // 获取省市区列表
    getDistOptions (id, level) {
      getDistrictList(id).then(res => {
        let data = res.data.result
        switch (level) {
          case 1:
            this.provinceData = data
            break
          case 2:
            this.cityData = data
            break
          case 3:
            this.districtData = data
            break
          default:
            break
        }
      })
    },
    // 获取列表
    getList () {
      let params = {
        name: this.searchData.name,
        headId: this.searchData.headId,
        status: this.searchData.status,
        offset: this.page,
        limit: this.pageSize
      }
      setTimeout(() => {
        getBranchList(params).then(res => {
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
        deleteBranchItem(id).then(() => {
          this.getList()
          this.$message.success({message: '删除成功', duration: 1500})
        })
      })
    },
    // 獲取参数
    getRouterParams (page, searchData) {
      let params = {}
      if (page) params.page = page
      if (searchData && typeof searchData !== 'undefined') {
        for (let k in searchData) {
          if (searchData[k] && searchData[k] !== '') {
            params[k] = searchData[k].toString().trim()
          }
        }
      }
      return params
    },
    // 獲取筛选表單
    getSearchList () {
      let params = this.getRouterParams(null, this.searchData)
      this.$router.push({query: params})
    },
    // 重置筛选表單
    resetSearchForm () {
      let params = {}
      this.$router.push({query: params})
    },
    // 獲取页数
    pageCurrentChange (page) {
      let params = this.getRouterParams(page, this.searchData)
      this.$router.push({query: params})
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
