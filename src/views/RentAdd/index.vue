<template>
  <div>
    <router-view v-if="isSearch" @search="search"></router-view>

    <div v-else>
      <nav-bar title="发布房源"></nav-bar>
      <div style="padding-bottom: 70px; background-color: #f6f5f6">
        <van-cell title="房源信息" style="color: #21b97a; font-size: 15px" />
        <van-cell
          title="小区名称"
          is-link
          :value="communityName"
          @click="getcommunity"
          to="/rent/search"
        />
        <van-field v-model="price" placeholder="请输入租金/月">
          <template #label>
            <label style="letter-spacing: 28px">租金</label>
          </template>
          <template #extra>
            <label style="color: #888">￥/月</label>
          </template>
        </van-field>
        <van-field v-model="size" placeholder="请输入建筑面积">
          <template #label>
            <label>建筑面积</label>
          </template>
          <template #extra>
            <label style="color: #888">㎡</label>
          </template>
        </van-field>
        <van-cell is-link :value="roomType" @click="showPicker = true">
          <template #title>
            <label style="letter-spacing: 28px">户型</label>
          </template>
        </van-cell>
        <van-popup v-model="showPicker" position="bottom">
          <van-picker
            show-toolbar
            :columns="roomTypeList"
            @confirm="onConfirm"
            @cancel="showPicker = false"
          />
        </van-popup>
        <Pocker
          title="所在楼层"
          :columns="params.floor"
          @getPickerVal="getPickerVal"
        ></Pocker>
        <Pocker
          title="朝向"
          :columns="params.oriented"
          @getPickerVal="getPickerVal"
        ></Pocker>
        <van-cell title="房屋标题" />
        <van-field
          v-model="title"
          placeholder="请输入标题（例如：整租 小区名 2室 5000元）"
        />
        <van-cell title="房屋图像" />
        <div style="background-color: #fff">
          <van-uploader v-model="fileList" multiple upload-icon="plus" />
        </div>
        <van-cell title="房屋配置" />
        <van-grid :column-num="5" :border="false">
          <van-grid-item
            :class="{ icon_color: item.isDone }"
            v-for="(item, index) in supporting"
            :key="index"
            @click="changeSupporting(index)"
          >
            <template #text>
              <label
                :class="{ icon_color: item.isDone }"
                style="font-size: 14px"
                >{{ item.label }}</label
              >
            </template>
            <template #icon>
              <span
                :class="['iconfont', `icon-${icon[index]}`]"
                style="font-size: 25px"
              ></span>
            </template>
          </van-grid-item>
        </van-grid>
        <van-cell title="房屋描述" />
        <van-field
          v-model="message"
          rows="2"
          autosize
          type="textarea"
          placeholder="请输入房屋描述信息"
          style="height: 147px"
        />
        <div class="house_submit">
          <van-button class="house_submit_cancel" @click="onCancel"
            >取消</van-button
          >
          <van-button @click="onSubmit" class="house_submit_confirm"
            >提交</van-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import Pocker from '@/views/RentAdd/components/picker.vue'
import { getHouseParams, UpDateImages, UpDateHouses } from '@/api'
// UpDateImages, UpDateHouses
import pinyin from 'js-pinyin'
export default {
  components: { NavBar, Pocker },
  data() {
    return {
      params: {},
      isSearch: false,
      communityName: '请输入小区名称',
      communityId: '',
      price: '',
      size: '',
      title: '',
      message: '',
      showPicker: false,
      roomType: '请选择',
      roomTypeId: '',
      roomTypeList: ['一室', '二室', '三室', '四室', '四室+'],
      fileList: [],
      supporting: [],
      supportingName: [],
      icon: [],
      image: [],
      floor: '',
      oriented: ''
    }
  },
  created() {
    this.getHouseParams()
  },
  methods: {
    async getHouseParams() {
      const res = await getHouseParams(localStorage.getItem('token'))
      console.log(res)
      this.params = res.data.body
      console.log(this.params)
      this.supporting = res.data.body.supporting
      this.$set(this.supporting[5], 'label', '沙发')
      this.supporting.forEach((item) => {
        this.$set(item, 'isDone', false)
        this.icon.push(pinyin.getCamelChars(item.label))
      })
    },
    async onSubmit(values) {
      this.$toast.loading({
        message: '发布中...',
        forbidClick: true,
        duration: 0
      })
      for (const item of this.fileList) {
        const res = await UpDateImages(item)
        this.image.push(res.data.body[0])
      }
      this.supporting.forEach((item) => {
        if (item.isDone) {
          this.supportingName.push(item.label)
        }
      })
      this.params.roomType.forEach((item) => {
        if (item.label === this.roomType) {
          this.roomTypeId = item.value
        }
      })
      // const image = this.image.length > 1 ? this.image.join('|') : this.image[0]
      try {
        const res = await UpDateHouses(localStorage.getItem('token'), {
          title: this.title,
          description: this.message,
          houseImg:
            this.image.length > 1 ? this.image.join('|') : this.image[0],
          oriented: this.oriented,
          supporting: this.supportingName.join('|'),
          price: this.price,
          roomType: this.roomTypeId,
          size: this.size,
          floor: this.floor,
          community: this.communityId
        })
        this.$toast.clear()
        if (res.data.status === 200) {
          this.$dialog
            .confirm({
              title: '提示',
              message: '房源发布成功！',
              confirmButtonColor: '#108ee9',
              width: '270px',
              cancelButtonText: '去查看',
              confirmButtonText: '继续发布'
            })
            .then(() => {
              this.image = []
              this.supportingName = []
            })
            .catch(() => {
              this.$router.push({
                path: '/home/list'
              })
            })
        } else {
          this.$toast.fail('上传失败')
        }
      } catch (error) {
        this.$toast.fail('请填写完整')
      }
    },
    onCancel() {
      this.$dialog
        .confirm({
          title: '提示',
          message: '放弃发布房源？',
          confirmButtonColor: '#108ee9',
          width: '270px',
          cancelButtonText: '放弃',
          confirmButtonText: '继续编辑'
        })
        .then(() => {})
        .catch(() => {
          this.$router.back()
        })
    },
    getcommunity() {
      this.isSearch = true
    },
    // 获取搜索到的社区
    search(val, id) {
      console.log(val, id)
      if (val) {
        this.communityName = val
        this.communityId = id
      }
      this.isSearch = false
    },
    // 确认户型
    onConfirm(value) {
      this.roomType = value
      this.showPicker = false
    },
    // 点击修改图标高亮
    changeSupporting(index) {
      this.supporting[index].isDone = !this.supporting[index].isDone
    },
    // 获取弹出层的值
    getPickerVal(val) {
      this.params.floor.forEach((item) => {
        if (item.label === val) {
          this.floor = item.value
        }
      })
      this.params.oriented.forEach((item) => {
        if (item.label === val) {
          this.oriented = item.value
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
:deep(.van-picker__toolbar) {
  border-bottom: 1px solid #ddd;
  .van-picker__cancel {
    font-size: 17px;
    color: #108ee9;
  }
  .van-picker__confirm {
    font-size: 17px;
    color: #108ee9;
  }
}
.icon_color {
  color: #21b97a !important;
}
:deep(.van-grid-item__text) {
  color: none;
}
.van-grid {
  padding-bottom: 20px;
  background-color: #f6f5f6;
}
.house_submit {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 45px;
  display: flex;
  .house_submit_cancel {
    flex: 1;
    background-color: #fff;
    color: #21b97a;
    text-align: center;
    line-height: 45px;
    font-size: 15px;
    height: 100%;
    border: none;
  }
  .house_submit_confirm {
    flex: 1;
    background-color: #21b97a;
    text-align: center;
    line-height: 45px;
    color: #fff;
    font-size: 15px;
    height: 100%;
    border: none;
  }
}
</style>
