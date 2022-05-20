<template>
  <view class="index">
    <view class="btn">
      <nut-button type="primary" @click="() => show()">show</nut-button>
    </view>
  </view>
</template>

<script>
import { useModal } from 'taro-vueuse';
export default {
  name: 'use-modal',
  components: {},
  setup() {
    const [show] = useModal({
      title: 'initial title',
      content: 'initial content',
    });

    return {
      show,
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
