<template>
  <div>
    <form action="/">
      <van-search
        :clearable="false"
        v-model="value"
        show-action
        placeholder="请输入小区或地址"
        @search="onSearch"
        @cancel="onCancel"
        @focus="movesearch($event)"
        @blur="moveback($event)"
        @keyup="getkeyword"
      />
    </form>
    <van-cell
      :title="item.communityName"
      v-for="(item, index) in list"
      :key="index"
      @click="onSearch(item.communityName, item.community)"
    />
  </div>
</template>

<script>
import { getCommunity } from '@/api'
export default {
  data() {
    return {
      value: '',
      list: []
    }
  },
  methods: {
    onSearch(val, id) {
      this.$emit('search', val, id)
      this.$router.back()
    },
    onCancel() {
      this.$emit('search')
      this.$router.back()
    },
    movesearch(e) {
      e.currentTarget.parentElement.parentElement.parentElement.style.transition =
        'all 0.5s'
      e.currentTarget.parentElement.parentElement.parentElement.style.transform =
        'translateX(-80px)'
    },
    moveback(e) {
      e.currentTarget.parentElement.parentElement.parentElement.style.transform =
        'translateX(0px)'
    },
    getkeyword() {
      clearTimeout(this.timer)
      this.timer = setTimeout(async () => {
        const res = await getCommunity(this.value, this.$store.state.city.value)
        console.log(res)
        this.list = res.data.body
      }, 500)
    }
  }
}
</script>

<style scoped lang="less">
:deep(.van-search__content) {
  padding-left: 80px;
}
</style>
