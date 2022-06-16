<template>
  <view class="index">
    <view  :style="getNaviStyle"></view>

  </view>
</template>

<script>
import { getSystemInfoSync, getMenuButtonBoundingClientRect } from '@tarojs/taro';
import { computed } from 'vue';

export default {
  name: 'use-nav-height',
  components: {},
  setup() {
    const systemInfo = getSystemInfoSync();
    const statusBarHeight = systemInfo.statusBarHeight;
    const menuButtonInfo = getMenuButtonBoundingClientRect(); // 导航栏高度 = 状态栏到胶囊的间距（胶囊距上距离-状态栏高度） * 2 + 胶囊高度 + 状态栏高度
    const navHeight = computed(
      () => (menuButtonInfo.top - systemInfo.statusBarHeight) * 2 + menuButtonInfo.height,
    );
     const getNaviStyle = computed(() => {
      return {
        height: navHeight.value,
        lineHeight: navHeight.value,
        backgroundColor: 'red`'
      }})
    return { systemInfo, statusBarHeight, menuButtonInfo, navHeight, getNaviStyle };
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
