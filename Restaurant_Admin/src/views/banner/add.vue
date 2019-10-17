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
          <el-form-item label="" label-width="0px" prop="path" class="form-dialog-upload-item">
            <upload-image-bar
              class="form-dialog-upload-image"
              :dialog-status="openedStatus"
              :img-src="formData.path"
              :img-type="30"
              img-title="轮播图图片"
              width="100%"
              height="200px"
              field-name="path"
              @upload-img="getUploadImageUrl">
            </upload-image-bar>
          </el-form-item>
        </div>

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

          <el-form-item label="标题名称" prop="name">
            <el-input
              placeholder="请填写"
              v-model="formData.name"
              :maxlength="32">
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
          <el-button @click="openedStatus = false">取消</el-button>
        </el-button-group>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import uploadImageBar from '@/components/UploadImage'
import { insertBannerItem } from '@/api/banner'
export default {
  props: {
    opened: {type: Boolean, default: false},
    canteenOptions: {type: Array}
  },
  components: {
    uploadImageBar
  },
  data () {
    return {
      openedStatus: false,
      formData: {
        status: 'Y'
      },
      formRules: {
        path: [{ required: true, message: '请上传图片', trigger: 'change' }],
        branchId: [{ required: true, message: '请选择所属分店', trigger: 'change' }],
        name: [{ required: true, message: '请填写标题名称', trigger: 'blur' }],
        jumpPath: [{ required: true, message: '请填写跳转路径', trigger: 'blur' }],
        status: [{ required: true, message: '请选择状态', trigger: 'change' }]
      }
    }
  },
  methods: {
    // 提交表单
    submitForm () {
      this.$refs.formData.validate((valid) => {
        if (valid) {
          insertBannerItem(this.formData).then(() => {
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
    // 获取返回的认证图片链接和对应的字段名
    getUploadImageUrl (data) {
      this.formData[data.fieldName] = data.url
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
