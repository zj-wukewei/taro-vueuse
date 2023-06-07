<template>
  <view class="index">
    <view class="btn">
      <nut-button v-for="item in HooksList" type="primary" @click="handleOnItemClick(item)">{{
        item
      }}</nut-button>
    </view>
  </view>
</template>

<script>
import { useRouter } from '@slan-health/taro-vueuse';
import { navigateTo } from '@tarojs/taro';
export default {
  name: 'index',
  components: {},
  setup() {
    const [_, { navigateTo }] = useRouter();
    const HooksList = [
      'useApp',
      'useToast',
      'useLoading',
      'useModal',
      'useThrottleFn',
      'createInjectionState',
      'useImage',
      'useEvent',
      'useStorage',
      'useRequest',
      'useDeviceAuth',
      'useRecorderManager',
    ];
    const handleOnItemClick = (item) => {
      navigateTo(`/pages/${item}/index`);
    };
    return {
      HooksList,
      handleOnItemClick,
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
