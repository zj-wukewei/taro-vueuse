<template>
  <view class="index">
    <view class="btn">
      {{ fileInfo }}

      <nut-button type="primary" @click="handleOnClick">choose</nut-button>
      <nut-button type="primary" @click="handleCompressImageAsyncOnClick">compressImageAsync</nut-button>
    </view>
  </view>
</template>

<script>
import { useImage } from '@slan-health/taro-vueuse';
export default {
  name: 'use-app',
  components: {},
  setup() {
    const [fileInfo, { choose, compress }] = useImage({ count: 1 });
    const handleOnClick = () => {
      choose();
    };

    const handleCompressImageAsyncOnClick = () => {
      const src = fileInfo.value?.tempFilePaths[0];
      src && compress(src, 80).then((res) => {
        console.log("handleCompressImageAsyncOnClick", res)
      });
    }

    return {
      fileInfo,
      handleOnClick,
      handleCompressImageAsyncOnClick
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
