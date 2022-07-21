<template>
  <div>
    <!-- 用户头部 -->
    <div class="my_title">
      <img
        class="my_title_img"
        src="http://liufusong.top:8080/img/profile/bg.png"
        alt="背景图"
      />
      <div class="my_title_info" v-if="!isShow">
        <div class="my_via">
          <img
            class="my_via_img"
            src="http://liufusong.top:8080/img/profile/avatar.png"
            alt="头像"
          />
        </div>
        <div class="my_title_login">
          <p class="my_username">游客</p>
          <router-link class="my_to_login" to="/login">去登录</router-link>
        </div>
      </div>
      <div class="my_title_info" v-else>
        <div class="my_via">
          <img class="my_via_img" :src="avatar" alt="头像" />
        </div>
        <div class="my_title_login">
          <p class="my_username">{{ nickname }}</p>
          <div class="my_loginout" @click="loginOut">退出</div>
          <div>
            <router-link
              class="my_edit"
              :to="{ path: '/useredit', query: info }"
              >编辑个人资料 <van-icon name="play" />
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <!-- 用户个人资料 -->
    <van-grid
      :column-num="3"
      :border="false"
      icon-size="23px"
      class="my_flexbox"
    >
      <van-grid-item icon="star-o" @click="toFavorite" text="我的收藏" />
      <van-grid-item icon="wap-home-o" @click="toRent" text="我的出租" />
      <van-grid-item icon="underway-o" text="看房记录" />
      <van-grid-item icon="idcard" text="成为房主" />
      <van-grid-item icon="manager-o" text="个人资料" />
      <van-grid-item icon="service-o" text="联系我们" />
    </van-grid>
    <!-- 广告 -->
    <div class="my_ad">
      <img
        class="my_ad_img"
        src="http://liufusong.top:8080/img/profile/join.png"
        alt=""
      />
    </div>
  </div>
</template>

<script>
import { getUserInfo } from '@/api'
export default {
  name: 'Profile',
  data() {
    return {
      nickname: '游客',
      avatar: 'http://liufusong.top:8080/img/profile/avatar.png',
      isShow: localStorage.getItem('token'),
      info: {}
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo() {
      // 获取本地token值
      const token = localStorage.getItem('token')
      // 发送请求
      const res = await getUserInfo(token)
      console.log(res)
      if (res.data.status === 200) {
        this.avatar = res.data.body.avatar.includes('http')
          ? res.data.body.avatar
          : 'http://liufusong.top:8080' + res.data.body.avatar
        this.nickname = res.data.body.nickname
        this.info = res.data.body
        // console.log(this.avatar)
      } else {
        // this.$toast('登录过期，请重新登录')
        // token值过期时自动退出登录
        localStorage.removeItem('token')
        this.isShow = false
      }
    },
    async loginOut() {
      // 点击退出判断是否退出
      await this.$dialog.confirm({
        title: '提示',
        message: '是否确认退出',
        confirmButtonColor: '#108ee9',
        width: '270px',
        confirmButtonText: '退出'
      })
      // 清空本地token并退出
      localStorage.removeItem('token')
      this.isShow = false
    },
    toFavorite() {
      // 判断是否登录，未登录则跳转登录界面
      this.$router.push({
        path: this.isShow ? '/favorite' : '/login',
        query: { outName: 'favorite' }
      })
    },
    toRent() {
      this.$router.push({
        path: this.isShow ? '/rent' : '/login',
        query: { outName: 'rent' }
      })
    }
  }
}
</script>

<style scoped lang="less">
//用户头部信息
.my_title {
  position: relative;
  background-color: #fff;
  height: 300px;
  text-align: center;
  margin-bottom: 10px;
  .my_title_img {
    width: 100%;
    height: 191px;
  }
  .my_title_info {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    margin: 50px auto 0;
    padding: 0 20px;
    width: 278px;
    height: 165px;
    background-color: #fff;
    text-align: center;
    box-shadow: 0 0 10px 3px #ddd;
    .my_via {
      position: relative;
      transform: translateY(-50%);
      border-radius: 50%;
      width: 60px;
      height: 60px;
      border: 5px solid #f5f5f5;
      box-shadow: 0 2px 2px #bdbdbd;
      display: inline-block;
      .my_via_img {
        width: 100%;
        border-radius: 50%;
      }
    }
    .my_title_login {
      .my_username {
        font-size: 13px;
        margin-top: -20px;
        margin-bottom: 25px;
        text-align: center;
      }
      .my_to_login {
        display: inline-block;
        background-color: #21b97a;
        font-size: 13px;
        height: 30px;
        line-height: 30px;
        padding: 0 15px;
        border-radius: 5px;
        text-align: center;
        color: #fff;
      }
      .my_loginout {
        display: inline-block;
        width: 30px;
        border-radius: 30px;
        color: #fff;
        padding: 2px 15px;
        background: #21b97a;
        font-size: 12px;
        transform: translateY(-20px);
      }
      .my_edit {
        color: #999;
        font-size: 12px;
      }
    }
  }
}

//用户个人信息
.my_flexbox {
  margin-bottom: 10px;
  :deep(.van-grid-item__content) {
    margin-bottom: 10px;
  }
}
//广告
.my_ad {
  text-align: center;
  .my_ad_img {
    width: 92%;
  }
}
</style>
