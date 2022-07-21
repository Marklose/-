<template>
  <div>
    <van-card
      price="2.00"
      :thumb="`http://liufusong.top:8080${item.houseImg}`"
      v-for="(item, index) in houseList"
      :key="index"
      @click="getHouseInfo(item.houseCode)"
    >
      <template #title>
        <h3 class="card_house_title">{{ item.title }}</h3>
      </template>
      <template #desc>
        <div class="card_house_desc">{{ item.desc }}</div>
      </template>
      <template #tags>
        <van-tag
          v-for="(i, s) in item.tags"
          :key="s"
          type="danger"
          size="medium"
          color="#e1f5f8"
          text-color="#39becd"
          >{{ i }}</van-tag
        >
      </template>
      <template #price>
        <div class="card_house_price">
          <span class="card_money">{{ item.price }}</span> 元/月
        </div>
      </template>
    </van-card>
  </div>
</template>

<script>
export default {
  props: {
    houseList: Array
  },
  methods: {
    getHouseInfo(code) {
      this.$router.push({
        path: '/detail',
        query: { code }
      })
    }
  }
}
</script>

<style scoped lang="less">
.van-card {
  height: 120px;
  position: relative;
  box-sizing: border-box;
  justify-content: space-around;
  padding-top: 18px;
  border-bottom: 1px solid #e5e5e5;
  background-color: #fff;
  .van-card__thumb {
    width: 106px;
    height: 80px;
    padding-right: 12px;
  }
  .card_house_title {
    font-size: 15px;
    color: #394043;
    font-weight: bold;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .card_house_desc {
    padding: 2px 0 3px 0;
    color: #afb2b3;
  }
  :deep(.van-tag) {
    margin-right: 3px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .card_house_price {
    font-size: 12px;
    color: #fa5741;
    .card_money {
      font-size: 16px;
      font-weight: bolder;
    }
  }
}
</style>
