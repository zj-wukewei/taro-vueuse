<template>
  <view class="index">
    <view class="btn">
      <nut-button v-for="item in HooksList" type="primary" @click="handleOnItemClick(item)">{{ item }}</nut-button>
    </view>
  </view>
</template>

<script>
import { navigateTo } from "@tarojs/taro";
export default {
  name: 'index',
  components: {},
  setup() {
    const HooksList = ["useApp", "useToast"];
    const handleOnItemClick = (item) => {
      navigateTo({
        url: `/pages/${item}/index`
      });
    }
    return {
      HooksList,
      handleOnItemClick
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
