<template>
  <div>
    <LoginReg
      :title="title"
      :btn="btn"
      :isDisabled="isDisabled"
      @getInfo="getLogin"
    ></LoginReg>
    <router-link class="toreg" to="/register">还没有账号，去注册~</router-link>
  </div>
</template>

<script>
import LoginReg from '@/components/LoginReg.vue'
import { UserLogin } from '@/api'
import { Toast } from 'vant'

export default {
  components: {
    LoginReg
  },
  data() {
    return {
      title: '账号登录',
      btn: '登录',
      isDisabled: false
    }
  },
  methods: {
    async getLogin(values) {
      // 请求开始按钮禁用
      this.isDisabled = true
      const res = await UserLogin(values)
      // 请求完成按钮启用
      this.isDisabled = false
      // console.log(res)
      // 判断请求回来的数据是否成功
      if (res.data.status === 200) {
        Toast.success('账号登录成功')
        // console.log(res.data.body.token)
        // 在本地储存token值
        localStorage.setItem('token', res.data.body.token)
        // 判断点击从哪里进入的登录界面，登录完成返回该界面
        if (this.$route.query.outName === 'favorite') {
          this.$router.replace({
            path: '/favorite'
          })
        } else if (this.$route.query.outName === 'rent') {
          this.$router.replace({
            path: '/rent'
          })
        } else {
          this.$router.go(-1)
        }
      } else {
        Toast.fail(res.data.description || '服务端错误')
      }
    }
  }
}
</script>

<style scoped lang="less">
.toreg {
  color: #666;
  text-align: center;
  margin: 0 auto;
  font-size: 14px;
  display: block;
}
</style>
