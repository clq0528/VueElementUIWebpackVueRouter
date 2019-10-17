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
          <h3 class="form-dialog-subtitle">
            <span>账号信息</span>
          </h3>

          <el-form-item label="登录账号" prop="userAccount">
            <el-input
              placeholder="请填写"
              v-model="formData.userAccount"
              :maxlength="32">
            </el-input>
          </el-form-item>

          <el-form-item label="登录密码" prop="userPass">
            <el-input
              type="password"
              placeholder="可选填"
              v-model="formData.userPass"
              :maxlength="32">
            </el-input>
          </el-form-item>
        </div>

        <div class="form-dialog-block">
          <h3 class="form-dialog-subtitle">
            <span>账号属性</span>
          </h3>

          <el-form-item label="账号类型" prop="userType">
            <el-select
              v-model="formData.userType"
              placeholder="请选择"
              style="width:100%"
              clearable>
              <el-option label="超级管理员" value="1"></el-option>
              <el-option label="总店管理员" value="2"></el-option>
              <el-option label="分店管理员" value="3"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="所属总店" prop="headId" v-if="formData.userType === '2'">
            <el-select
              v-model="formData.headId"
              placeholder="请选择"
              style="width:100%"
              clearable>
              <el-option v-for="(item, index) in headOptions" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="所属分店" prop="shopId" v-if="formData.userType === '3'">
            <el-cascader
              v-model="formData.shopId"
              :options="headData"
              :show-all-levels="false"
              @active-item-change="handleItemChange"
              style="width:100%">
            </el-cascader>
          </el-form-item>

          <el-form-item label="账号状态" prop="userStatus">
            <el-radio-group v-model="formData.userStatus">
              <el-radio label="Y">启用</el-radio>
              <el-radio label="N">停用</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>

        <div class="form-dialog-block">
          <h3 class="form-dialog-subtitle">
            <span>个人信息</span>
          </h3>

          <el-form-item label="用户姓名" prop="userName">
            <el-input
              placeholder="请填写"
              v-model="formData.userName"
              :maxlength="32">
            </el-input>
          </el-form-item>

          <el-form-item label="手机号码" prop="userPhone">
            <el-input
              type="number"
              placeholder="请填写"
              v-model="formData.userPhone"
              :maxlength="11">
            </el-input>
          </el-form-item>

          <el-form-item label="电子邮箱" prop="userMail">
            <el-input
              placeholder="请填写"
              v-model="formData.userMail"
              :maxlength="50">
            </el-input>
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
import { insertSystemUserItem } from '@/api/systemUser'
import { getBranchOptions } from '@/api/branch'
import { verifyMobile, verifyEmail } from '@/utils/validate'
// 验证手机号码格式
const valiMobile = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请填写手机号码'))
  } else if (!verifyMobile(value)) {
    callback(new Error('请输入正确的手机号码'))
  } else {
    callback()
  }
}
// 验证电子邮箱格式
const valiEmail = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请填写电子邮箱'))
  } else if (!verifyEmail(value)) {
    callback(new Error('请输入正确的电子邮箱'))
  } else {
    callback()
  }
}
export default {
  props: {
    opened: {type: Boolean, default: false},
    headOptions: {type: Array}
  },
  data () {
    return {
      openedStatus: false,
      formData: {
        userType: null,
        headId: null,
        branchId: null,
        shopId: [],
        userStatus: 'Y'
      },
      formRules: {
        userType: [{ required: true, message: '请选择用户类型', trigger: 'change' }],
        userAccount: [{ required: true, message: '请填写登录账号', trigger: 'blur' }],
        userName: [{ required: true, message: '请填写用户名称', trigger: 'blur' }],
        userPhone: [{ required: true, trigger: 'blur', validator: valiMobile }],
        userMail: [{ required: true, trigger: 'blur', validator: valiEmail }],
        userStatus: [{ required: true, message: '请选择用户状态', trigger: 'change' }],
        headId: [{ required: true, message: '请选择所属总店', trigger: 'change' }],
        shopId: [{ type: 'array', required: true, message: '请选择所属分店', trigger: 'change' }]
      },
      headData: []
    }
  },
  methods: {
    // 提交表单
    submitForm () {
      this.$refs.formData.validate((valid) => {
        if (valid) {
          if (this.formData.userType === '3') {
            this.formData.headId = this.formData.shopId[0]
            this.formData.branchId = this.formData.shopId[1]
          }
          insertSystemUserItem(this.formData).then(() => {
            this.openedStatus = false // 关闭窗口
            this.$message.success({message: '新增成功', duration: 1500}) // 弹出成功提示
          })
        }
      })
    },
    // 重置表单
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    // 选择总店
    handleItemChange (val) {
      let id = val[0]
      getBranchOptions({id}).then(res => {
        this.headData.map(v => {
          if (v.id === id) {
            let data = res.data.result.map(e => {
              return {value: e.id, label: e.description}
            })
            this.$set(v, 'children', data)
          }
        })
      })
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
    },
    headOptions (val) {
      this.headData = val
    }
  }
}
</script>
