<template>
  <van-search
    background="rgba(0,0,0,0)"
    v-model="value"
    show-action
    placeholder="请输入小区或地址"
  >
    <router-link slot="label" class="city-search" to="/city">{{
      $store.state.city.label
    }}</router-link>
    <template #action>
      <router-link to="/map"
        ><img class="map_img" src="@/assets/map.png" alt=""
      /></router-link>
    </template>
  </van-search>
</template>

<script>
export default {
  data() {
    return {
      value: ''
    }
  }
}
</script>

<style scoped lang="less">
.city-search:after {
  margin-left: 5px;
  padding-right: 5px;
  font: normal normal normal 14px/1 vant-icon;
  content: '\e65e';
  border-right: 1px solid #eee;
  display: inline-block;
}

:deep(.van-search__content) {
  background-color: #fff;
}
.map_img {
  width: 16px;
  height: 16px;
  padding: 2px 2px;
  border-radius: 50%;
  border: 2px solid #fff;
}
.van-search__action {
  line-height: 0;
}
</style>
