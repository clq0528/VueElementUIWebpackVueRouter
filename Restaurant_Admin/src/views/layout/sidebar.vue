<template>
  <div>
  <!--<el-scrollbar style="height:100%">-->
    <!--菜单-->
    <el-menu
      class="sidebar-menu"
      router
      :unique-opened="true"
      :default-active="$route.path"
      :collapse="!sidebarStatus">
      <el-submenu class="sidebar-menu-item" v-for="(item, index) in menuTree" :index="item.aclUrl" :key="index">
        <template slot="title">
          <i class="sidebar-menu-icon" :class="item.aclMenuIcon"></i>
          <span class="sidebar-menu-title" slot="title">{{ item.aclMenuName }}</span>
        </template>
        <el-menu-item-group class="sidebar-menu-group">
          <el-menu-item class="sidebar-menu-sub-item" v-for="(child, index) in item.childList" :index="child.aclUrl" :key="index">{{ child.aclMenuName }}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
    <!--伸缩按钮-->
    <span class="sidebar-status-btn" @click="opened">
      <i class="el-icon-caret-left" :class="{ 'el-icon-caret-left' : sidebarStatus, 'el-icon-caret-right' : !sidebarStatus }"></i>
    </span>
  <!--</el-scrollbar>-->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'sidebarStatus',
      'menuTree'
    ])
  },
  methods: {
    opened () {
      this.$store.dispatch('SidebarToggle')
    }
  }
}
</script>

<style lang="scss">
  $nav-width: 180px;
  $background-color: #22293b;
  $background-color-hover: rgb(20, 25, 35);
  /*$background-color-hover: rgba(64, 158, 255, 0.3);*/
  $background-color-active: rgb(20, 25, 35);
  $text-color: rgba(255, 255, 255, 0.65);
  $text-color-active: rgba(255, 255, 255, 1);
  $text-color-cur: #409EFF;
  $border-color: #2d364e;

  .sidebar-menu {
    border-right: 0;
    background-color: $background-color;
    &:not(.el-menu--collapse) {
      width: $nav-width;
    }
    &.el-menu--collapse {
      width: 50px;
      .is-active {
        i.sidebar-menu-icon {
          color: $text-color-cur;
        }
      }
      .el-submenu__title {
        &::before {
          display: none;
        }
        &::after {
          display: none;
        }
      }
    }
  }

  .sidebar-menu-item {
    border-top: 1px solid #2d3445;
    border-bottom: 1px solid $background-color-active;
    background-color: $background-color;
    &:first-child {
      border-top: 0;
    }
    &.is-opened {
      background-color: $background-color-active;
      position: relative;
      i.sidebar-menu-icon {
        color: $text-color-cur;
      }
      .sidebar-menu-title {
        color: #fff;
        font-weight: bold;
      }
      .el-submenu__title {
        &::before {
          transform: translate(-2px, -50%) rotate(45deg);
          background-color: #ffffff;
        }
        &::after {
          transform: translate(2px, -50%) rotate(-45deg);
          background-color: #ffffff;
        }
      }
      /*&::after {
        content: "";
        height: 100%;
        width: 3px;
        background-color: $text-color-cur;
        position: absolute;
        top: 0;
        right: 0;
        z-index: 10;
      }*/
    }
    .el-submenu__title {
      display: flex;
      align-items: center;
      height: 50px;
      line-height: 50px;
      padding: 0 15px !important;
      position: relative;
      &:hover,
      &:focus {
        background-color: $background-color-hover;
      }
      &::before, &::after {
        content: "";
        width: 4px;
        border-bottom: 1px solid #909399;
        position: absolute;
        top: 50%;
        transition: all .3s;
      }
      &::before {
        right: 17px;
        transform: translate(-2px, -50%) rotate(-45deg);
      }
      &::after {
        right: 18px;
        top: 50%;
        transform: translate(2px, -50%) rotate(45deg);
      }
      .el-submenu__icon-arrow {
        display: none;
      }
    }
    .el-menu {
      background-color: $background-color-active;
      .sidebar-menu-group {
        padding-bottom: 15px;
      }
      .sidebar-menu-sub-item {
        min-width: $nav-width;
        height: 26px;
        line-height: 26px;
        padding: 0 0 0 50px !important;
        font-size: 12px;
        color: $text-color;
        &:hover,
        &:focus {
          color: $text-color;
          background-color: $background-color-hover;
        }
        &.is-active {
          color: $text-color-cur;
          /*background-color: $background-color-hover;*/
          background-color: rgba(64, 158, 255, .2);
          border-right: 3px solid $text-color-cur;
          &::before {
            background-color: $text-color-cur;
            transform: translateY(-50%) scale(1.2);
          }
        }
        &::before {
          content: '';
          display: inline-block;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background-color: #3b445d;
          position: absolute;
          left: 22px;
          top: 50%;
          transform: translate(0, -50%);
          z-index: 10;
          transition: all .3s;
        }
      }
    }
  }

  i.sidebar-menu-icon {
    color: $text-color;
    font-size: 14px;
    padding: 3px 3px;
    background-color: #3b445d;
    border-radius: 50%;
    border-top: 1px solid #667390;
    border-bottom: 1px solid #141923;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  }

  .sidebar-menu-title {
    flex: 1;
    margin-left: 15px;
    font-size: 12px;
    color: $text-color;
  }

  .el-menu--vertical {
    .el-menu {
      padding: 0;
      border-radius: 2px;
      overflow: hidden;
      background-color: $background-color-active;
      .sidebar-menu-sub-item {
        padding: 0 20px !important;
        height: 51px;
        line-height: 50px;
        font-size: 12px;
        color: $text-color;
        border-bottom: 1px solid $background-color;
        &:hover {
          background-color: $background-color-hover;
        }
        &.is-active {
          color: $text-color-cur;
          background-color: $background-color-hover;
          border-right: 3px solid $text-color-cur;
        }
        &:last-child {
          border-bottom: 0;
        }
      }
    }
  }

  .layout-aside {
    &:hover .sidebar-status-btn {
      visibility: inherit;
    }
    .sidebar-status-btn {
      visibility: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background-color: #fff;
      border: 2px solid #141923;
      position: absolute;
      top: 50px;
      right: 0;
      transform: translate(50%, -50%);
      cursor: pointer;
      font-size: 16px;
      color: #141923;
      z-index: 9999;
      &:hover {
        border-color: #5f6786;
        color: #5f6786;
      }
    }
  }

  .el-menu-item-group__title {
    display: none;
  }
</style>
