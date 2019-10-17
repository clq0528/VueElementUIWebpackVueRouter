<template>
  <div :value="value">
    <el-dialog
      class="form-dialog"
      title="新增信息"
      width="500px"
      :visible.sync="visible">
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
          <el-form-item label="规格类型" prop="name">
            <el-input
              placeholder="请填写"
              v-model="formData.name"
              :maxlength="32">
            </el-input>
          </el-form-item>

          <el-form-item label="价格状态" prop="priceStatus">
            <el-radio-group v-model="formData.priceStatus">
              <el-radio label="Y">启用</el-radio>
              <el-radio label="N">停用</el-radio>
            </el-radio-group>
            <el-tooltip class="item" effect="dark" content="如需变动价格请选启用，不需要则选停用" placement="right">
              <span class="form-dialog-info">
                <i class="el-icon-info"></i>
              </span>
            </el-tooltip>
          </el-form-item>

          <el-form-item label="状态" prop="status">
            <el-radio-group v-model="formData.status">
              <el-radio label="Y">启用</el-radio>
              <el-radio label="N">停用</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
        <el-button-group>
          <el-button type="primary" @click="submitForm">保存</el-button>
          <el-button @click="visible = false">取消</el-button>
        </el-button-group>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { insertFoodSpecCategoryItem } from '@/api/food'
export default {
  props: {
    value: {type: Boolean, default: false}
  },
  mounted () {
    if (this.value) {
      this.visible = true
    }
  },
  data () {
    return {
      visible: false,
      formData: {
        priceStatus: 'N',
        status: 'Y'
      },
      formRules: {
        name: [{ required: true, message: '请填写规格类型', trigger: 'blur' }],
        priceStatus: [{ required: true, message: '请选择价格状态', trigger: 'change' }],
        status: [{ required: true, message: '请选择状态', trigger: 'change' }]
      }
    }
  },
  methods: {
    // 提交表单
    submitForm () {
      this.$refs.formData.validate((valid) => {
        if (valid) {
          insertFoodSpecCategoryItem(this.formData).then(() => {
            this.visible = false // 关闭窗口
            this.$message.success({message: '新增成功', duration: 1500}) // 弹出成功提示
          })
        }
      })
    },
    // 重置表单
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.$refs[formName].clearValidate()
    }
  },
  watch: {
    value (val) {
      this.visible = val
    },
    visible (val) {
      if (!val) {
        setTimeout(() => { this.resetForm('formData') }, 300)
        this.$emit('in-close', val)
      }
      this.$emit('input', val)
    }
  }
}
</script>
