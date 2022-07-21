<template>
  <div>
    <NavBar title="我的收藏"></NavBar>
    <HouseListItem :houseList="houseList"></HouseListItem>
  </div>
</template>

<script>
import { getFavorite } from '@/api'
import HouseListItem from '@/components/HouseListItem.vue'
export default {
  components: {
    HouseListItem
  },
  data() {
    return {
      houseList: []
    }
  },
  created() {
    this.getFavorite()
    this.$toast.loading({
      message: '加载中...',
      forbidClick: true,
      loadingType: 'circular',
      duration: 0
    })
  },
  methods: {
    async getFavorite() {
      const token = localStorage.getItem('token')
      const res = await getFavorite(token)
      this.$toast.clear()
      console.log('我的收藏', res)
      this.houseList = res.data.body
    }
  }
}
</script>

<style></style>
