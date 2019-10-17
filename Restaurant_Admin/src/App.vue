<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    addViewTags () {
      if (this.$route.name) {
        const route = this.$route
        this.$store.dispatch('addVisitedViews', route)
      }
    }
  },
  watch: {
    $route () {
      this.addViewTags()
    }
  }
}
</script>

<style>
  @import '//at.alicdn.com/t/font_895567_nd7anqrjxj.css';
</style>
