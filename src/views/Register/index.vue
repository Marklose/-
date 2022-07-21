<template>
  <div>
    <LoginReg
      :title="title"
      :btn="btn"
      :isDisabled="isDisabled"
      @getInfo="reguser"
    ></LoginReg>
  </div>
</template>

<script>
import LoginReg from '@/components/LoginReg.vue'
import { Register } from '@/api'
import { Toast } from 'vant'
export default {
  components: {
    LoginReg
  },
  data() {
    return {
      title: '账号注册',
      btn: '注册',
      isDisabled: false
    }
  },
  methods: {
    async reguser(values) {
      // 请求开始按钮禁用
      this.isDisabled = true
      // 发送注册请求
      try {
        const res = await Register(values)
        // console.log(res)
        // 请求完成按钮启用
        this.isDisabled = false
        if (res.data.status === 200) {
          Toast.success('注册成功')
          // 成功跳转登录页面
          this.$router.go(-1)
        } else {
          Toast.fail(res.data.description || '服务端错误')
        }
      } catch (error) {
        Toast.fail('服务端错误')
      }
    }
  }
}
</script>

<style></style>
