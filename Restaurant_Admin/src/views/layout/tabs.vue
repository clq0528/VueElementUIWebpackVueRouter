<template>
  <div class="tabs-view">
    <!--<ul class="tabs-list type-2">-->
      <!--<li-->
        <!--class="tabs-item"-->
        <!--:class="isActive('/index') ? 'is-active' : ''">-->
        <!--<router-link to="/index">-->
          <!--<i class="el-icon-my-home"></i> 首页-->
        <!--</router-link>-->
      <!--</li><li-->
        <!--class="tabs-item"-->
        <!--:class="isActive(item.path) ? 'is-active' : ''"-->
        <!--v-for="(item, index) in visitedViews"-->
        <!--:key="index">-->
        <!--<router-link :to="item.path">{{item.title}}</router-link>-->
        <!--<i class="close-btn el-icon-close" @click="removeTab(item.path)"></i>-->
      <!--</li>-->
    <!--</ul>-->
    <swiper :options="swiperOption" class="tabs-swiper">
      <swiper-slide class="tabs-swiper__item" :class="isActive('/index') ? 'is-active' : ''">
        <router-link to="/index">
          <i class="el-icon-my-home"></i> 首页
        </router-link>
      </swiper-slide>
      <swiper-slide
        class="tabs-swiper__item"
        :class="isActive(item.path) ? 'is-active' : ''"
        v-for="(item, index) in visitedViews"
        :key="index">
        <router-link :to="item.path">{{item.title}}</router-link>
        <i class="close-btn el-icon-close" @click="removeTab(item.path)"></i>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { mapGetters } from 'vuex'
export default {
  components: {
    swiper,
    swiperSlide
  },
  computed: {
    ...mapGetters(['visitedViews'])
  },
  mounted () {
    this.addTab()
  },
  data () {
    return {
      swiperOption: {
        direction: 'horizontal',
        slidesPerView: 'auto',
        freeMode: true,
        spaceBetween: 5,
        scrollbar: {
          el: '.swiper-scrollbar'
        },
        mousewheel: true
      }
    }
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
  height: 30px;
  background-color: #ffffff;
  border-bottom: 1px solid #e6e6e6;
}
.tabs-swiper {
  width: 100%;
  padding: 0 15px;
  position: relative;
  z-index: 10;
}
.tabs-swiper__item {
  width: auto;
  height: 30px;
  line-height: 30px;
  padding: 0 10px;
  background: #ffffff;
  border: solid #e6e6e6;
  border-width: 1px;
  border-radius: 3px 3px 0 0;
  font-size: 12px;
  color: #b2b2b2;
  &:hover {
    color: #666666;
    border-color: #dfdfdf;
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
    height: 31px;
    margin-bottom: -1px;
    color: #409eff;
    background-color: #f6f6f6;
    position: relative;
  }
}
</style>
