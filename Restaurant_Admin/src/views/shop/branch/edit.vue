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
              :img-type="20"
              img-title="店面图片"
              width="100%"
              height="200px"
              field-name="icon"
              @upload-img="getUploadImageUrl">
            </upload-image-bar>
          </el-form-item>
        </div>

        <div class="form-dialog-block">
          <el-form-item label="所属总店" prop="headId" v-if="$store.getters.userType === '1'">
            <el-select
              v-model="formData.headId"
              placeholder="请选择"
              style="width:100%"
              clearable>
              <el-option v-for="(item, index) in options" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="分店编号" prop="name">
            <el-input
              placeholder="请填写"
              v-model="formData.name"
              :maxlength="32">
            </el-input>
          </el-form-item>

          <el-form-item label="分店名称" prop="description">
            <el-input
              placeholder="请填写"
              v-model="formData.description"
              :maxlength="32">
            </el-input>
          </el-form-item>

          <el-form-item label="分店描述" prop="detail">
            <el-input
              placeholder="请填写"
              v-model="formData.detail"
              :maxlength="50">
            </el-input>
          </el-form-item>

          <el-form-item label="联系人" prop="contacts">
            <el-input
              placeholder="请填写"
              v-model="formData.contacts"
              :maxlength="32">
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
              type="number"
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

        <div class="form-dialog-block">
          <el-form-item label="所在地区" prop="location">
            <el-cascader
              v-model="formData.location"
              :options="locationArr"
              :props="props"
              @change="getLocationName"
              @active-item-change="handleItemChange"
              style="width:100%"
            ></el-cascader>
          </el-form-item>

          <el-form-item label="详细地址" prop="address">
            <el-input
              placeholder="请填写"
              v-model="formData.address"
              :maxlength="32">
            </el-input>
          </el-form-item>

          <el-form-item label="经度" prop="latitude">
            <el-input
              type="number"
              readonly
              placeholder="请填写"
              v-model="formData.latitude"
              :maxlength="32">
            </el-input>
          </el-form-item>

          <el-form-item label="纬度" prop="longitude">
            <el-input
              type="number"
              readonly
              placeholder="请填写"
              v-model="formData.longitude"
              :maxlength="32">
            </el-input>
          </el-form-item>
        </div>

        <div class="form-dialog-block">
          <map-view
            map-id="map-edit"
            :address="fullAddress"
            :position="fullPosition"
            @get-position="getPosition">
          </map-view>
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
import { updateBranchItem } from '@/api/branch'
import { getDistrictList } from '@/api/public'
import { verifyMobile } from '@/utils/validate'
import { getString } from '@/utils/index'
import mapView from './map'
export default {
  props: {
    opened: {type: Boolean, default: false},
    options: {type: Array},
    provinceData: {type: Array},
    itemData: {type: Object}
  },
  components: {
    uploadImageBar,
    mapView
  },
  computed: {
    fullPosition () {
      return {lat: this.formData.latitude, lng: this.formData.longitude}
    },
    fullAddress () {
      let address = this.formData.provinceName +
      this.formData.cityName +
      this.formData.districtName +
      this.formData.address
      return address || ''
    }
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
      formData: {
        status: 'Y',
        location: [],
        longitude: 113.26856231375132,
        latitude: 22.923573312549944
      },
      formRules: {
        headId: [{ required: true, message: '请选择所属总店', trigger: 'change' }],
        name: [{ required: true, message: '请填写分店编号', trigger: 'blur' }],
        description: [{ required: true, message: '请填写分店名称', trigger: 'blur' }],
        contacts: [{ required: true, message: '请填写联系人', trigger: 'blur' }],
        telephone: [{ required: true, message: '请填写电话号码', trigger: 'blur' }],
        mobile: [{ required: true, trigger: 'blur', validator: valiMobile }],
        status: [{ required: true, message: '请选择状态', trigger: 'change' }],
        location: [{ type: 'array', required: true, message: '请选择所在地区', trigger: 'change' }],
        address: [{required: true, message: '请填写详细地址', trigger: 'blur'}],
        longitude: [{required: true, message: '请填写经度', trigger: 'blur'}],
        latitude: [{required: true, message: '请填写纬度', trigger: 'blur'}]
      },
      locationArr: [],
      props: {
        value: 'id',
        label: 'name'
      }
    }
  },
  methods: {
    // 提交表单
    submitForm () {
      this.$refs.formData.validate((valid) => {
        if (valid) {
          updateBranchItem(this.formData).then(() => {
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
    },
    // 获取经纬度
    getPosition ({lat, lng}) {
      this.formData.latitude = lat
      this.formData.longitude = lng
    },
    // 选择所在地区
    handleItemChange (val) {
      let len = val.length
      if (len === 1) {
        getDistrictList(val[0]).then(res => {
          let data = res.data.result
          data.map(v => { v.children = [] })
          this.locationArr.map(v => {
            if (v.id === val[0]) {
              this.formData.provinceId = v.id
              this.formData.provinceName = v.name
              this.formData.provinceNameEn = v.pinyin
              this.$set(v, 'children', data)
            }
          })
        })
      } else if (len === 2) {
        getDistrictList(val[1]).then(res => {
          let data = res.data.result
          this.locationArr.map(v => {
            if (v.id === val[0]) {
              v.children.map(vv => {
                if (vv.id === val[1]) {
                  this.formData.cityId = vv.id
                  this.formData.cityName = vv.name
                  this.formData.cityNameEn = vv.pinyin
                  this.$set(vv, 'children', data)
                }
              })
            }
          })
        })
      }
    },
    // 当地区改变时
    getLocationName (val) {
      console.log(val)
      this.locationArr.map(v => {
        if (v.id === val[0]) {
          this.formData.provinceId = v.id
          this.formData.provinceName = v.name
          this.formData.provinceNameEn = v.pinyin
          v.children.map(vv => {
            if (vv.id === val[1]) {
              this.formData.cityId = vv.id
              this.formData.cityName = vv.name
              this.formData.cityNameEn = vv.pinyin
              vv.children.map(vvv => {
                if (vvv.id === val[2]) {
                  this.formData.districtId = vvv.id
                  this.formData.districtName = vvv.name
                }
              })
            }
          })
        }
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
      this.$emit('on-opened-change', {key: 'edit', state: val})
    },
    itemData (val) {
      this.formData = getString(Object.assign({}, val))
      this.formData.location = [val.provinceId, val.cityId, val.districtId]
      this.locationArr.map(v => {
        if (v.id === val.provinceId) {
          getDistrictList(val.provinceId).then(res => {
            this.$set(v, 'children', res.data.result)
            v.children.map(vv => {
              if (vv.id === val.cityId) {
                getDistrictList(val.cityId).then(res => {
                  this.$set(vv, 'children', res.data.result)
                })
              }
            })
          })
        }
      })
    },
    provinceData (val) {
      this.locationArr = val.map(v => {
        this.$set(v, 'children', [])
        return v
      })
    }
  }
}
</script>
