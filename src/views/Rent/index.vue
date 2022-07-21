<template>
  <div>
    <NavBar title="房屋管理">
      <template #right>
        <router-link to="/rent/add">发布</router-link>
      </template>
    </NavBar>
    <div class="empty-container" v-if="!houseList">
      <img src="http://liufusong.top:8080/img/not-found.png" alt="" />
      <p>
        您还没有房源，<router-link to="/rent/add" class="rent_gethouse"
          >去发布房源</router-link
        >吧~
      </p>
    </div>
    <house-list-item :houseList="houseList" v-else></house-list-item>
  </div>
</template>

<script>
import { getUpHouses } from '@/api'
import HouseListItem from '@/components/HouseListItem.vue'
export default {
  components: { HouseListItem },
  data() {
    return {
      houseList: []
    }
  },
  created() {
    this.getUpHouses()
    this.$toast.loading({
      message: '加载中...',
      forbidClick: true,
      loadingType: 'circular',
      duration: 0
    })
  },
  methods: {
    async getUpHouses() {
      const token = localStorage.getItem('token')
      const res = await getUpHouses(token)
      this.$toast.clear()
      this.houseList = res.data.body
      console.log('已发布房源', res)
    }
  }
}
</script>

<style scoped lang="less">
:deep(.van-nav-bar__right a){
  color: #fff;
}
.empty-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 150px;
    margin: 30px 0;
  }
  p {
    color: #333;
    font-size: 14px;
    .rent_gethouse {
      color: #33be85;
    }
  }
}
</style>
