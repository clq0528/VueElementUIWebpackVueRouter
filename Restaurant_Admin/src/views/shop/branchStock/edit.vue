<template>
  <div>
    <el-dialog
      class="form-dialog"
      title="编辑信息"
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
import { updateBranchStockItem } from '@/api/branchStock'
export default {
  props: {
    opened: {type: Boolean, default: false},
    itemData: {type: Object}
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
          updateBranchStockItem(this.formData).then(() => {
            this.openedStatus = false // 关闭窗口
            this.$message.success({message: '修改成功', duration: 1500}) // 弹出成功提示
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
      this.$emit('on-opened-change', {key: 'edit', state: val})
    },
    itemData (val) {
      this.formData = Object.assign({}, val)
    }
  }
}
</script>
