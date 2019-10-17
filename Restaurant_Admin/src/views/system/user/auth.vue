<template>
  <div>
    <el-dialog
      class="form-dialog"
      title="角色授权"
      width="500px"
      :visible.sync="openedStatus">
      <el-form
        :model="formData"
        ref="formData"
        label-position="left"
        label-width="100px"
        :inline-message="true"
        :show-message="false"
        status-icon>
        <div class="form-dialog-block">
          <el-form-item label="" label-width="0px" prop="roleIds" class="form-dialog-checkbox-list">
            <el-checkbox-group v-model="formData.roleIds">
              <el-checkbox
                class="form-dialog-checkbox-item"
                v-for="(item, index) in roleOptions"
                :key="index"
                :label="item.id"
                name="checkList">{{ item.roleName }}</el-checkbox>
            </el-checkbox-group>
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
import { updateSystemUserRole } from '@/api/systemUser'
import { getRoleOptions } from '@/api/role'
export default {
  props: {
    opened: {type: Boolean, default: false},
    itemData: {type: Object}
  },
  data () {
    return {
      openedStatus: false,
      roleOptions: [],
      formData: {}
    }
  },
  methods: {
    // 获取所有角色列表
    getRoleOptions () {
      getRoleOptions().then(res => {
        this.roleOptions = res.data.result
      })
    },
    // 提交表单
    submitForm () {
      let params = {
        userId: this.formData.id,
        roleIds: this.formData.roleIds.join(',')
      }
      updateSystemUserRole(params).then(() => {
        this.openedStatus = false // 关闭窗口
        this.$message.success({message: '授权成功', duration: 1500}) // 弹出成功提示
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
      this.$emit('on-opened-change', {key: 'auth', state: val})
    },
    itemData (val) {
      this.formData = Object.assign({}, val)
      this.getRoleOptions()
    }
  }
}
</script>
