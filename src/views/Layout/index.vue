<template>
  <div>
    <router-view></router-view>
    <!-- 底部导航 -->
    <van-tabbar
      v-model="active"
      route
      active-color="rgb(33, 185, 122)"
      inactive-color="rgb(136, 136, 136)"
    >
      <van-tabbar-item icon="home-o" to="/home">首页</van-tabbar-item>
      <van-tabbar-item icon="search" to="/home/list">找房</van-tabbar-item>
      <van-tabbar-item icon="orders-o" to="/home/news">资讯</van-tabbar-item>
      <van-tabbar-item icon="user-circle-o" to="/home/profile"
        >我的</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0
    }
  }
}
</script>

<style></style>
