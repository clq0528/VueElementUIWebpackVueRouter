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
          <el-form-item label="" label-width="0px" prop="icon" class="form-dialog-upload-item">
            <upload-image-bar
              class="form-dialog-upload-image"
              :dialog-status="openedStatus"
              :img-src="formData.icon"
              :img-type="10"
              img-title="菜品图片"
              width="100%"
              height="200px"
              field-name="icon"
              @upload-img="getUploadImageUrl">
            </upload-image-bar>
          </el-form-item>
        </div>

        <div class="form-dialog-block">
          <h3 class="form-dialog-subtitle">
            <span>菜品信息</span>
          </h3>
          <el-form-item label="所属总店" prop="headQuarterId" v-if="$store.getters.userType === '1'">
            <el-select
              v-model="formData.headQuarterId"
              placeholder="请选择"
              style="width:100%"
              clearable>
              <el-option v-for="(item, index) in headQuarterOptions" :key="index" :label="item.name" :value="item.id.toString()"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="菜品分类" prop="categoryId">
            <el-select
              v-model="formData.categoryId"
              placeholder="请选择"
              style="width:100%"
              clearable>
              <el-option v-for="(item, index) in categoryOptions" :key="index" :label="item.name" :value="item.id.toString()"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="菜品编号" prop="name">
            <el-input
              placeholder="请填写"
              v-model="formData.name"
              :maxlength="32">
            </el-input>
          </el-form-item>

          <el-form-item label="菜品名称" prop="description">
            <el-input
              placeholder="请填写"
              v-model="formData.description"
              :maxlength="32">
            </el-input>
          </el-form-item>

          <el-form-item label="标准单位" prop="unitId">
            <el-select
              v-model="formData.unitId"
              placeholder="请选择"
              style="width:100%"
              clearable>
              <el-option v-for="(item, index) in unitOptions" :key="index" :label="item.unitName" :value="item.id"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="菜品价格" prop="price">
            <!--<el-input-->
              <!--placeholder="请填写"-->
              <!--v-model="formData.price"-->
              <!--:maxlength="11">-->
            <!--</el-input>-->
            <el-input-number
              size="mini"
              class="form-input-number"
              v-model="formData.price"
              :min="0"
              :max="9999"
              :precision="2"
              label="请填写">
            </el-input-number>
          </el-form-item>

          <el-form-item label="菜品库存" prop="stock">
            <!--<el-input-->
              <!--placeholder="请填写"-->
              <!--v-model="formData.stock"-->
              <!--:maxlength="11">-->
            <!--</el-input>-->
            <el-input-number
              size="mini"
              class="form-input-number"
              v-model="formData.stock"
              :min="0"
              :max="9999"
              :precision="0"
              label="请填写">
            </el-input-number>
          </el-form-item>

          <el-form-item label="状态" prop="status">
            <el-radio-group v-model="formData.status">
              <el-radio label="Y">启用</el-radio>
              <el-radio label="N">停用</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="辣度" prop="taste">
            <div style="height:100%; padding:8px 0 0 15px; display:flex; align-items:center;">
              <el-rate
                v-model="formData.taste"
                :icon-classes="['el-icon-my-lajiao_chili', 'el-icon-my-lajiao_chili', 'el-icon-my-lajiao_chili']"
                void-icon-class="el-icon-my-lajiao_chili"
                :colors="['#f56c6c', '#f56c6c', '#f56c6c']">
              </el-rate>
            </div>
          </el-form-item>
        </div>

        <div class="form-dialog-block">
          <h3 class="form-dialog-subtitle">
            <span>菜品描述</span>
          </h3>
          <el-form-item label="" label-width="0px" prop="content" class="form-dialog-no-pass">
            <el-input
              type="textarea"
              :rows="4"
              placeholder="请填写"
              v-model="formData.detail"></el-input>
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
import { updateFoodItem } from '@/api/food'
import { mapGetters } from 'vuex'
export default {
  props: {
    opened: {type: Boolean, default: false},
    categoryOptions: {type: Array},
    headQuarterOptions: {type: Array},
    unitOptions: {type: Array},
    itemData: {type: Object}
  },
  components: {
    uploadImageBar
  },
  computed: {
    ...mapGetters(['account', 'uid'])
  },
  data () {
    return {
      openedStatus: false,
      formData: {},
      formRules: {
        icon: [{ required: true, message: '请上传菜品图片', trigger: 'change' }],
        headQuarterId: [{ required: true, message: '请选择所属总店', trigger: 'change' }],
        categoryId: [{ required: true, message: '请选择菜品类型', trigger: 'change' }],
        name: [{ required: true, message: '请填写菜品编号', trigger: 'blur' }],
        description: [{ required: true, message: '请填写菜品名称', trigger: 'blur' }],
        price: [{ required: true, message: '请填写菜品价格', trigger: 'blur' }],
        stock: [{ required: true, message: '请填写菜品库存', trigger: 'blur' }],
        unitId: [{ required: true, message: '请选择标准单位', trigger: 'change' }],
        status: [{ required: true, message: '请选择状态', trigger: 'change' }]
      }
    }
  },
  methods: {
    // 提交表单
    submitForm () {
      this.$refs.formData.validate((valid) => {
        if (valid) {
          updateFoodItem(this.formData).then(() => {
            this.openedStatus = false // 关闭窗口
            this.$message.success({message: '修改成功', duration: 1500}) // 弹出成功提示
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
      this.$emit('on-opened-change', {key: 'edit', state: val})
    },
    itemData (val) {
      this.formData = Object.assign({}, val)
    }
  }
}
</script>
