<template>
  <view class="index">
    <view class="btn">
      <nut-button type="primary" @click="handleClick">get("name")</nut-button>
      <nut-button type="primary" @click="handleSetClick">set("name")</nut-button>
    </view>
  </view>
</template>

<script>
import { getStorage } from '@tarojs/taro';
import { useStorage } from '@slan-health/taro-vueuse';
export default {
  name: 'use-toast',
  components: {},
  setup() {
    const { get, set } = useStorage();

    const handleClick = () => {
      get("name").then(data => console.log("handleClick", data));
    };

    const handleSetClick = () => {
      set("name", "AAAA").then(data => console.log("handleSetClick", data));;
    };

    getStorage({
      key: 'ccc',
      success: (data) => console.log("success", data),
      fail: (err) => console.log("fail", err)
    })
    return {
      handleClick,
      handleSetClick,
    };
  },
};
</script>

<style lang="scss">
.index {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-align: center;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
