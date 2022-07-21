<template>
  <div>
    <!-- 导航栏 -->
    <NavBar title="修改个人信息"></NavBar>
    <!-- 修改信息 -->
    <van-form @submit="onSubmit">
      <van-field name="avatar" label="更换头像">
        <template #input>
          <van-uploader v-model="uploader" :max-count="1" />
        </template>
      </van-field>
      <van-field name="gender" label="性别">
        <template #input>
          <van-radio-group v-model="gender" direction="horizontal">
            <van-radio name="0">男</van-radio>
            <van-radio name="1">女</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field
        name="nickname"
        v-model="nickname"
        label="用户名"
        placeholder="请输入用户名"
      />
      <van-field
        label="手机号"
        v-model="phone"
        required
        clearable
        name="phone"
        placeholder="请输入手机号"
        :rules="[
          { required: true, message: '手机号不能为空' },
          { pattern: /^1[3|5|7|8]\d{9}$/, message: '手机号格式错误' }
        ]"
      />
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit" color="#1cb676"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { upDateInfo } from '@/api/useredit'
import { UpDateImages } from '@/api'
// import { dataURLtoBlob } from '@/api/base64tourl'
// import { Dialog } from 'vant'
export default {
  data() {
    return {
      uploader: [
        {
          url: 'http://liufusong.top:8080' + this.$route.query.avatar
        }
      ],
      gender: this.$route.query.gender,
      nickname: this.$route.query.nickname,
      phone: this.$route.query.phone,
      token: localStorage.getItem('token')
    }
  },
  methods: {
    async onSubmit(values) {
      console.log(values)
      const res = await UpDateImages(this.uploader)
      console.log(res)
      // 将base64文件图片转换为路径
      // if (values.avatar[0].content) {
      //   const blobData = dataURLtoBlob(values.avatar[0].content)
      //   const urld = window.URL.createObjectURL(blobData)
      // 把路径赋值给获取到的avatar属性
      // values.avatar = urld
      // } else {
      //   values.avatar = this.uploader[0].url
      // }
      // console.log('submit', values)
      values.avatar = res.data.body[0]
      // 发送更新请求
      this.$dialog
        .confirm({
          title: '提示',
          message: '是否确认修改',
          confirmButtonColor: '#108ee9',
          width: '270px'
        })
        .then(async () => {
          try {
            await upDateInfo(this.token, values)
            this.$toast.success('更新信息成功')
          } catch (error) {
            this.$toast.fail('更新失败')
          } finally {
            this.$router.push({
              path: '/home/profile'
            })
          }
        })
        .catch(() => {
          // on cancel
        })
    }
  }
}
</script>

<style></style>
