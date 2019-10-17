<template>
  <div>
    <el-dialog
      class="form-dialog"
      title="规格明细"
      width="500px"
      :visible.sync="openedStatus">
      <el-form
        :model="formData"
        :rules="formRules"
        ref="formData"
        label-position="left"
        label-width="100px"
        :inline-message="true"
        :show-message="false"
        status-icon>

        <div class="form-dialog-block" v-loading="loading">
          <div class="table-wrap" style="width:100%; height:200px; margin:0; border:0;">
            <el-table :data="tableData" ref="tableData" height="100%" fit v-show="!loading">

              <el-table-column label="规格类别" prop="categoryName" show-overflow-tooltip align="center">
                <template slot-scope="scope">
                  <el-select
                    v-show="scope.row.edit"
                    v-model="scope.row.specId"
                    placeholder="请选择"
                    style="width:100%; text-align:center;"
                    clearable>
                    <el-option v-for="(item, index) in specOptions" :key="index" :label="item.name" :value="item.id"></el-option>
                  </el-select>
                  <span v-show="!scope.row.edit">{{ scope.row.categoryName }}</span>
                </template>
              </el-table-column>

              <el-table-column label="规格名称" prop="specName" show-overflow-tooltip align="center">
                <template slot-scope="scope">
                  <el-input
                    placeholder="规格名称"
                    v-show="scope.row.edit"
                    v-model="scope.row.specName"
                    style="text-align:center;"
                    :maxlength="32">
                  </el-input>
                  <span v-show="!scope.row.edit">{{ scope.row.specName }}</span>
                </template>
              </el-table-column>

              <el-table-column label="变动价格(￥)" prop="specPrice" show-overflow-tooltip align="center">
                <template slot-scope="scope">
                  <el-input
                    placeholder="价格(￥)"
                    v-show="scope.row.edit"
                    v-model="scope.row.specPrice"
                    style="text-align:center;"
                    :maxlength="32">
                  </el-input>
                  <span v-show="!scope.row.edit">{{ scope.row.specPrice }}</span>
                </template>
              </el-table-column>

              <!--<el-table-column label="状态" prop="status" align="center">-->
                <!--<template slot-scope="scope">-->
                  <!--<el-tag type="success" v-if="scope.row.status === 'Y'">已启用</el-tag>-->
                  <!--<el-tag type="danger" v-if="scope.row.status === 'N'">已停用</el-tag>-->
                <!--</template>-->
              <!--</el-table-column>-->

              <el-table-column label="操作" width="150px" align="center">
                <template slot-scope="scope">
                  <!--<el-button type="text" icon="el-icon-edit-outline" plain @click="scope.row.edit=!scope.row.edit" v-if="!scope.row.edit">编辑</el-button>-->
                  <!--<el-button type="text" icon="el-icon-edit-outline" plain @click="scope.row.edit=!scope.row.edit" v-else>完成</el-button>-->
                  <el-button type="text" icon="el-icon-delete" plain @click="delSpecItem(scope.row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>

        <div class="form-dialog-block">
          <el-form-item label="规格类别" prop="specId">
            <el-select
              v-model="formData.specId"
              placeholder="请选择"
              style="width:100%"
              @change="getCategoryChange"
              clearable>
              <el-option v-for="(item, index) in specOptions" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="规格名称" prop="specName">
            <el-input
              placeholder="请填写"
              v-model="formData.specName"
              :maxlength="32">
            </el-input>
          </el-form-item>

          <el-form-item label="变动价格(￥)" prop="specPrice" v-if="formData.priceStatus === 'Y'">
            <el-input-number
              size="mini"
              class="form-input-number"
              v-model="formData.specPrice"
              label="请填写">
            </el-input-number>
            <el-tooltip class="item" effect="dark" content="通过默认价格增减价格" placement="right">
              <span class="form-dialog-info">
                <i class="el-icon-info"></i>
              </span>
            </el-tooltip>
            <!--<el-input-->
              <!--placeholder="请填写"-->
              <!--v-model="formData.specPrice"-->
              <!--:maxlength="11">-->
            <!--</el-input>-->
          </el-form-item>

          <!--<el-form-item label="状态" prop="status">-->
            <!--<el-select-->
              <!--v-model="formData.status"-->
              <!--placeholder="请选择"-->
              <!--style="width:100%"-->
              <!--clearable>-->
              <!--<el-option value="Y" label="启用"></el-option>-->
              <!--<el-option value="N" label="停用"></el-option>-->
            <!--</el-select>-->
          <!--</el-form-item>-->
        </div>

        <el-button-group>
          <el-button type="primary" @click="submitForm">新增</el-button>
          <el-button @click="openedStatus = false">取消</el-button>
        </el-button-group>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getSpecList, insertSpecItem, deleteSpecItem, getFoodSpecCategoryOptions } from '@/api/food'
export default {
  props: {
    opened: {type: Boolean, default: false},
    itemData: {type: Object}
  },
  data () {
    return {
      loading: true,
      openedStatus: false,
      productId: null,
      formData: {
        specId: null,
        specName: '',
        specPrice: 0,
        status: 'Y'
      },
      formRules: {
        specId: [{ required: true, message: '请选择规格类别', trigger: 'change' }],
        specName: [{ required: true, message: '请填写规格名称', trigger: 'blur' }],
        specPrice: [{ type: 'number', required: true, message: '请填写价格', trigger: 'blur' }]
        // status: [{ required: true, message: '请选择状态', trigger: 'change' }]
      },
      tableData: [],
      specOptions: []
    }
  },
  methods: {
    // 提交表单
    submitForm () {
      this.$refs.formData.validate((valid) => {
        if (valid) {
          this.formData.productId = this.productId
          insertSpecItem(this.formData).then(() => {
            this.getSpecList(this.productId)
            this.$message.success({message: '新增成功', duration: 1500}) // 弹出成功提示
            this.resetForm('formData')
          })
        }
      })
    },
    // 重置表单
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.$refs[formName].clearValidate()
    },
    // 获取返回的认证图片链接和对应的字段名
    getUploadImageUrl (data) {
      this.formData[data.fieldName] = data.url
    },
    // 获取规格类型
    getOptions () {
      getFoodSpecCategoryOptions().then(res => {
        this.specOptions = res.data.result
      })
    },
    // 获取规格属性列表
    getSpecList (id) {
      setTimeout(() => {
        getSpecList(id).then(res => {
          this.tableData = res.data.result
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      }, 500)
    },
    // 删除规格
    delSpecItem (id) {
      this.$confirm('是否删除该规格？', '提示', {
        type: 'warning'
      }).then(() => {
        deleteSpecItem(id).then(() => {
          this.getSpecList(this.productId)
          this.$message.success({message: '删除成功', duration: 1500})
        })
      })
    },
    // 编辑规格
    UpdateSpecItem (id) {
      console.log('编辑：', id)
      this.tableData = this.tableData.map(v => {
        this.$set(v, 'edit', false)
      })
    },
    getCategoryChange (specId) {
      this.formData.specPrice = 0
      for (let v of this.specOptions) {
        if (v.id === specId) {
          this.formData.priceStatus = v.priceStatus
        }
      }
    }
  },
  watch: {
    opened (val) {
      this.openedStatus = val
    },
    openedStatus (val) {
      if (!val) {
        setTimeout(() => { this.resetForm('formData') }, 300)
      } else {
        this.loading = true
        this.getOptions()
      }
      this.$emit('on-opened-change', {key: 'addSpec', state: val})
    },
    itemData (val) {
      this.productId = val.id
      this.getSpecList(val.id)
    }
  }
}
</script>
