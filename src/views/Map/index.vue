<template>
  <div>
    <nav-bar title="地图找房"></nav-bar>
    <div style="height: 621px">
      <baidu-map class="map" :center="center" :zoom="zoom" @ready="handler">
        <bm-scale anchor="BMAP_ANCHOR_BOTTOM_LEFT"></bm-scale>
        <bm-control class="b_control" anchor="BMAP_ANCHOR_BOTTOM_RIGHT">
          <button @click="zoom++">+</button>
          <button @click="zoom--">-</button>
        </bm-control>
        <!-- <bm-label content="我爱北京天安门" :position="{lng:116.449979 , lat: 39.92338}" :labelStyle="{color: 'red', fontSize : '24px'}" title="Hover me"/> -->
        <div v-if="!isShow">
          <bm-label
            :massClear="true"
            v-for="(item, index) in cityInfo"
            :key="index"
            :content="`<div class='b_label'><div class='map_name__JMTvk'>${item.label}</div><div>${item.count}套</div></div>`"
            :labelStyle="{}"
            :position="{ lat: item.coord.latitude, lng: item.coord.longitude }"
            @click="
              getmoreCity(item.coord.latitude, item.coord.longitude, item.value)
            "
          >
          </bm-label>
        </div>
        <div v-else>
          <bm-label
            :massClear="true"
            v-for="(item, index) in cityInfo"
            :key="index"
            :content="`
           <div class='map_rect__3Z1xu'>
             <span class='map_housename__27SLZ'>${item.label}</span>
            <span class='map_housenum__1r02m'>${item.count}套</span>
             <i class='map_arrow__27v3o'></i>
           </div>`"
            :labelStyle="{}"
            :position="{ lat: item.coord.latitude, lng: item.coord.longitude }"
            @click="getHouseInfo(item.value)"
          />
        </div>
      </baidu-map>
      <van-popup
        v-model="showPopup"
        position="bottom"
        :style="{ height: '45%' }"
        duration="0.5"
      >
        <van-cell title="房屋列表">
          <template #default>
            <router-link to="home/list">更多房源</router-link>
          </template>
        </van-cell>
        <house-list-item :houseList="houseList"></house-list-item>
      </van-popup>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import { getCityMap, getHouse } from '@/api'
import HouseListItem from '@/components/HouseListItem.vue'
export default {
  components: { NavBar, HouseListItem },
  data() {
    return {
      center: this.$store.state.city.label,
      zoom: 11,
      cityInfo: [],
      isShow: false,
      showPopup: false,
      houseList: []
    }
  },
  created() {
    this.getCityMap(this.$store.state.city.value)
  },
  methods: {
    async getCityMap(value) {
      const res = await getCityMap(value)
      // console.log(res)
      this.cityInfo = res.data.body
      this.$toast.clear()
    },
    handler({ BMap, map }) {},
    getmoreCity(lat, lng, val) {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        loadingType: 'circular',
        duration: 0
      })
      this.cityInfo = []
      this.center = { lat: lat, lng: lng }
      this.zoom += 2
      if (this.zoom === 15) {
        this.isShow = true
      }
      this.getCityMap(val)
    },
    async getHouseInfo(value) {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        loadingType: 'circular',
        duration: 0
      })
      console.log(value)
      const res = await getHouse({
        cityId: this.$store.state.city.value,
        area: value
      })
      // console.log(res)
      this.houseList = res.data.body.list
      this.$toast.clear()
      this.showPopup = true
    }
  }
}
</script>

<style scoped lang="less">
.map {
  overflow: hidden;
  height: 100%;
  .b_control {
    width: 35px;
    height: 71px;
    display: flex;
    flex-direction: column;
    background: rgba(255, 255, 255, 0.6);
    box-shadow: 1px 1px 2px rgb(0 0 0 / 40%);
    border-radius: 3px;
    margin-right: 10px;
    margin-bottom: 10px;
    button {
      flex: 1;
      border: 1px solid #eae9e6;
      font-weight: 700;
      color: #676d73;
      background: rgba(255, 255, 255, 0.6);
    }
  }
  :deep(.b_label) {
    width: 70px;
    height: 70px;
    line-height: 1;
    display: inline-block;
    position: absolute;
    border-radius: 100%;
    background: rgba(12, 181, 106, 0.9);
    color: #fff;
    border: 2px solid hsla(0, 0%, 100%, 0.8);
    text-align: center;
    cursor: pointer;
    .map_name__JMTvk {
      padding: 18px 0 6px;
    }
  }
  :deep(.BMapLabel) {
    background-color: none !important;
    border: none !important;
    padding: 0 !important;
  }

  :deep(.map_rect__3Z1xu) {
    height: 20px;
    line-height: 19px;
    width: 100px;
    padding: 0 3px;
    border-radius: 3px;
    position: absolute;
    background: rgba(12, 181, 106, 0.9);
    cursor: pointer;
    white-space: nowrap;
    .map_housename__27SLZ {
      display: inline-block;
      width: 70px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      vertical-align: middle;
    }
    .map_housenum__1r02m {
      display: inline-block;
      width: 20px;
    }
    .map_arrow__27v3o {
      display: block;
      width: 0;
      height: 0;
      margin: 0 auto;
      border: 4px solid transparent;
      border-top-color: #00a75b;
    }
  }
}
.van-cell {
  position: fixed;
  top: 46%;
  width: 100%;
  height: 65px;
  background: #c0c0c2;
  border-top: 1px solid #c8c8c8;
  .van-cell__title {
    font-size: 16px;
    line-height: 43px;
    color: #1e1e1e;
    vertical-align: middle;
    font-weight: 700;
  }
  .van-cell__value {
    font-size: 13px;
    line-height: 43px;
    color: #1e1e1e;
    vertical-align: middle;
  }
}
</style>
