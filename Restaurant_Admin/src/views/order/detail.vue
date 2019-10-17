<template>
  <div>
    订单详情{{id}}
  </div>
</template>

<script>
export default {
  created () {
    this.id = this.$route.query.orderId
  },
  data () {
    return {
      id: null
    }
  }
}
</script>
