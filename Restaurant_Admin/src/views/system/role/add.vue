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
          <el-form-item label="角色名称" prop="roleName">
            <el-input
              placeholder="请填写"
              v-model="formData.roleName"
              :maxlength="32">
            </el-input>
          </el-form-item>

          <el-form-item label="角色描述" prop="roleDesc">
            <el-input
              placeholder="可选填"
              v-model="formData.roleDesc"
              :maxlength="50">
            </el-input>
          </el-form-item>

          <el-form-item label="角色状态" prop="roleStatus">
            <el-radio-group v-model="formData.roleStatus">
              <el-radio label="Y">启用</el-radio>
              <el-radio label="N">停用</el-radio>
            </el-radio-group>
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
import { insertRoleItem } from '@/api/role'
export default {
  props: {
    opened: {type: Boolean, default: false}
  },
  data () {
    return {
      openedStatus: false,
      formData: {
        roleStatus: 'Y'
      },
      formRules: {
        roleName: [{ required: true, message: '请填写角色名称', trigger: 'blur' }],
        roleStatus: [{ required: true, message: '请选择角色状态', trigger: 'change' }]
      }
    }
  },
  methods: {
    // 提交表单
    submitForm () {
      this.$refs.formData.validate((valid) => {
        if (valid) {
          insertRoleItem(this.formData).then(() => {
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
