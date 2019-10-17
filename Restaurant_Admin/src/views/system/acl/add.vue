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
          <el-form-item label="资源模块" prop="aclModel">
            <el-select
              v-model="formData.aclModel"
              placeholder="可选填，不选则为模块"
              style="width:100%"
              @change="getDynamicOptions"
              clearable>
              <el-option
                v-for="(item, index) in modelOptions"
                :key="index"
                :label="item.aclName"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="资源类型" prop="aclFType" v-if="formData.aclModel">
            <el-select
              v-model="formData.aclFType"
              placeholder="可选填"
              style="width:100%"
              @change="getDynamicOptions"
              clearable>
              <el-option label="菜单" value="1"></el-option>
              <el-option label="功能" value="2"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="父级资源" prop="pid" v-if="formData.aclModel && formData.aclFType">
            <el-select
              v-model="formData.pid"
              placeholder="可选填"
              style="width:100%"
              clearable>
              <el-option
                v-for="(item, index) in dynamicOptions"
                :key="index"
                :label="item.aclName"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </div>

        <div class="form-dialog-block">
          <el-form-item label="资源编号" prop="aclCode">
            <el-input
              placeholder="请填写"
              v-model="formData.aclCode"
              :maxlength="32">
            </el-input>
          </el-form-item>

          <el-form-item label="资源名称" prop="aclName">
            <el-input
              placeholder="请填写"
              v-model="formData.aclName"
              :maxlength="32">
            </el-input>
          </el-form-item>

          <el-form-item label="终端排序" prop="aclSort">
            <el-input
              type="number"
              placeholder="请填写"
              v-model="formData.aclSort"
              :maxlength="11">
            </el-input>
          </el-form-item>

          <el-form-item label="资源分类" prop="aclCategory">
            <el-select
              v-model="formData.aclCategory"
              placeholder="请选择"
              style="width:100%"
              clearable>
              <el-option label="通用资源" value="0"></el-option>
              <el-option label="超管资源" value="1"></el-option>
              <el-option label="总店资源" value="2"></el-option>
              <el-option label="分店资源" value="3"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="资源状态" prop="aclStatus">
            <el-radio-group v-model="formData.aclStatus">
              <el-radio label="Y">启用</el-radio>
              <el-radio label="N">停用</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>

        <div class="form-dialog-block">
          <el-form-item label="资源类型" prop="aclType">
            <el-select
              v-model="formData.aclType"
              placeholder="请选择"
              style="width:100%"
              clearable>
              <el-option label="菜单" value="1" :disabled="formData.aclFType === '2'"></el-option>
              <el-option label="功能" value="2" :disabled="formData.aclFType === '2'"></el-option>
              <el-option label="接口" value="3"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="菜单名称" prop="aclMenuName" v-if="formData.aclType === '1'">
            <el-input
              placeholder="请填写"
              v-model="formData.aclMenuName"
              :maxlength="32">
            </el-input>
          </el-form-item>

          <el-form-item label="菜单图标" prop="aclMenuIcon" v-if="formData.aclType === '1'">
            <el-input
              placeholder="请填写"
              v-model="formData.aclMenuIcon"
              :maxlength="32">
            </el-input>
          </el-form-item>

          <el-form-item label="菜单路径" prop="aclUrl" v-if="formData.aclType === '1'">
            <el-input
              placeholder="请填写"
              v-model="formData.aclUrl"
              :maxlength="32">
            </el-input>
          </el-form-item>

          <el-form-item label="接口URL" prop="aclUrl" v-if="formData.aclType === '3'">
            <el-input
              placeholder="请填写"
              v-model="formData.aclUrl"
              :maxlength="50">
            </el-input>
          </el-form-item>

          <el-form-item label="请求方式" prop="requestType" v-if="formData.aclType === '3'">
            <el-select
              v-model="formData.requestType"
              placeholder="请选择"
              style="width:100%"
              clearable>
              <el-option label="GET" value="GET"></el-option>
              <el-option label="POST" value="POST"></el-option>
            </el-select>
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
import { insertAclItem, getAclModelOptions, getAclDynamicOptions } from '@/api/acl'
export default {
  props: {
    opened: {type: Boolean, default: false}
  },
  data () {
    return {
      openedStatus: false,
      formData: {
        aclModel: null,
        aclFType: null,
        pid: null,
        aclSort: '100',
        aclStatus: 'Y',
        aclCategory: '0',
        aclType: null,
        requestType: null
      },
      formRules: {
        aclCode: [{ required: true, message: '请填写资源编号', trigger: 'blur' }],
        aclName: [{ required: true, message: '请填写资源名称', trigger: 'blur' }],
        aclSort: [{ required: true, message: '请填写排序', trigger: 'blur' }],
        aclType: [{ required: true, message: '请选择资源类型', trigger: 'change' }],
        aclCategory: [{ required: true, message: '请选择资源分类', trigger: 'change' }],
        aclStatus: [{ required: true, message: '请选择资源状态', trigger: 'change' }],
        aclMenuName: [{ required: false, message: '请填写菜单名称', trigger: 'blur' }],
        aclMenuIcon: [{ required: false, message: '请填写菜单图标', trigger: 'blur' }],
        aclUrl: [{ required: false, message: '请填写URL', trigger: 'blur' }],
        requestType: [{ required: false, message: '请选择请求方式', trigger: 'change' }]
      },
      modelOptions: [],
      dynamicOptions: []
    }
  },
  methods: {
    // 提交表单
    submitForm () {
      this.$refs.formData.validate((valid) => {
        if (valid) {
          insertAclItem(this.formData).then(() => {
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
    // 获取父级资源模块
    getModelOptions () {
      getAclModelOptions().then(res => {
        this.modelOptions = res.data.result
      })
    },
    getDynamicOptions () {
      if (this.formData.aclModel && this.formData.aclFType) {
        let params = {
          id: this.formData.aclModel,
          aclType: this.formData.aclFType
        }
        getAclDynamicOptions(params).then(res => {
          let data = res.data.result
          this.dynamicOptions = data
          this.formData.pid = null
          this.formData.aclType = null
          this.formData.aclMenuName = null
          this.formData.aclMenuIcon = null
          this.formData.aclUrl = null
          this.formData.requestType = null
        })
      } else {
        this.formData.pid = null
        this.dynamicOptions = []
      }
    }
  },
  watch: {
    opened (val) {
      this.openedStatus = val
    },
    openedStatus (val) {
      if (!val) {
        setTimeout(() => { this.resetForm('formData') }, 300)
      } else {
        this.getModelOptions()
      }
      this.$emit('on-opened-change', {key: 'add', state: val})
    }
  }
}
</script>
