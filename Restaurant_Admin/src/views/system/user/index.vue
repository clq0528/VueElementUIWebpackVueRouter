<template>
  <div class="main-wrap">
    <!--操作栏-->
    <div class="action-bar">
      <!--操作按钮-->
      <div class="left-bar">
        <el-button type="primary" icon="el-icon-plus" @click="openWindow('add')" v-auth="{code: 'SYSTEM_USER_CREATE'}">新增</el-button>
      </div>
      <!--操作按钮-->
      <!--搜索栏-->
      <div class="right-bar">
        <el-form :inline="true" :model="searchData" ref="searchData">
          <el-form-item prop="userAccount">
            <el-input v-model="searchData.userAccount" placeholder="登录账号" @change="pageChangeList" @keyup.enter.native="pageChangeList"></el-input>
          </el-form-item>
          <el-form-item prop="userName">
            <el-input v-model="searchData.userName" placeholder="用户姓名" @change="pageChangeList" @keyup.enter.native="pageChangeList"></el-input>
          </el-form-item>
          <el-form-item prop="userPhone">
            <el-input v-model="searchData.userPhone" placeholder="手机号码" @change="pageChangeList" @keyup.enter.native="pageChangeList"></el-input>
          </el-form-item>
          <el-form-item prop="userType">
            <el-select v-model="searchData.userType" placeholder="账号类型" clearable @change="pageChangeList">
              <el-option label="超级管理员" value="1"></el-option>
              <el-option label="总店管理员" value="2"></el-option>
              <el-option label="分店管理员" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="userStatus">
            <el-select v-model="searchData.userStatus" placeholder="账号状态" clearable @change="pageChangeList">
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
      <el-table :data="tableData" ref="tableData" height="100%" fit v-loading="loading" v-auth="{code: 'SYSTEM_USER_INFO'}">
        <!--<el-table-column type="selection" width="55"></el-table-column>-->
        <el-table-column label="账号类型" prop="userType" align="center">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.userType === '1'">超级管理员</el-tag>
            <el-tag type="danger" v-if="scope.row.userType === '2'">总店管理员</el-tag>
            <el-tag v-if="scope.row.userType === '3'">分店管理员</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="登录账号" prop="userAccount" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column label="用户姓名" prop="userName" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column label="手机号码" prop="userPhone" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column label="电子邮箱" prop="userMail" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column label="用户角色" prop="roleNames" show-overflow-tooltip align="center">
          <template slot-scope="scope">
            {{scope.row.roleNames || '-'}}
          </template>
        </el-table-column>
        <el-table-column label="账号状态" prop="userStatus" align="center">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.userStatus === 'Y'">已启用</el-tag>
            <el-tag type="danger" v-if="scope.row.userStatus === 'N'">已停用</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="220" align="center">
          <template slot-scope="scope">
            <el-button type="text" icon="el-icon-edit-outline" plain @click="openWindow('edit', scope.row)" v-auth="{code: 'SYSTEM_USER_UPDATE'}">編辑</el-button>
            <el-button type="text" icon="el-icon-bell" plain @click="openWindow('auth', scope.row)" v-auth="{code: 'SYSTEM_USER_AUTH'}">授权</el-button>
            <el-button type="text " icon="el-icon-delete" plain @click="delItem(scope.row.id)" v-auth="{code: 'SYSTEM_USER_DELETE'}">删除</el-button>
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
      :headOptions="headOptions"
      @on-opened-change="hideWindow">
    </add-form>

    <!--编辑弹出窗-->
    <edit-form
      :opened="opened.edit"
      :headOptions="headOptions"
      :itemData="opened.itemData"
      @on-opened-change="hideWindow">
    </edit-form>

    <!--授权弹出窗-->
    <auth-form
      :opened="opened.auth"
      :itemData="opened.itemData"
      @on-opened-change="hideWindow">
    </auth-form>

  </div>
</template>

<script>
import addForm from './add.vue'
import editForm from './edit.vue'
import authForm from './auth.vue'
import { getSystemUserList, deleteSystemUserItem } from '@/api/systemUser'
import { getHeadquarterOptions } from '@/api/headquarters'
import { formatTime } from '@/utils/index'
export default {
  components: {
    addForm,
    editForm,
    authForm
  },
  created () {
    this.getList()
    this.getHeadOptions()
  },
  data () {
    return {
      loading: true,
      searchData: {
        userAccount: null,
        userName: null,
        userPhone: null,
        userType: null,
        userStatus: null
      },
      headOptions: [],
      tableData: [],
      page: parseInt(this.$route.query.page) || 1,
      pageSize: 30,
      total: 0,
      opened: {
        add: false,
        edit: false,
        auth: false,
        itemData: null
      }
    }
  },
  methods: {
    // 获取总店下拉
    getHeadOptions () {
      getHeadquarterOptions().then(res => {
        this.headOptions = res.data.result.map(v => {
          this.$set(v, 'value', v.id)
          this.$set(v, 'label', v.name)
          this.$set(v, 'children', [])
          return v
        })
      })
    },
    // 获取列表
    getList () {
      setTimeout(() => {
        getSystemUserList({
          userAccount: this.searchData.userAccount,
          userName: this.searchData.userName,
          userPhone: this.searchData.userPhone,
          userType: this.searchData.userType,
          userStatus: this.searchData.userStatus,
          offset: this.page,
          limit: this.pageSize
        }).then(res => {
          this.loading = false
          this.tableData = res.data.result.map(v => {
            let roleName = []
            v.roleList.map(vv => {
              roleName.push(vv.roleName)
            })
            this.$set(v, 'roleNames', roleName.join('、'))
            return v
          })
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
        deleteSystemUserItem(id).then(() => {
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
