<template>
  <view class="index">
    <view class="btn">
      <nut-button type="primary" @click="handleStartOnClick">开始录音</nut-button>
      <nut-button type="primary" @click="handlePauseOnClick">暂停</nut-button>
      <nut-button type="primary" @click="handleStopOnClick">停止</nut-button>
    </view>
  </view>
</template>

<script>
import { useRecorderManager } from '@slan-health/taro-vueuse';
import { ref, onUnmounted } from 'vue';

export default {
  name: 'use-recorder-manager',
  components: {},
  setup() {
    const recorderStatus = ref(true);
    const [recorderManager, { startRecorder, stopRecorder, pauseRecorder }] = useRecorderManager({
      onStart: () => console.log('onStart'),
      onPause: () => console.log('onPause'),
      onStop: (voice) => console.log('onStop', voice),
      onError: (error) => console.log('onError', error),
      recorderStatus: () => recorderStatus.value,
    });

    onUnmounted(() => {
      recorderStatus.value = false;
      stopRecorder();
    });

    const handleStartOnClick = () => {
      setTimeout(() => {
        startRecorder({
          duration: 120000,
          format: 'mp3',
          sampleRate: 16000,
          numberOfChannels: 1,
          encodeBitRate: 96000,
          frameSize: 50,
        });
      }, 2000);
    };

    const handleStopOnClick = () => stopRecorder();

    const handlePauseOnClick = () => pauseRecorder();

    return {
      handleStartOnClick,
      handlePauseOnClick,
      handleStopOnClick,
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
