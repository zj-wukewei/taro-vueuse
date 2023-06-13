<template>
  <view class="index">
    <view class="btn">
      <nut-button type="primary" @click="handleOnClick">申请录音权限</nut-button>
    </view>
  </view>
</template>

<script>
import { useDeviceAuth } from '@slan-health/taro-vueuse';
import { authorize } from '@tarojs/taro';
export default {
  name: 'use-device-auth',
  components: {},
  setup() {
    const [requestDeviceAuth] = useDeviceAuth();
    const handleOnClick = () => {
      requestDeviceAuth({
        scope: 'scope.record',
      })
        .then((res) => console.log('success', res))
        .catch((err) => console.log('rrrrrrrr', err));
    };

    return {
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
