<template>
  <div>
    <!-- 导航栏 -->
    <NavBar>
      <template #title>
        <Search></Search>
      </template>
    </NavBar>
    <!-- 筛选栏 -->
    <div class="navfilter_box">
      <div class="dropdown_filter_first">
        <van-dropdown-menu active-color="#21b97a">
          <van-dropdown-item :ref="ref[0]">
            <div
              slot="title"
              :class="{
                dropdown_textcolor:
                  ref[0] === index || area !== 'null' || subway !== 'null'
              }"
              @click="changeColor(ref[0])"
            >
              区域
            </div>
            <van-picker
              show-toolbar
              :columns="columns"
              :loading="loading"
              value-key="label"
              toolbar-position="bottom"
              @confirm="onConfirm"
              @cancel="onCancel"
              ref="arealist"
            />
          </van-dropdown-item>
          <van-dropdown-item :ref="ref[1]">
            <div
              slot="title"
              :class="{
                dropdown_textcolor: ref[1] === index || rentType !== 'null'
              }"
              @click="changeColor(ref[1])"
            >
              方式
            </div>
            <van-picker
              show-toolbar
              :columns="modeList"
              :loading="loading"
              toolbar-position="bottom"
              value-key="label"
              @confirm="onConfirm"
              @cancel="onCancel"
              ref="modeval"
            />
          </van-dropdown-item>
          <van-dropdown-item :ref="ref[2]">
            <div
              slot="title"
              :class="{
                dropdown_textcolor: ref[2] === index || price !== 'null'
              }"
              @click="changeColor(ref[2])"
            >
              租金
            </div>
            <van-picker
              show-toolbar
              :columns="rentList"
              :loading="loading"
              toolbar-position="bottom"
              value-key="label"
              @confirm="onConfirm"
              @cancel="onCancel"
              ref="rentval"
            />
          </van-dropdown-item>
        </van-dropdown-menu>
      </div>

      <div class="dropdown_filter">
        <div class="dropdown_filter_title">
          <div
            class="dropdown_filter_empty"
            :class="{
              dropdown_textcolor: ref[3] === index || more.length !== 0
            }"
            @click="showPopup(ref[3])"
          >
            筛选
          </div>
        </div>
      </div>
      <van-popup
        v-model="show"
        position="right"
        :style="{ height: '100%', width: '80%' }"
      >
        <div style="padding-bottom: 60px">
          <div>
            <van-cell title="户型" :border="false" />
            <van-grid :column-num="2" gutter="20px" :border="false">
              <van-grid-item v-for="(item, index) in floor" :key="index">
                <template #default>
                  <div
                    class="text"
                    :class="{ text_active: item.isDone }"
                    @click="change(item, index)"
                  >
                    {{ item.label }}
                  </div>
                </template>
              </van-grid-item>
            </van-grid>
          </div>
          <div>
            <van-cell title="朝向" :border="false" />
            <van-grid :column-num="2" gutter="20px" :border="false">
              <van-grid-item v-for="(item, index) in oriented" :key="index">
                <template #default>
                  <div
                    class="text"
                    :class="{ text_active: item.isDone }"
                    @click="change(item, index)"
                  >
                    {{ item.label }}
                  </div>
                </template>
              </van-grid-item>
            </van-grid>
          </div>
          <div>
            <van-cell title="楼层" :border="false" />
            <van-grid :column-num="2" gutter="20px" :border="false">
              <van-grid-item v-for="(item, index) in roomType" :key="index">
                <template #default>
                  <div
                    class="text"
                    :class="{ text_active: item.isDone }"
                    @click="change(item, index)"
                  >
                    {{ item.label }}
                  </div>
                </template>
              </van-grid-item>
            </van-grid>
          </div>
          <div>
            <van-cell title="房屋亮点" :border="false" />
            <van-grid :column-num="2" gutter="20px" :border="false">
              <van-grid-item
                v-for="(item, index) in characteristic"
                :key="index"
              >
                <template #default>
                  <div
                    class="text"
                    :class="{ text_active: item.isDone }"
                    @click="change(item, index)"
                  >
                    {{ item.label }}
                  </div>
                </template>
              </van-grid-item>
            </van-grid>
          </div>
        </div>
        <div class="popup_com_floor">
          <span class="popup_com_clear" @click="clear">清除</span>
          <span class="popup_com_true" @click="confirm">确认</span>
        </div>
      </van-popup>
    </div>
    <!-- 房屋列表 -->
    <van-list
      v-model="listloading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <HouseListItem
        :houseList="houseList"
      ></HouseListItem>
    </van-list>
  </div>
</template>

<script>
import Search from '@/components/Search.vue'
import { getCityCondition, getHouse } from '@/api'
import HouseListItem from '@/components/HouseListItem.vue'
export default {
  name: 'List',
  components: {
    Search,
    HouseListItem
  },
  data() {
    return {
      show: false,
      index: 'area',
      ref: ['area', 'mode', 'rent', 'screen'],
      loading: true,
      columns: [],
      sonCity: [],
      modeList: [],
      rentList: [],
      listloading: false,
      finished: false,
      houseList: [],
      end: 1,
      area: 'null',
      subway: 'null',
      rentType: 'null',
      price: 'null',
      floor: [],
      oriented: [],
      roomType: [],
      characteristic: [],
      more: []
    }
  },
  created() {
    this.getCity()
  },
  methods: {
    async getCity() {
      // 获取子城市
      const res = await getCityCondition(this.$store.state.city.value)
      // console.log(res)
      this.columns.push(res.data.body.area)
      this.columns.push(res.data.body.subway)
      this.modeList = res.data.body.rentType
      this.rentList = res.data.body.price
      this.floor = res.data.body.floor
      this.floor.forEach((item) => {
        this.$set(item, 'isDone', false)
      })
      this.oriented = res.data.body.oriented
      this.oriented.forEach((item) => {
        this.$set(item, 'isDone', false)
      })
      this.roomType = res.data.body.roomType
      this.roomType.forEach((item) => {
        this.$set(item, 'isDone', false)
      })
      this.characteristic = res.data.body.characteristic
      this.characteristic.forEach((item) => {
        this.$set(item, 'isDone', false)
      })
      this.columns[0].children[0].children = [{ label: '', value: 'null' }]
      this.columns[1].children[0].children = [{ label: '', value: 'null' }]
      this.loading = false
    },
    // 确认筛选数据
    onConfirm(value, index) {
      // console.log(value, index)
      // 点击后关闭菜单栏
      this.$refs.area.toggle(false)
      this.$refs.mode.toggle(false)
      this.$refs.rent.toggle(false)
      // 判断区域地铁的选中项赋值
      if (this.$refs?.arealist?.getValues()[0].value === 'area') {
        this.subway = 'null'
        if (this.$refs?.arealist?.getValues()[2].value === 'null') {
          this.area = this.$refs?.arealist?.getValues()[1].value
        } else {
          this.area = this.$refs?.arealist?.getValues()[2].value
        }
      } else {
        this.area = 'null'
        if (this.$refs?.arealist?.getValues()[2].value === 'null') {
          this.subway = this.$refs?.arealist?.getValues()[1].value
        } else {
          this.subway = this.$refs?.arealist?.getValues()[2].value
        }
      }
      // 方法筛选
      this.rentType = this.$refs?.modeval?.getValues()[0].value || 'null'
      // 租金筛选
      this.price = this.$refs?.rentval?.getValues()[0].value || 'null'
      this.end = 1
      this.houseList = []
      this.finished = false
      this.listloading = true
      this.onLoad()
    },
    onCancel() {
      // 关闭菜单
      this.$refs.area.toggle(false)
      this.$refs.mode.toggle(false)
      this.$refs.rent.toggle(false)
    },
    changeColor(ref) {
      // 设置高亮
      this.index = ref
    },
    // 显示右侧弹出层
    showPopup(ref) {
      this.index = ref
      this.$refs.area.toggle()
      this.show = true
    },
    // 加载列表
    async onLoad() {
      const res = await getHouse({
        cityId: this.$store.state.city.value,
        area: this.area,
        subway: this.subway,
        rentType: this.rentType,
        price: this.price,
        more: this.more.join(','),
        start: this.end,
        end: this.end + 10
      })
      // console.log(res)

      if (res.data.body.list.length) {
        this.end += 10
        this.listloading = false
        this.houseList.push(...res.data.body.list)
      } else {
        this.finished = true
      }
    },
    // 跳转房源详情
    getHouseInfo(code) {
      this.$router.push({
        path: '/detail',
        query: { code }
      })
    },
    change(item, index) {
      // console.log(item)
      if (this.floor.includes(item)) {
        this.floor[index].isDone = !this.floor[index].isDone
      }
      if (this.oriented.includes(item)) {
        this.oriented[index].isDone = !this.oriented[index].isDone
      }
      if (this.roomType.includes(item)) {
        this.roomType[index].isDone = !this.roomType[index].isDone
      }
      if (this.characteristic.includes(item)) {
        this.characteristic[index].isDone = !this.characteristic[index].isDone
      }
    },
    clear() {
      this.floor.forEach((item) => {
        item.isDone = false
      })
      this.oriented.forEach((item) => {
        item.isDone = false
      })
      this.roomType.forEach((item) => {
        item.isDone = false
      })
      this.characteristic.forEach((item) => {
        item.isDone = false
      })
      this.more = []
    },
    confirm() {
      this.floor.forEach((item) => {
        if (item.isDone) {
          this.more.push(item.value)
        }
      })
      this.oriented.forEach((item) => {
        if (item.isDone) {
          this.more.push(item.value)
        }
      })
      this.roomType.forEach((item) => {
        if (item.isDone) {
          this.more.push(item.value)
        }
      })
      this.characteristic.forEach((item) => {
        if (item.isDone) {
          this.more.push(item.value)
        }
      })
      this.show = false
      this.end = 1
      this.houseList = []
      this.finished = false
      this.listloading = true
      this.onLoad()
    }
  }
}
</script>

<style scoped lang="less">
:deep(.van-nav-bar__title) {
  margin: 0 0 0 30px;
  max-width: none;
}
// 筛选栏
.navfilter_box {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  .dropdown_filter_first {
    flex: 3;
    :deep(.van-picker__toolbar) {
      height: 50px;
      .van-picker__cancel {
        flex: 2;
        color: #21b97a;
        font-size: 18px;
      }
      .van-picker__confirm {
        flex: 4;
        font-size: 18px;
        background-color: #21b97a;
        color: #fff;
      }
    }

    :deep(.van-ellipsis) {
      font-size: 17px;
    }
    :deep(.van-dropdown-menu__bar) {
      box-shadow: none;
    }
  }

  .dropdown_filter {
    flex: 1;
    display: flex;
    -webkit-box-flex: 1;
    align-items: center;
    justify-content: center;
    min-width: 0;
    cursor: pointer;
    .dropdown_filter_title {
      position: relative;
      box-sizing: border-box;
      max-width: 100%;
      padding: 0 8px;
      color: #323233;
      font-size: 16px;
      margin-top: -4px;
      background-color: #fff;
      .dropdown_filter_empty {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .dropdown_filter_empty::after {
        position: absolute;
        top: 50%;
        right: -0.10667rem;
        margin-top: -0.13333rem;
        border: 0.08rem solid;
        border-color: transparent transparent #dcdee0 #dcdee0;
        -webkit-transform: rotate(-45deg);
        transform: rotate(-45deg);
        opacity: 0.8;
        content: '';
      }
    }
  }
  .dropdown_textcolor {
    color: #21b97a;
  }
  .van-popup {
    margin-bottom: 50px;
    transform: none !important;
    margin-top: -90%;
  }
  .van-cell {
    font-size: 15px;
    .van-cell__value {
      margin-top: 10px;
      flex: 5;
    }
  }
  .van-grid {
    padding: 0 40px;
    margin-left: 20px;
    .van-grid-item {
      width: 60px;
      height: 36px;
    }
  }
  .text {
    width: 60px;
    // height: 32px;
    padding: 3px 5px;
    font-size: 12px;
    text-align: center;
    border: 1px solid #cecece;
    color: #888;
  }

  .popup_com_floor {
    position: fixed;
    bottom: 0;
    left: 20%;
    width: 100%;
    display: flex;
    .popup_com_clear {
      flex: 2;
      text-align: center;
      line-height: 50px;
      background-color: #fff;
      color: #21b97a;
    }
    .popup_com_true {
      flex: 4;
      // text-align: center;
      padding-left: 80px;
      line-height: 50px;
      background-color: #21b97a;
      color: #fff;
    }
  }
}
.text_active {
  border: 1px solid #21b97a !important;
  color: #21b97a !important;
  background-color: #defaef !important;
}
//房屋列表

:deep(.van-list) {
  padding-bottom: 50px;
}
</style>
