<template>
  <div class="header-wrap is-active">
    <h3 class="title">{{ $route.meta.title }}</h3>
    <!--<tabs-view></tabs-view>-->
    <div class="header-bar">
      <el-dropdown
        class="header-dropdown"
        trigger="click"
        @command="handleCommand">
        <button class="header-dropdown__link">
          <i class="icon el-icon-my-user"></i>
        </button>
        <el-dropdown-menu slot="dropdown">
          <div class="header-user">
            <h3>{{userInfo.userName}}</h3>
            <p v-show="userType === '2'">{{userInfo.headName}}</p>
            <p v-show="userType === '3'"><i class="el-icon-my-shop"></i> {{userInfo.branchName}}</p>
          </div>
          <!--<el-dropdown-item command="a">-->
            <!--<i class="el-icon-my-home"></i> 返回首页-->
          <!--</el-dropdown-item>-->
          <!--<el-dropdown-item command="b">-->
            <!--<i class="el-icon-my-user"></i> 管理员设置-->
          <!--</el-dropdown-item>-->
          <el-dropdown-item command="c" style="color:#F56C6C;">
            <i class="el-icon-my-dianyuan"></i> 退出登录
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!--<el-button-->
        <!--plain-->
        <!--type="primary"-->
        <!--icon="el-icon-my-people_fill"-->
        <!--class="header-btn">-->
        <!--您好，<b>用户名</b>-->
      <!--</el-button>-->
      <!--<el-tooltip class="item" effect="dark" content="登出" placement="bottom">-->
        <!--<el-button type="danger" plain icon="el-icon-my-dianyuan" class="header-btn"></el-button>-->
      <!--</el-tooltip>-->
    </div>
  </div>
</template>

<script>
import tabsView from './tabs'
import { mapGetters } from 'vuex'
export default {
  components: {
    tabsView
  },
  computed: {
    ...mapGetters(['userInfo', 'userType'])
  },
  methods: {
    handleCommand (command) {
      switch (command) {
        // 返回首页
        case 'a': {
          this.$router.push('/index')
          break
        }
        // 管理员设置
        case 'b': {
          break
        }
        // 退出登录
        case 'c': {
          // this.$router.push('/login')
          this.loginOut()
          break
        }
      }
    },
    loginOut () {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      setTimeout(() => {
        this.$store.dispatch('LoginOut').then(() => {
          loading.close()
          this.$message({message: '已登出', duration: 1500})
          this.$router.push({path: '/login'})
        }).catch(() => {
          loading.close()
          this.$router.push({path: '/login'})
          return false
        })
      }, 500)
    }
  }
}
</script>

<style lang="scss">
  .header-wrap {
    display: flex;
    align-items: center;
    height: 51px;
    background-color: #ffffff;
    // border-bottom: 1px solid #e6e6e6;
    .title {
      padding-left: 15px;
      color: #000000;
      font-size: 18px;
      font-weight: normal;
      line-height: 1em;
    }
  }
  .header-bar {
    margin-left: auto;
    display: flex;
    .header-btn {
      display: flex;
      align-items: center;
      padding: 3px;
      border-radius: 22px;
      i {
        font-size: 17px;
        width: 22px;
        height: 22px;
        line-height: 22px;
      }
      & [class*=el-icon-]+span {
        margin-right: 8px;
      }
    }
  }
  .header-dropdown {
    .header-dropdown__link {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 51px;
      border: 0;
      // border-left: 1px solid #e6e6e6;
      font-size: 18px;
      color: #666666;
      cursor: pointer;
      background-color: #ffffff;
      position: relative;
      &::after {
        content: "";
        border-left: 1px solid #e6e6e6;
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
      }
      &:hover, &:focus {
        color: #409eff;
        // background-color: #409eff;
        // color: #ffffff;
      }
    }
  }
  .header-user {
    padding: 6px 15px 12px;
    margin-bottom: 6px;
    border-bottom: 1px solid #e6e6e6;
    & > h3 {
      font-size: 13px;
      font-weight: normal;
      color: #409eff;
    }
    & > p {
      display: flex;
      align-items: center;
      font-size: 12px;
      line-height: 1em;
      color: #b2b2b2;
      margin-top: 5px;
    }
  }
</style>
