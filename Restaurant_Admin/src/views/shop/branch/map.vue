<template>
  <div :id="mapId" class="map-view"></div>
</template>

<script>
import {TMap} from '@/utils/tmap'
export default {
  props: {
    mapId: {type: String},
    address: {type: String},
    position: {type: Object}
  },
  data () {
    return {
      tmap: {
        key: 'XQ5BZ-LKMRJ-JSUFE-FKAMZ-HOC3E-P3FVM',
        map: null,
        geocoder: null,
        marker: null,
        citylocation: null
      }
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      TMap(this.tmap.key).then(qq => {
        this.tmap.map = new qq.maps.Map(document.getElementById(this.mapId), {
          center: new qq.maps.LatLng(this.position.lat, this.position.lng),
          zoom: 14,
          panControl: false,
          zoomControl: false,
          scaleControl: false
        })
        // 获取坐标
        this.tmap.geocoder = new qq.maps.Geocoder()
        // 标注
        this.tmap.marker = new qq.maps.Marker({
          map: this.tmap.map,
          position: new qq.maps.LatLng(this.position.lat, this.position.lng)
        })
        // 拖动地图
        qq.maps.event.addListener(this.tmap.map, 'center_changed', () => {
          let location = this.tmap.map.getCenter()
          this.tmap.marker.setPosition(new qq.maps.LatLng(location.lat, location.lng))
          this.$emit('get-position', location)
          // console.log('拖动地图：', location)
        })
        // 点击地图
        qq.maps.event.addListener(this.tmap.map, 'click', res => {
          let location = res.latLng
          this.setPosition(location)
          this.$emit('get-position', location)
          // console.log('点击地图：', location)
        })
      })
    },
    // 搜索地址获取坐标
    search (address) {
      this.tmap.geocoder.getLocation(address)
      this.tmap.geocoder.setComplete(res => {
        let location = res.detail.location
        this.tmap.map.setZoom(14)
        this.setPosition(location)
        this.$emit('get-position', location)
      })
    },
    // 重新设置中心点和标注
    setPosition (position) {
      // eslint-disable-next-line
      let location = new qq.maps.LatLng(position.lat, position.lng)
      this.tmap.map.setCenter(location)
      this.tmap.marker.setPosition(location)
    }
  },
  watch: {
    address (v) {
      this.search(v)
    },
    position ({lat, lng}) {
      this.setPosition({lat, lng})
    }
  }
}
</script>

<style lang="scss" scoped>
.map-view {
  width: 100%;
  height: 250px;
}
</style>
