import { ref, onMounted, onUnmounted } from "vue";
import type { Ref } from "vue";
import { getEnv, ENV_TYPE, useDidShow, useDidHide } from "@tarojs/taro";

function useVisible(): Ref<boolean> {
  const visible = ref<boolean>(true);
  const env = getEnv();

  const listenVisible = () => {
    const visibleState = document.visibilityState;
    visible.value = (visibleState === 'visible');
  };


  if (env == ENV_TYPE.WEB) {
    onMounted(() => {
      document.addEventListener('visibilitychange', listenVisible);
    });
    onUnmounted(() => {
      document.removeEventListener('visibilitychange', listenVisible);
    });
  } else {

    useDidShow(() => {
      visible.value = true;
    });
  
    useDidHide(() => {
      visible.value = false;
    });
  }


  return visible;
}

export default useVisible;