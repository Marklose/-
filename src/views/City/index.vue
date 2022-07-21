<template>
  <div>
    <!-- 导航栏 -->
    <NavBar title="城市列表" class="city_navbar"></NavBar>
    <!-- 城市列表 -->
    <van-index-bar :index-list="list" z-index="0" class="city_list_ab">
      <div>
        <van-index-anchor index="#">当前城市 </van-index-anchor>
        <van-cell :title="city.label" />
      </div>
      <div>
        <van-index-anchor index="热">热门城市 </van-index-anchor>
        <van-cell
          :title="item.label"
          v-for="(item, index) in hotcityList"
          :key="index"
          @click="changeCity(item.label)"
        />
      </div>
      <div v-for="(item, index) in cityList" :key="index">
        <van-index-anchor :index="item.Initials"
          >{{ item.Initials }}
        </van-index-anchor>
        <van-cell
          :title="i"
          v-for="(i, id) in item.city"
          :key="id"
          @click="changeCity(i)"
        />
      </div>
    </van-index-bar>
  </div>
</template>

<script>
import { getCity, getHotCity } from '@/api'
import { mapState } from 'vuex'
export default {
  name: 'City',
  data() {
    return {
      cityList: [],
      firstName: [
        '#',
        '热',
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'W',
        'X',
        'Y',
        'Z'
      ],
      list: [],
      hotcityList: [],
      cityInfo: []
    }
  },
  created() {
    this.getCity()
    this.$toast.loading({
      message: '加载中...',
      forbidClick: true,
      loadingType: 'circular',
      duration: 0
    })
  },
  methods: {
    async getCity() {
      const res = await getCity(1)
      const { data } = await getHotCity()
      this.$toast.clear()
      this.cityInfo = res.data.body
      // console.log(res)
      // console.log(data)
      this.hotcityList = data.body
      // 创建列表数据
      this.firstName.forEach((item) => {
        // 加入首字母数据对象
        this.cityList.push({ Initials: item, city: [] })
      })
      this.cityList.forEach((item) => {
        res.data.body.forEach((i) => {
          if (i.short[0].toUpperCase() === item.Initials) {
            // 加入首字母对应的城市
            item.city.push(i.label)
          }
        })
      })
      // 筛选掉没有城市的首字母
      this.cityList = this.cityList.filter((item) => item.city.length !== 0)
      this.list = ['#', '热']
      this.cityList.forEach((item) => {
        this.list.push(item.Initials)
      })
    },
    changeCity(cityName) {
      // 点击修改当前城市
      this.cityInfo.forEach((item) => {
        if (item.label === cityName) {
          this.$store.commit('getNowCity', item)
        }
      })
      // 返回上一页
      this.$router.back()
    }
  },
  computed: {
    ...mapState(['city'])
  }
}
</script>

<style scoped lang="less">
.city_navbar {
  position: absolute;
  left: 0;
  right: 0;
}
:deep(.van-index-anchor) {
  font-size: 14px;
  color: #999;
}
.van-cell__title {
  font-size: 16px;
}
:deep(.van-index-bar__index) {
  padding: 0;
  font-size: 14px;
  margin: 7px 5px;
}
:deep(.van-index-bar__sidebar) {
  height: 500px;
  margin-top: -30px;
}
:deep(.van-index-bar__index--active) {
  width: 15px;
  height: 15px;
  color: #fff;
  background-color: #21b97a;
  border-radius: 50%;
}
.city_list_ab {
  position: absolute;
  left: 0;
  right: 0;
  top: 50px; //这里的50px是留出头部导航栏的高度，头部多高这里就多高
  bottom: 1px; //这里之所以设置1px是因为如果不设置将不会有头部‘悬浮固定’效果，头部将会随页面一起滚动，设置了1px以后滚动条只出现在内容区域，从而模拟悬浮固定效果
  overflow: auto; //可以让content区域出现滚动条而不是整个页面区域滚动，配合bottom:1px使用！
}
</style>
