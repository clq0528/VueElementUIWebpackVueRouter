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
              <el-option v-for="(item, index) in canteenOptions" :key="index" :label="item.description" :value="item.id"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="餐桌类型" prop="categoryId">
            <el-select
              v-model="formData.categoryId"
              placeholder="请选择"
              style="width:100%"
              clearable>
              <el-option v-for="(item, index) in categoryOptions" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="餐桌编号" prop="name">
            <el-input
              placeholder="请填写"
              v-model="formData.name"
              :maxlength="32">
            </el-input>
          </el-form-item>

          <el-form-item label="餐桌名称" prop="description">
            <el-input
              placeholder="请填写"
              v-model="formData.description"
              :maxlength="32">
            </el-input>
          </el-form-item>

          <el-form-item label="是否可预约" prop="reserve">
            <el-radio-group v-model="formData.reserve">
              <el-radio label="Y">可以预约</el-radio>
              <el-radio label="N">不可预约</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="状态" prop="status">
            <el-radio-group v-model="formData.status">
              <el-radio label="Y">启用</el-radio>
              <el-radio label="N">停用</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="备注" prop="note">
            <el-input
              placeholder="请填写"
              v-model="formData.note"
              :maxlength="11">
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
import { insertTableItem } from '@/api/table'
export default {
  props: {
    opened: {type: Boolean, default: false},
    categoryOptions: {type: Array},
    canteenOptions: {type: Array}
  },
  data () {
    return {
      openedStatus: false,
      formData: {
        reserve: 'Y',
        status: 'Y'
      },
      formRules: {
        branchId: [{ required: true, message: '请选择所属分店', trigger: 'change' }],
        categoryId: [{ required: true, message: '请选择餐桌类型', trigger: 'change' }],
        name: [{ required: true, message: '请填写餐桌编号', trigger: 'blur' }],
        description: [{ required: true, message: '请填写餐桌名称', trigger: 'blur' }],
        reserve: [{ required: true, message: '请选择是否可预约', trigger: 'change' }],
        status: [{ required: true, message: '请选择状态', trigger: 'change' }]
      }
    }
  },
  methods: {
    // 提交表单
    submitForm () {
      this.$refs.formData.validate((valid) => {
        if (valid) {
          insertTableItem(this.formData).then(() => {
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
