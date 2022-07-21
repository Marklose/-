<template>
  <div>
    <van-cell is-link :value="value" @click="isshowPicker">
      <template #title>
        <label :class="{ letter: title.length === 2 }">{{ title }}</label>
      </template>
    </van-cell>
    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="list"
        @confirm="onConfirm"
        @cancel="showPicker = false"
      />
    </van-popup>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String
    },
    columns: {
      type: Array
    }
  },
  data() {
    return {
      value: '请选择',
      showPicker: false,
      list: []
    }
  },
  methods: {
    onConfirm(value) {
      console.log(value)
      this.value = value
      this.showPicker = false
      this.$emit('getPickerVal', value)
    },
    isshowPicker() {
      this.list = []
      if (this.columns) {
        this.columns.forEach((item) => {
          this.list.push(item.label)
        })
        this.showPicker = true
      }
    }
  }
}
</script>

<style scoped lang="less">
.letter {
  letter-spacing: 28px;
}
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
</style>
