<template>
  <div>
    <NavBar :title="title"></NavBar>
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="username"
        placeholder="请输入账号"
        :rules="[
          {
            required: true,
            message: '账号不能为空'
          }
        ]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        placeholder="请输入密码"
        :rules="[
          {
            required: true,
            message: '密码不能为空'
          },
          {
            pattern: /^[0-9A-Za-z]{6,18}$/,
            message: '密码必须在6-18位字母或数字'
          }
        ]"
      />
      <div style="margin: 16px">
        <van-button
          block
          type="info"
          native-type="submit"
          @keyup.enter="onSubmit"
          color="#1cb676"
          :disabled="isDisabled"
          >{{ btn }}</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    btn: {
      type: String,
      required: true
    },
    isDisabled: {
      type: Boolean,
      default: () => false
    }
  },
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    onSubmit(values) {
      // console.log('submit', values)
      this.$emit('getInfo', values)
    },
    onClickLeft() {
      // this.$router.go(-1)
      history.back()
    }
  }
}
</script>

<style scoped lang="less">
//表单
:deep(.van-field__control) {
  width: 345px;
  height: 60px;
  font-size: 17px;
}
:deep(.van-button) {
  font-size: 18px;
  letter-spacing: 5px;
}
</style>
