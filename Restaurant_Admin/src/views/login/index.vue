<template>
  <div class="login-wrap">
    <div class="login-box">
      <!--<div class="login-logo">-->
        <!--<img src="../../assets/image/logo.png"/>-->
      <!--</div>-->
      <div class="login-form">
        <div class="login-form-list">
          <div class="login-form-item">
            <i class="el-icon-my-people_fill login-form-icon"></i>
            <input
              class="login-form-input"
              type="text"
              v-model="formData.account"
              placeholder="账号"
              maxlength="32"
              @keyup.enter="submitForm()"
            >
          </div>
          <div class="login-form-item">
            <i class="el-icon-my-lock_fill login-form-icon"></i>
            <input
              class="login-form-input"
              :type="visibleStatus ? 'text' : 'password'"
              v-model="formData.password"
              placeholder="密码"
              maxlength="32"
              @keyup.enter="submitForm()"
            >
            <i class="iconfont login-form-visile"
               :class="visibleStatus ? 'el-icon-my-e is-active' : 'el-icon-my-eed'"
               @click="visibleToggle()">
            </i>
          </div>
        </div>
        <button class="login-form-submit" @click="submitForm()">立即登录</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        account: null,
        password: null
      },
      visibleStatus: false
    }
  },
  methods: {
    submitForm () {
      if (!this.formData.account) {
        this.$message.warning({message: '请填写账号', duration: 1500})
        return false
      }
      if (!this.formData.password) {
        this.$message.warning({message: '请填写密码', duration: 1500})
        return false
      }
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      let params = {
        userAccount: this.formData.account.trim(),
        passWord: this.formData.password
      }
      setTimeout(() => {
        this.$store.dispatch('LoginByAccount', params).then(() => {
          loading.close()
          this.$message.success({message: '欢迎回来', duration: 1500})
          if (localStorage.getItem('backUrl')) {
            this.$router.push({path: localStorage.getItem('backUrl')})
          } else {
            this.$router.push({path: '/'})
          }
        }).catch(err => {
          loading.close()
          if (err.data.result.resources.length === 0) {
            this.$message.error({message: '暂无登录权限', duration: 1500})
          }
        })
      }, 1000)
    },
    visibleToggle () {
      this.visibleStatus = !this.visibleStatus
    }
  }
}
</script>

<style lang="scss">
$hight: 46px;

.login-wrap {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  // background-color: #353535;
  background: linear-gradient(30deg, #22293b, #5f6786);
}

.login-box {
  display: flex;
  flex-direction: column;
  width: 300px;
}

.login-title {
  height: 20px;
  margin-bottom: 20px;
  font-size: 20px;
  line-height: 20px;
  color: #fff;
  text-shadow: 0 1px 1px rgba(0, 0, 0, .2);
  position: relative;
  // &::after {
  //   display: inline-block;
  //   content: "";
  //   height: 1px;
  //   background-color: #fff;
  //   position: absolute;
  //   right: 0;
  //   top: 50%;
  //   left: 110px;
  //   box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
  // }
}

.login-logo {
  margin-bottom: 20px;
  text-align: center;
  img {
    width: 100%;
  }
}

.login-subtitle {
  font-weight: normal;
  font-size: 18px;
}

.login-form {
  display: flex;
  flex-direction: column;
}

.login-form-list {
  overflow: hidden;
  border-radius: 2px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
}

.login-form-item {
  display: flex;
  align-items: center;
  height: $hight;
  background-color: #fff;
  border-bottom: 1px solid #dfdfdf;
  box-sizing: content-box;
  &:last-child {
    border-bottom: 0;
  }
}

.login-form-icon, .login-form-visile {
  width: $hight;
  font-size: 16px;
  color: #b2b2b2;
  text-align: center;
}

.login-form-visile {
  cursor: pointer;
  font-size: 18px;
  &.is-active {
    color: #5f6786;
  }
}

.login-form-input {
  flex: 1;
  width: 100%;
  height: 100%;
  padding: 0;
  outline: none;
  border: 0;
  font-size: 12px;
  color: #000000;
  &::-webkit-input-placeholder {
    color: #b2b2b2;
  }
}

.login-form-submit {
  margin-top: 15px;
  padding: 0;
  height: $hight;
  background-color: #409EFF;
  color: #ffffff;
  font-size: 13px;
  border-radius: 2px;
  outline: none;
  cursor: pointer;
  border: 1px solid #409EFF;
  border-top: 1px solid rgba(255, 255, 255, 0.25);
  text-shadow: 0 1px 1px rgba(0, 0, 0, .2);
  box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
  &:active {
    background-color: #258eff;
    border-color: #258eff;
  }
}
</style>
