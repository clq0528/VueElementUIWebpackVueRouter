<template>
  <div class="main-wrap">
    <!--操作栏-->
    <div class="action-bar">
      <!--操作按钮-->
      <div class="left-bar">
        <el-button type="primary" icon="el-icon-plus" @click="openWindow('add')">新增</el-button>
      </div>
      <el-button-group>
        <el-button @click="importExcel">导入</el-button>
        <el-button @click="exportExcel">导出</el-button>
      </el-button-group>
      <input
        ref="importDOM"
        type="file"
        @change="importExl"
        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        style="display:none;">
      <!--操作按钮-->
      <!--搜索栏-->
      <div class="right-bar">
        <el-form :inline="true" :model="searchData" ref="searchData">
          <el-form-item prop="name">
            <el-input v-model="searchData.name" placeholder="菜品编号" @change="pageChangeList" @keyup.enter.native="pageChangeList"></el-input>
          </el-form-item>
          <el-form-item prop="description">
            <el-input v-model="searchData.description" placeholder="菜品名称" @change="pageChangeList" @keyup.enter.native="pageChangeList"></el-input>
          </el-form-item>
          <el-form-item prop="categoryId">
            <el-select v-model="searchData.categoryId" placeholder="菜品分类" clearable @change="pageChangeList">
              <el-option v-for="(item, index) in categoryOptions" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="headQuarterId" v-if="$store.getters.userType === '1'">
            <el-select v-model="searchData.headQuarterId" placeholder="所属总店" clearable @change="pageChangeList">
              <el-option v-for="(item, index) in headQuarterOptions" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
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

    <el-dialog
      class="zoom-img__box"
      title="菜品图片"
      :visible.sync="zoomImg.visible"
      append-to-body>
      <img :src="zoomImg.path">
    </el-dialog>

    <!--表格-->
    <div class="table-wrap">
      <!--表格-->
      <el-table :data="tableData" ref="tableData" height="100%" fit v-loading="loading" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="图片" width="60" prop="icon" align="center">
          <template slot-scope="scope">
            <img class="zoom-img__simg" :src="scope.row.icon" @click="zoomImage(scope.row.icon)">
          </template>
        </el-table-column>
        <el-table-column label="菜品编号" prop="name" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column label="菜品名称" prop="description" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column label="菜品分类" prop="categoryName" show-overflow-tooltip align="center"></el-table-column>
        <!--<el-table-column label="菜品描述" prop="description" show-overflow-tooltip></el-table-column>-->
        <el-table-column label="菜品价格(￥)" prop="price" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column label="菜品库存" prop="stock" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column label="标准单位" prop="unitName" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column label="所属总店" prop="headQuarterName" show-overflow-tooltip align="center" v-if="$store.getters.userType === '1'"></el-table-column>
        <el-table-column label="状态" prop="status" align="center">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.status === 'Y'">已启用</el-tag>
            <el-tag type="danger" v-if="scope.row.status === 'N'">已停用</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="220" align="center">
          <template slot-scope="scope">
            <el-button type="text" icon="el-icon-plus" plain @click="openWindow('addSpec', scope.row)">规格明细</el-button>
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
      :categoryOptions="categoryOptions"
      :headQuarterOptions="headQuarterOptions"
      :unitOptions="unitOptions"
      @on-opened-change="hideWindow"></add-form>

    <!--编辑弹出窗-->
    <edit-form
      :opened="opened.edit"
      :categoryOptions="categoryOptions"
      :headQuarterOptions="headQuarterOptions"
      :unitOptions="unitOptions"
      :itemData="opened.itemData"
      @on-opened-change="hideWindow"></edit-form>

    <!--新增弹出窗-->
    <add-spec-form
      :opened="opened.addSpec"
      :itemData="opened.itemData"
      @on-opened-change="hideWindow"></add-spec-form>

  </div>
</template>

<script>
import addForm from './add.vue'
import editForm from './edit.vue'
import addSpecForm from './addSpec.vue'
import { getFoodList, deleteFoodItem, getFoodCategoryOptions, importFoodData } from '@/api/food'
import { getHeadquarterOptions } from '@/api/headquarters'
import { getUnitOptions } from '@/api/unit'
export default {
  components: {
    addForm,
    editForm,
    addSpecForm
  },
  created () {
    this.getList()
    this.getCategoryOptions()
    this.getHeadQuarterOptions()
    this.getUnitOptions()
    // this.funcarr()
  },
  data () {
    return {
      loading: true,
      zoomImg: {
        visible: false,
        path: ''
      },
      searchData: {
        name: null,
        description: null,
        headQuarterId: null,
        categoryId: null,
        status: null
      },
      categoryOptions: [],
      headQuarterOptions: [],
      unitOptions: [],
      selectData: [],
      tableData: [],
      page: 1,
      pageSize: 30,
      total: 0,
      opened: {
        add: false,
        edit: false,
        addSpec: false,
        itemData: null
      }
    }
  },
  methods: {
    // 获取类型下拉选项
    getCategoryOptions () {
      getFoodCategoryOptions().then(res => {
        this.categoryOptions = res.data.result
      })
    },
    // 获取总店下拉选项
    getHeadQuarterOptions () {
      getHeadquarterOptions().then(res => {
        this.headQuarterOptions = res.data.result
      })
    },
    // 获取单位下拉选项
    getUnitOptions () {
      getUnitOptions().then(res => {
        this.unitOptions = res.data.result
      })
    },
    // 获取列表
    getList () {
      setTimeout(() => {
        getFoodList({
          name: this.searchData.name,
          headQuarterId: this.searchData.headQuarterId,
          categoryId: this.searchData.categoryId,
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
        deleteFoodItem(id).then(() => {
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
    // 放大图片
    zoomImage (path) {
      this.zoomImg.visible = true
      this.zoomImg.path = path
    },
    // 导入
    importExcel () {
      this.$refs.importDOM.value = null
      this.$refs.importDOM.click()
    },
    // 导入
    importExl () {
      let importDOM = this.$refs.importDOM
      let file = importDOM.files[0]
      this.$confirm('是否导入信息？', '提示', {
        type: 'warning'
      }).then(() => {
        this.loading = true
        const formData = new FormData()
        formData.append('file', file)
        importFoodData(formData).then(() => {
          this.getList()
          this.$message.success({message: '导入成功', duration: 1500})
          this.loading = false
          importDOM.value = null
        }).catch(() => {
          this.loading = false
          importDOM.value = null
        })
      })
    },
    // 导出
    exportExcel () {
      this.$confirm('是否导出信息？', '提示', {
        type: 'warning'
      }).then(() => {
        if (this.selectData.length > 0) {
          this.createExcel(this.selectData)
        } else {
          getFoodList({
            name: this.searchData.name,
            categoryId: this.searchData.categoryId,
            status: this.searchData.status,
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
      let title = '菜品信息' + date.getFullYear() + (date.getMonth() + 1) + date.getDate() + date.getHours() + date.getMinutes() + date.getSeconds()
      require.ensure([], () => {
        const { exportJsonToExcel } = require('vendor/Export2Excel')
        const tHeader = ['菜品ID', '菜品图片', '菜品编号', '菜品名称', '菜品分类ID', '菜品分类', '菜品价格(￥)', '菜品库存', '标准单位', '状态', '创建时间', '修改时间']
        const filterVal = ['id', 'icon', 'name', 'description', 'categoryId', 'categoryName', 'price', 'stock', 'unitName', 'status', 'createTime', 'updateTime']
        const data = exportData.map(v => filterVal.map(j => v[j]))
        exportJsonToExcel(tHeader, data, title)
      })
    },
    // 获取选择列表
    handleSelectionChange (val) {
      this.selectData = val
    },
    funcarr () {
      let arr = [
        {
          categoryId: 1,
          categoryName: '分量',
          child: [
            {id: 1, name: '大份'},
            {id: 2, name: '中份'},
            {id: 3, name: '小份'}
          ]
        }, {
          categoryId: 2,
          categoryName: '酱汁',
          child: [
            {id: 4, name: '咖喱汁'},
            {id: 5, name: '黑椒汁'},
            {id: 6, name: '番茄汁'}
          ]
        }, {
          categoryId: 3,
          categoryName: '口味',
          child: [
            {id: 7, name: '微辣'},
            {id: 8, name: '超辣'}
          ]
        }
      ]
      let sarr = [[]]
      for (let i = 0; i < arr.length; i++) {
        let tarr = []
        for (let j = 0; j < sarr.length; j++) {
          for (let k = 0; k < arr[i].child.length; k++) {
            tarr.push(sarr[j].concat({
              id: arr[i].child[k].id,
              name: arr[i].child[k].name,
              categoryId: arr[i].categoryId,
              categoryName: arr[i].categoryName
            }))
          }
        }
        sarr = tarr
      }
      console.log(sarr)
    }
  }
}
</script>
