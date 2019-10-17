const getters = {
  sidebarStatus: state => state.system.sidebarStatus,
  accessToken: state => state.user.accessToken,
  userInfo: state => state.user.userInfo,
  userType: state => state.user.userInfo.type,
  roles: state => state.user.roles,
  menuTree: state => state.user.menuTree,
  visitedViews: state => state.tabs.visitedViews
}

export default getters
