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
          <el-form-item label="所属分店" prop="branchId" v-if="$store.getters.userType === '1'">
            <el-select
              v-model="formData.branchId"
              placeholder="请选择"
              style="width:100%"
              clearable>
              <el-option v-for="(item, index) in branchOptions" :key="index" :label="item.description" :value="item.id"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="信息标题" prop="name">
            <el-input
              placeholder="请填写"
              v-model="formData.name"
              :maxlength="50">
            </el-input>
          </el-form-item>

          <el-form-item label="跳转路径" prop="jumpPath">
            <el-input
              placeholder="请填写"
              v-model="formData.jumpPath"
              :maxlength="100">
            </el-input>
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
import { insertCanteenNewsItem } from '@/api/news'
export default {
  props: {
    value: {type: Boolean, default: false},
    branchOptions: {type: Array}
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
        status: 'Y'
      },
      formRules: {
        branchId: [{ required: true, message: '请选择所属分店', trigger: 'change' }],
        name: [{ required: true, message: '请填写标题', trigger: 'blur' }],
        status: [{ required: true, message: '请选择状态', trigger: 'change' }]
      }
    }
  },
  methods: {
    // 提交表单
    submitForm () {
      this.$refs.formData.validate((valid) => {
        if (valid) {
          insertCanteenNewsItem(this.formData).then(() => {
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
