<template>
  <view class="index">
    <text>{{ loading }}</text>
    <text>{{ data }}</text>

    <view class="button" @tap="refresh">refresh</view>
    <view class="button" @tap="handleOpen">openPage</view>
  </view>
</template>

<script>
import { useRequest, useRouter } from '@slan-health/taro-vueuse';

export default {
  name: 'Index',
  setup() {
    const [_, { navigateTo }] = useRouter();
    const testApi = () => {
      console.log("testApi")
      return new Promise((reselve) => {
        setTimeout(() => {
          reselve("AAAA")
        }, 2000)
      })
    };

    const { data, loading, refresh } = useRequest(testApi, {
      refreshOnWindowFocus: true
    });

    const handleOpen = () => {
       navigateTo(`/pages/useToast/index`);
    }

    return {
      data,
      loading,
      refresh,
      handleOpen
    }

  }
}
</script>
