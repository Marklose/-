<template>
  <van-nav-bar
    :title="title"
    left-text=""
    left-arrow
    @click-left="onClickLeft"
    class="nav-custom"
  >
    <slot slot="title" name="title"></slot>
    <slot slot="right" name="right"></slot>
  </van-nav-bar>
</template>

<script>
export default {
  props: {
    title: {
      type: String
    },
    background: {
      type: String
    }
  },
  methods: {
    onClickLeft() {
      history.back()
    }
  }
}
</script>

<style scoped lang="less">
.nav-custom {
  background-color: #21b97a;
  // margin-bottom: 20px;
  :deep(.van-icon) {
    color: #fff;
  }
  :deep(.van-nav-bar__title) {
    color: #fff;
    font-size: 18px;
  }
}
</style>
