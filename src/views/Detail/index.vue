<template>
  <div>
    <van-skeleton title :row="20" v-if="!houseinfo.oriented" />
    <div class="container" v-else>
      <!-- 标题栏 -->
      <NavBar :title="houseinfo.community"></NavBar>
      <!-- 轮播图 -->
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img class="swipe_img" v-lazy="image" />
        </van-swipe-item>
      </van-swipe>
      <!-- 房屋信息 -->
      <div class="HouseDetail_info__w_ymp">
        <h3 class="HouseDetail_infoTitle__E1ASO">{{ houseinfo.title }}</h3>
        <div class="am-flexbox HouseDetail_tags__3VXf3">
          <div class="am-flexbox-item">
            <van-tag
              v-for="(item, index) in houseinfo.tags"
              :key="index"
              type="primary"
              size="medium"
              color="#e1f5f8"
              text-color="#39becd"
              >{{ item }}</van-tag
            >
          </div>
        </div>
        <div class="am-flexbox HouseDetail_infoPrice__3SZhW">
          <div class="am-flexbox-item HouseDetail_infoPriceItem__Rxzot">
            <div>
              {{ houseinfo.price }}
              <span class="HouseDetail_month__uBAXz">/月</span>
            </div>
            <div>租金</div>
          </div>
          <div class="am-flexbox-item HouseDetail_infoPriceItem__Rxzot">
            <div>{{ houseinfo.roomType }}</div>
            <div>房型</div>
          </div>
          <div class="am-flexbox-item HouseDetail_infoPriceItem__Rxzot">
            <div>{{ houseinfo.size }}平米</div>
            <div>面积</div>
          </div>
        </div>
        <div class="am-flexbox HouseDetail_infoBasic__3prns">
          <div class="am-flexbox-item">
            <div>
              <span class="HouseDetail_title__iGpj_">装修：</span>
              精装
            </div>
            <div>
              <span class="HouseDetail_title__iGpj_">楼层：</span>
              {{ houseinfo.floor }}
            </div>
          </div>
          <div class="am-flexbox-item">
            <div>
              <span class="HouseDetail_title__iGpj_">朝向：</span>
              {{ houseinfo.oriented[0] }}
            </div>
            <div>
              <span class="HouseDetail_title__iGpj_">类型：</span>
              普通住宅
            </div>
          </div>
        </div>
      </div>
      <!-- 房屋地址 -->
      <div class="HouseDetail_map__21q54">
        <div class="HouseDetail_mapTitle__3reEo">
          小区：<span>{{ houseinfo.community }}</span>
        </div>
        <div class="HouseDetail_mapContainer__1a6On">
          <BaiduMap :center="center"></BaiduMap>
        </div>
      </div>
      <!-- 房屋配套 -->
      <div class="HouseDetail_about__1W1Px">
        <div class="HouseDetail_houseTitle__3dg6k">房屋配套</div>
        <van-grid :column-num="3" :border="false">
          <van-grid-item
            style="flex-basis: 0%"
            v-for="(item, index) in houseinfo.supporting"
            :key="index"
            icon="photo-o"
            :text="item"
          >
            <template #icon>
              <span
                :class="['iconfont', `icon-${housesupporting[index]}`]"
              ></span> </template
          ></van-grid-item>
        </van-grid>
      </div>
      <!-- 房源概况 -->
      <div class="HouseDetail_set__26npJ">
        <div class="HouseDetail_houseTitle__3dg6k">房屋概况</div>
        <div class="HouseDetail_contact__O_lsw">
          <div class="HouseDetail_user__TZj3w">
            <img src="http://liufusong.top:8080/img/avatar.png" alt="" />
            <div class="HouseDetail_useInfo__FrBlz">
              <div>王女士</div>
              <div class="HouseDetail_userAuth__Xr6gY">
                <van-icon name="shield-o" />已认证房主
              </div>
            </div>
          </div>
          <span class="HouseDetail_userMsg__3mcRl">发消息</span>
        </div>
        <div class="HouseDetail_descText__2JsQA">
          1.周边配套齐全，地铁四号线陶然亭站，交通便利，公交云集，距离北京南站、西站都很近距离。
          2.小区规模大，配套全年，幼儿园，体育场，游泳馆，养老院，小学。
          3.人车分流，环境优美。
          4.精装两居室，居家生活方便，还有一个小书房，看房随时联系。
        </div>
      </div>
      <!-- 猜你喜欢 -->
      <div class="HouseDetail_recommend__1L7WT">
        <div class="HouseDetail_houseTitle__3dg6k">猜你喜欢</div>
        <HouseListItem :houseList="houseList"></HouseListItem>
      </div>
      <!-- 底部工具栏 -->
      <div class="HouseDetail_floor">
        <van-button type="default" @click="getFavorite">
          <template #icon v-if="!isFavorite">
            <van-icon name="star-o" />
          </template>
          <template #icon v-else>
            <van-icon name="star" style="color: red" />
          </template>
          收藏</van-button
        >
        <van-button type="default">在线咨询</van-button>
        <van-button type="default" color="#21b97a">电话预约</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getHouseInfos,
  getHouseParams,
  getHouse,
  getHouseFavoriteInfo,
  addHouseFavorite,
  delHouseFavorite
} from '@/api'
import NavBar from '@/components/NavBar.vue'
import HouseListItem from '@/components/HouseListItem.vue'
import pinyin from 'js-pinyin'
import BaiduMap from '@/components/BaiduMap.vue'
export default {
  components: { NavBar, HouseListItem, BaiduMap },
  data() {
    return {
      houseinfo: {},
      images: [],
      oriented: '',
      floor: '',
      houseList: [],
      housesupporting: [],
      center: { lng: 0, lat: 0 },
      isFavorite: false
    }
  },
  created() {
    this.getHouseInfos()
  },
  methods: {
    async getHouseInfos() {
      // 获取房源信息
      const res = await getHouseInfos(this.$route.query.code)
      console.log(res)
      this.houseinfo = res.data.body
      // 赋值经纬度
      this.center.lat = res.data.body.coord.latitude
      this.center.lng = res.data.body.coord.longitude
      console.log(this.center)
      // 获取图片
      this.houseinfo.houseImg.forEach((item) => {
        this.images.push('http://liufusong.top:8080' + item)
      })
      // 获取拿到的标签的首字母方便渲染相对应的icon
      this.houseinfo.supporting.forEach((item) => {
        this.housesupporting.push(pinyin.getCamelChars(item))
      })
      // 获取是否收藏
      const resc = await getHouseFavoriteInfo(
        localStorage.getItem('token'),
        this.$route.query.code
      )
      this.isFavorite = resc.data.body.isFavorite
      // 根据当前房源楼层和朝向渲染猜你喜欢
      const { data } = await getHouseParams(localStorage.getItem('token'))
      data.body.floor.forEach((item) => {
        if (item.label === this.houseinfo.floor) {
          this.floor = item.value
        }
      })
      data.body.oriented.forEach((item) => {
        if (item.label === this.houseinfo.oriented[0]) {
          this.oriented = item.value
        }
      })
      const resa = await getHouse({
        cityId: this.$store.state.city.value,
        floor: this.floor,
        oriented: this.oriented,
        start: 1,
        end: 3
      })
      this.houseList = resa.data.body.list
    },
    async getFavorite() {
      const token = localStorage.getItem('token')
      if (!token) {
        await this.$dialog.confirm({
          title: '好客租房',
          message: '您还未登录，是否跳转登录页面',
          confirmButtonColor: '#108ee9',
          width: '270px',
          confirmButtonText: '跳转'
        })
        this.$router.push({
          path: '/login'
        })
      }
      if (!this.isFavorite) {
        try {
          await addHouseFavorite(token, this.$route.query.code)
          this.isFavorite = true
          this.$toast.success('添加收藏成功')
        } catch (error) {
          this.$toast.fail('添加收藏失败')
        }
      } else {
        try {
          await delHouseFavorite(token, this.$route.query.code)
          this.isFavorite = false
          this.$toast.success('取消收藏成功')
        } catch (error) {
          this.$toast.fail('取消收藏失败')
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.body {
  font-size: 14px;
}
:deep(.van-nav-bar__title){
  font-size: 16px !important;
}
.container {
  padding-bottom: 50px;
  background-color: #f6f5f6;
}
// 轮播图
.swipe_img {
  width: 100%;
  height: 252px;
}
// 房屋信息
.HouseDetail_info__w_ymp {
  background: #fff;
  padding: 15px;
  .HouseDetail_infoTitle__E1ASO {
    font-weight: 400;
    font-size: 16px;
    color: #333;
    margin: 16px 0 10px 0;
  }
  .am-flexbox {
    text-align: left;
    overflow: hidden;
    display: flex;
    align-items: center;
  }
  .HouseDetail_tags__3VXf3 {
    position: relative;
    margin: 10px 0;
  }
  .am-flexbox-item {
    box-sizing: border-box;
    flex: 1 1;
    // margin-left: 8px;
    min-width: 10px;
  }
  .van-tag{
    margin-right: 3px;
  }
  .HouseDetail_infoPrice__3SZhW {
    border-top: 1px solid #cecece;
    border-bottom: 1px solid #cecece;
    margin: 15px 0;
    padding: 15px 0;
    .HouseDetail_infoPriceItem__Rxzot {
      text-align: center;
      color: #999;
      div {
        height: 26px;
        line-height: 26px;
        font-size: 14px;
      }

      .HouseDetail_month__uBAXz {
        text-align: center;
        line-height: 26px;
        color: #fa5741;
        font-size: 12px;
        font-weight: 400;
      }
    }
    .HouseDetail_infoPriceItem__Rxzot div:first-child {
      color: #fa5741;
      font-size: 20px;
      font-weight: bolder;
    }
  }
  .HouseDetail_infoBasic__3prns {
    font-size: 13px;
    .HouseDetail_title__iGpj_ {
      display: inline-block;
      color: #999;
      padding-right: 5px;
      line-height: 26px;
      // width: 44px;
    }
  }
}
//房屋地址
.HouseDetail_map__21q54 {
  margin-top: 10px;
  background: #fff;
  font-size: 14px;
  .HouseDetail_mapTitle__3reEo {
    margin: 0 3%;
    line-height: 44px;
    color: #666;
    span {
      color: #333;
    }
  }
  .HouseDetail_mapContainer__1a6On {
    height: 145px;
  }
}
//房屋配套
.HouseDetail_about__1W1Px {
  margin-bottom: 10px;
  padding: 0 10px;
  background: #fff;
  .HouseDetail_houseTitle__3dg6k {
    font-weight: 600;
    font-size: 15px;
    margin-bottom: 10px;
    padding: 15px 0;
    border-bottom: 1px solid #cecece;
  }
  .van-grid-item {
    // width: 50px;
    // height: 90px;
    margin: 0 5px;
    flex-basis: 0% !important;
    :deep(.van-grid-item__content) {
      width: 60px;
      height: 70px;
      padding: 0;
      .van-grid-item__text{
        margin-top: 5px;
        font-size: 14px;
      }
    }
    .iconfont{
      font-size: 22px;
    }
  }
}
.HouseDetail_houseTitle__3dg6k {
  font-weight: 600;
  font-size: 15px;
  margin-bottom: 10px;
  padding: 15px 0;
  border-bottom: 1px solid #cecece;
}
//房屋概况
.HouseDetail_set__26npJ {
  margin: 10px 0;
  padding: 0 10px;
  line-height: 150%;
  background: #fff;
  font-size: 14px;
  .HouseDetail_contact__O_lsw {
    position: relative;
    .HouseDetail_user__TZj3w {
      margin-bottom: 10px;
      display: flex;
      img {
        width: 52px;
        height: 52px;
        margin: 10px 10px 0 0;
      }
      .HouseDetail_useInfo__FrBlz {
        padding: 15px 0 0 5px;
        .HouseDetail_userAuth__Xr6gY {
          font-size: 12px;
          color: #fa5741;
          .van-icon {
            margin-right: 5px;
          }
        }
      }
    }
    .HouseDetail_userMsg__3mcRl {
      position: absolute;
      right: 15px;
      top: 20px;
      color: #33be85;
      border: 1px solid #33be85;
      border-radius: 3px;
      padding: 3px 15px;
    }
  }
  .HouseDetail_descText__2JsQA {
    line-height: 1.6;
    padding: 10px 0;
    color: #333;
  }
}
//猜你喜欢
.HouseDetail_recommend__1L7WT {
  margin: 10px 0 0;
  padding: 0 15px;
  background: #fff;
}
// 底部导航
.HouseDetail_floor {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  // line-height: 50px;
  // border-top: 1px solid #cecece;
  // color: #999;
  background-color: #fff;
  display: flex;
  .van-button {
    flex: 1;
    font-size: 17px;
    height: 100%;
    color:#999
    // padding-top: 10px;
  }
}
</style>
