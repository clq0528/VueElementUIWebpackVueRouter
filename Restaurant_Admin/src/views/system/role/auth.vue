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
          <el-form-item label="" label-width="0px" prop="roleIds" class="form-dialog-tree" style="max-height: 600px; overflow-x: hidden;">
            <el-tree
              :data="treeData"
              :default-checked-keys="checkData"
              ref="tree"
              node-key="id"
              show-checkbox
              highlight-current
              :props="defaultProps">
            </el-tree>
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
import { updateRoleAcl, getRoleAcl } from '@/api/role'
import { getAclTree } from '@/api/acl'
export default {
  props: {
    opened: {type: Boolean, default: false},
    itemData: {type: Object}
  },
  data () {
    return {
      loading: true,
      openedStatus: false,
      treeData: [],
      checkData: [],
      formData: {},
      defaultProps: {
        children: 'childList',
        label: 'aclName'
      }
    }
  },
  methods: {
    // 获取权限树
    getTree () {
      getAclTree().then(res => {
        this.treeData = this.getAcl(res.data.result)
      })
    },
    // 递归获取权限树
    getAcl (data) {
      let tree = []
      data.map(v => {
        let childList = (v.childList && v.childList.length > 0) ? this.getAcl(v.childList) : null
        tree.push({
          id: v.id,
          aclName: v.aclName.split('/')[v.aclName.split('/').length - 1] + ` [${v.aclCode}]`,
          childList
        })
      })
      return tree
    },
    // 获取该角色权限
    getRoleAcl (roleId) {
      getRoleAcl(roleId).then(res => {
        this.checkData = res.data.result
        this.getTree()
      })
    },
    // 提交表单
    submitForm () {
      let params = {
        roleId: this.formData.id,
        aclIds: this.$refs.tree.getCheckedKeys().join(',')
      }
      updateRoleAcl(params).then(() => {
        this.$store.dispatch('GetUserInfo').then(() => {
          this.openedStatus = false // 关闭窗口
          this.$message.success({message: '保存成功', duration: 1500}) // 弹出成功提示
        }).catch(() => {
          this.$store.dispatch('LoginOut').then(() => {
            this.$router.push({ path: '/login' })
          })
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
        this.treeData = []
        this.checkData = []
      }
      this.$emit('on-opened-change', {key: 'auth', state: val})
    },
    itemData (val) {
      this.formData = Object.assign({}, val)
      this.getRoleAcl(this.formData.id)
    }
  }
}
</script>
