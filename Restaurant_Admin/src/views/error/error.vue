<template>
  <div class="error-wrap">
    <div class="box">
      <div>
        <div class="number">
          <i class="iconfont" :class="`el-icon-my-A${status[0]}`"></i>
          <i class="iconfont" :class="`el-icon-my-A${status[1]}`"></i>
          <i class="iconfont" :class="`el-icon-my-A${status[2]}`"></i>
        </div>
        <p class="tips">{{error.content}}</p>
      </div>
      <button class="btn" @click="$router.replace({path: '/'})">返回首页</button>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    error () {
      let status = this.$route.params.status
      if (status) {
        return this.items.find(e => e.status === parseInt(status))
      }
    },
    status () {
      return this.$route.params.status.split('')
    }
  },
  data () {
    return {
      items: [
        { status: 404, content: '页面不存在或已丢失' },
        { status: 401, content: '您暂时无权访问' },
        { status: 403, content: '服务器上文件或目录拒绝访问' }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
.error-wrap {
  height: 100%;
}
.box {
  height: 100%;
  padding:80px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
.number {
  display: flex;
  justify-content: center;
  color: #4974fd;
  .iconfont {
    display: flex;
    justify-content: center;
    width: 70px;
    font-size: 100px;
  }
}
.tips {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #efefef;
  font-size: 22px;
  color: #b2b2b2;
  text-align: center;
}
.btn {
  background-color: #4974fd;
  color: #fff;
  font-size: 25px;
  padding: 0 50px;
  height: 66px;
  border-radius: 66px;
  border: 0;
  outline: none;
  cursor: pointer;
}
</style>
