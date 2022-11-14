<template>
  <view class="index">
    <view class="btn">
      <nut-button type="primary" @click="() => show()">show</nut-button>
      <nut-button type="primary" @click="() => hide()">hide</nut-button>
    </view>
  </view>
</template>

<script>
import { useLoading } from '@slan-health/taro-vueuse';
export default {
  name: 'use-loading',
  components: {},
  setup() {
    const [show, hide] = useLoading();

    return {
      show,
      hide
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
