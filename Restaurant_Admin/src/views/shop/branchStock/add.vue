<template>
  <div>
    <el-dialog
      class="form-dialog"
      title="新增信息"
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
        <div class="form-dialog-block">
          <el-form-item label="所属分店" prop="branchId" v-if="$store.getters.userType === '1'">
            <el-select
              v-model="formData.branchId"
              placeholder="请选择"
              style="width:100%"
              clearable>
              <el-option v-for="(item, index) in branchOptions" :key="index" :label="item.description" :value="item.id"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="菜品名称" prop="productId">
            <el-select
              v-model="formData.productId"
              placeholder="请选择"
              style="width:100%"
              clearable>
              <el-option v-for="(item, index) in foodOptions" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="菜品库存" prop="stock">
            <el-input-number
              size="mini"
              class="form-input-number"
              v-model="formData.stock"
              :min="0"
              :max="9999"
              :precision="0"
              label="请填写">
            </el-input-number>
          </el-form-item>
        </div>
        <el-button-group>
          <el-button type="primary" @click="submitForm">保存</el-button>
          <el-button @click="openedStatus = false">取消</el-button>
        </el-button-group>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { insertBranchStockItem } from '@/api/branchStock'
export default {
  props: {
    opened: {type: Boolean, default: false},
    foodOptions: {type: Array},
    branchOptions: {type: Array}
  },
  data () {
    return {
      openedStatus: false,
      formData: {
        stock: 0
      },
      formRules: {}
    }
  },
  methods: {
    // 提交表单
    submitForm () {
      this.$refs.formData.validate((valid) => {
        if (valid) {
          insertBranchStockItem(this.formData).then(() => {
            this.openedStatus = false // 关闭窗口
            this.$message.success({message: '新增成功', duration: 1500}) // 弹出成功提示
          })
        }
      })
    },
    // 重置表单
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  },
  watch: {
    opened (val) {
      this.openedStatus = val
    },
    openedStatus (val) {
      if (!val) {
        setTimeout(() => { this.resetForm('formData') }, 300)
      }
      this.$emit('on-opened-change', {key: 'add', state: val})
    }
  }
}
</script>
