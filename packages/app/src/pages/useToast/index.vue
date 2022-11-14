<template>
  <view class="index">
    <view class="btn">
      <nut-button type="primary" @click="handleClick">showNoneAsync</nut-button>
      <nut-button type="primary" @click="handleTimeOutClick">showNoneTimeoutAsync</nut-button>
    </view>
  </view>
</template>

<script>
import { useToast } from '@slan-health/taro-vueuse';
export default {
  name: 'use-toast',
  components: {},
  setup() {
    const [{ showNoneAsync, showNoneTimeoutAsync }, hide] = useToast();

    const handleClick = () => {
      showNoneAsync('showNoneAsync').then(() => console.log("立马输出"));
    };

 const handleTimeOutClick = () => {
      showNoneTimeoutAsync('showNoneTimeoutAsync').then(() => console.log("1.5s输出"));;
    };
    return {
      handleClick,
      handleTimeOutClick
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
