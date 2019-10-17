<template>
  <div class="layout">
    <div class="layout-aside"><sidebar-view/></div>
    <div class="layout-container">
      <div class="layout-header"><header-view/></div>
      <div class="layout-tabs"><tabs-view/></div>
      <div class="layout-main"><main-view/></div>
    </div>
  </div>
</template>

<script>
import HeaderView from './header'
import SidebarView from './sidebar'
import MainView from './main'
import TabsView from './tabs'
export default {
  components: {
    HeaderView,
    SidebarView,
    MainView,
    TabsView
  }
}
</script>

<style lang="scss" scoped>
  .layout {
    display: flex;
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
  }

  .layout-aside {
    background-color: #22293b;
    position: relative;
  }

  .layout-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    background-color: #f6f6f6;
    width: 80%;
  }

  .layout-header {
    height: 51px;
    background-color: #ffffff;
  }

  .layout-main {
    flex: 1;
    overflow-x: hidden;
  }
</style>
