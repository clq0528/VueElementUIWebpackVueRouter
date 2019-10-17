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
          <el-form-item label="总店编号" prop="name">
            <el-input
              placeholder="请填写"
              v-model="formData.name"
              :maxlength="32">
            </el-input>
          </el-form-item>

          <el-form-item label="总店名称" prop="description">
            <el-input
              placeholder="请填写"
              v-model="formData.description"
              :maxlength="32">
            </el-input>
          </el-form-item>

          <el-form-item label="总店描述" prop="detail">
            <el-input
              placeholder="请填写"
              v-model="formData.detail"
              :maxlength="50">
            </el-input>
          </el-form-item>

          <el-form-item label="负责人" prop="personCharge">
            <el-input
              placeholder="请填写"
              v-model="formData.personCharge"
              :maxlength="32">
            </el-input>
          </el-form-item>

          <el-form-item label="联系人" prop="contacts">
            <el-input
              placeholder="请填写"
              v-model="formData.contacts"
              :maxlength="32">
            </el-input>
          </el-form-item>

          <el-form-item label="总店地址" prop="address">
            <el-input
              placeholder="请填写"
              v-model="formData.address"
              :maxlength="50">
            </el-input>
          </el-form-item>

          <el-form-item label="电话号码" prop="telephone">
            <el-input
              placeholder="请填写"
              v-model="formData.telephone"
              :maxlength="32">
            </el-input>
          </el-form-item>

          <el-form-item label="手机号码" prop="mobile">
            <el-input
              placeholder="请填写"
              v-model="formData.mobile"
              :maxlength="32">
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
          <el-button @click="openedStatus = false">取消</el-button>
        </el-button-group>

      </el-form>

    </el-dialog>
  </div>
</template>

<script>
import { updateHeadquarterItem } from '@/api/headquarters'
import { verifyMobile } from '@/utils/validate'
import { getString } from '@/utils/index'
import { mapGetters } from 'vuex'
export default {
  props: {
    opened: {type: Boolean, default: false},
    itemData: {type: Object}
  },
  computed: {
    ...mapGetters(['account', 'uid'])
  },
  data () {
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
    return {
      openedStatus: false,
      formData: {},
      formRules: {
        name: [{ required: true, message: '请填写总店编号', trigger: 'blur' }],
        description: [{ required: true, message: '请填写总店名称', trigger: 'blur' }],
        personCharge: [{ required: true, message: '请填写负责人', trigger: 'blur' }],
        contacts: [{ required: true, message: '请填写联系人', trigger: 'blur' }],
        address: [{ required: true, message: '请填写总店地址', trigger: 'blur' }],
        telephone: [{ required: true, message: '请填写电话号码', trigger: 'blur' }],
        mobile: [{ required: true, trigger: 'blur', validator: valiMobile }],
        status: [{ required: true, message: '请选择状态', trigger: 'change' }]
      }
    }
  },
  methods: {
    // 提交表单
    submitForm () {
      this.$refs.formData.validate((valid) => {
        if (valid) {
          updateHeadquarterItem(this.formData).then(() => {
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
      this.formData = getString(Object.assign({}, val))
    }
  }
}
</script>
