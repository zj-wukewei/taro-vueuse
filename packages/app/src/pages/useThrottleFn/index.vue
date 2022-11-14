<template>
  <view class="index">
    <view class="btn">
      <nut-button type="primary" @click="handleOnClick">show</nut-button>
    </view>
  </view>
</template>

<script>
import { useThrottleFn } from '@slan-health/taro-vueuse';
export default {
  name: 'use-ThrottleFn',
  components: {},
  setup() {
    const fn  = useThrottleFn(() => {
      console.log("useThrottleFn200ms")
    }, 1000);
    console.log("fnfn", fn);
    const handleOnClick = () => {
      console.log("handleOnClick");
      fn();
    }

    return {
      handleOnClick
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
