<template>
  <div class="tabs-view">
    <ul class="tabs-list type-2">
      <li
        class="tabs-item"
        :class="isActive('/index') ? 'is-active' : ''">
        <router-link to="/index">
          <i class="el-icon-my-home"></i> 首页
        </router-link>
      </li><li
        class="tabs-item"
        :class="isActive(item.path) ? 'is-active' : ''"
        v-for="(item, index) in visitedViews"
        :key="index">
        <router-link :to="item.path">{{item.title}}</router-link>
        <i class="close-btn el-icon-close" @click="removeTab(item.path)"></i>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['visitedViews'])
  },
  mounted () {
    this.addTab()
  },
  methods: {
    addTab () {
      if (this.$route.name) {
        const route = this.$route
        this.$store.dispatch('addVisitedViews', route)
      }
    },
    removeTab (path) {
      this.$store.dispatch('delVisitedViews', path).then(() => {
        let len = this.visitedViews.length - 1
        if (path === this.$route.path) {
          if (len < 0) {
            this.$router.push('/index')
          } else {
            this.$router.push(this.visitedViews[len].path)
          }
        }
      })
    },
    isActive (path) {
      return (path === this.$route.path)
    }
  },
  watch: {
    $route () {
      this.addTab()
    }
  }
}
</script>

<style lang="scss">
.tabs-view {
  white-space: nowrap;
  /*overflow-y: hidden;*/
  overflow: hidden;
  background-color: #ffffff;
}
.tabs-list {
  height: 31px;
  border-bottom: 1px solid #e6e6e6;
  // padding: 15px 15px 0;
  padding: 0 15px;
}
.tabs-item {
  display: inline-flex;
  align-items: center;
  margin-right: 5px;
  padding: 0 10px;
  height: 30px;
  font-size: 12px;
  list-style: none;
  background-color: #eeeeee;
  color: #b2b2b2;
  &:hover {
    color: #666666;
    border-color: #dfdfdf;
    // transition: all .2s;
  }
  & > .close-btn {
    cursor: pointer;
    margin-left: 5px;
    &:hover {
      background-color: #e6e6e6;
      border-radius: 50%;
    }
  }
  &.is-active {
    color: #ffffff;
    background-color: #409eff;
  }
  &:last-child {
    margin-right: 0;
  }
}

.tabs-list {
  &.type-2 {
    .tabs-item {
      background: #ffffff;
      border: solid #e6e6e6;
      border-width: 1px 1px 0 1px;
      border-radius: 3px 3px 0 0;
      &.is-active {
        height: 31px;
        margin-bottom: -1px;
        color: #409eff;
        background-color: #f6f6f6;
        position: relative;
      }
    }
  }
}
</style>
