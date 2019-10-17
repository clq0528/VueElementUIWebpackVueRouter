const tabs = {
  state: {
    visitedViews: []
  },
  mutations: {
    ADD_VISITED_VIEWS (state, view) {
      let f = true
      for (let v of state.visitedViews) {
        if (v.path === view.path) {
          f = false
          break
        }
      }
      if (f && view.meta.isTab) {
        state.visitedViews.push({
          name: view.name,
          path: view.path,
          title: view.meta.title || '标签页'
        })
      }
    },
    DEL_VISITED_VIEWS (state, view) {
      for (let [i, v] of state.visitedViews.entries()) {
        if (v.path === view) {
          state.visitedViews.splice(i, 1)
          break
        }
      }
    }
  },
  actions: {
    addVisitedViews ({commit}, view) {
      commit('ADD_VISITED_VIEWS', view)
    },
    delVisitedViews ({commit, state}, view) {
      return new Promise((resolve) => {
        commit('DEL_VISITED_VIEWS', view)
        resolve([...state.visitedViews])
      })
    }
  }
}

export default tabs
