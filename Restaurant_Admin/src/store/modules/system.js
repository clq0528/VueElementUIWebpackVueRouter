const system = {
  state: {
    sidebarStatus: !(parseInt(localStorage.getItem('sidebarStatus')) === 1)
  },

  actions: {
    SidebarToggle ({ commit }) {
      commit('SIDEBAR_TOGGLE')
    }
  },

  mutations: {
    SIDEBAR_TOGGLE: state => {
      if (state.sidebarStatus) {
        localStorage.setItem('sidebarStatus', 1) // 开
      } else {
        localStorage.setItem('sidebarStatus', 0) // 关
      }
      state.sidebarStatus = !state.sidebarStatus
    }
  }
}

export default system
