<template>
  <baidu-map class="map" :center="center" :zoom="zoom" @ready="handler">
    <bm-marker :position="center"></bm-marker>
  </baidu-map>
</template>
<script>
export default {
  props: {
    center: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      zoom: 15
    }
  },
  methods: {
    handler({ BMap, map }) {}
  }
}
</script>
<style scoped lang="less">
.bm-view {
  width: 100%;
  height: 300px;
}
.map {
  height: 100%;
}
</style>
