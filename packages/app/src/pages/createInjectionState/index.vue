<template>
  <view class="index">
    <view class="btn">
      {{ user }}

      <nut-button type="primary" @click="handleOnClick">updataUser</nut-button>
    </view>
  </view>
</template>

<script>
import { useInjectedUserState } from '../../store';
import { getCurrentInstance } from '@tarojs/taro';
export default {
  name: 'createInjectionState',
  components: {},
  setup() {
    const { user, updataUser } = useInjectedUserState();
    const handleOnClick = () => {
      updataUser({ name: 'wkw1', age: 22 })
    };

    return {
      user,
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
