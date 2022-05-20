<template>
  <view class="index">
    <view class="btn">
      {{ globalData }}

      <nut-button type="primary" @click="handleOnClick">设置key为name，v为AAA</nut-button>
    </view>
  </view>
</template>

<script>
import { useApp } from 'taro-vueuse';
import { getCurrentInstance } from '@tarojs/taro';
export default {
  name: 'use-app',
  components: {},
  setup() {
    const [appInstance, globalData, setGlobalDataAsync] = useApp();
    console.log('appInstance', appInstance);
    const handleOnClick = () => {
      setGlobalDataAsync('name', 'AAA');
    };

    return {
      globalData,
      handleOnClick,
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
