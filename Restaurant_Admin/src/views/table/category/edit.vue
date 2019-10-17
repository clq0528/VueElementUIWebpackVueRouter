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
          <el-form-item label="所属分店" prop="branchId" v-if="$store.getters.userType === '1'">
            <el-select
              v-model="formData.branchId"
              placeholder="请选择"
              style="width:100%"
              clearable>
              <el-option v-for="(item, index) in canteenOptions" :key="index" :label="item.description" :value="item.id"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="类型名称" prop="name">
            <el-input
              placeholder="请填写"
              v-model="formData.name"
              :maxlength="32">
            </el-input>
          </el-form-item>

          <el-form-item label="餐桌人数" prop="number">
            <!--<el-input-->
              <!--placeholder="请填写"-->
              <!--v-model="formData.number"-->
              <!--:maxlength="4">-->
            <!--</el-input>-->
            <el-input-number
              size="mini"
              class="form-input-number"
              v-model="formData.number"
              :min="1"
              :max="100"
              :precision="0"
              label="请填写">
            </el-input-number>
          </el-form-item>

          <el-form-item label="类型状态" prop="status">
            <el-radio-group v-model="formData.status">
              <el-radio label="Y">启用</el-radio>
              <el-radio label="N">停用</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="类型描述" prop="description">
            <el-input
              placeholder="请填写"
              v-model="formData.description"
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
import { updateTableCategoryItem } from '@/api/table'
import { getString } from '@/utils/index'
export default {
  props: {
    opened: {type: Boolean, default: false},
    canteenOptions: {type: Array},
    itemData: {type: Object}
  },
  data () {
    return {
      openedStatus: false,
      formData: {},
      formRules: {
        branchId: [{ required: true, message: '请选择所属分店', trigger: 'change' }],
        name: [{ required: true, message: '请填写类型名称', trigger: 'blur' }],
        number: [{ required: true, message: '请填写餐桌人数', trigger: 'blur' }],
        status: [{ required: true, message: '请选择类型状态', trigger: 'change' }]
      }
    }
  },
  methods: {
    // 提交表单
    submitForm () {
      this.$refs.formData.validate((valid) => {
        if (valid) {
          this.formData.user = 'admin2'
          updateTableCategoryItem(this.formData).then(() => {
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
