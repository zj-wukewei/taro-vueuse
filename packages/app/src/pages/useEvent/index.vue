<template>
  <view class="index">
    <view class="btn">
      <nut-button type="primary" @click="handleOnClick">emitEvent('event1')</nut-button>
    </view>
  </view>
</template>

<script>
import { useEvent } from '@slan-health/taro-vueuse';
export default {
  name: 'use-event',
  components: {},
  setup() {
    const { emitEvent, setListener, removeAllListener } = useEvent('use-envent');

    setListener('event1', (args) => {
      console.log('setListener', args);
    })

    const handleOnClick = () => {
      emitEvent('event1', 'wkw1', 'wkw2')
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
