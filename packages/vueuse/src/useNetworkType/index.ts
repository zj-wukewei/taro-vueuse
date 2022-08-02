import { ref, onMounted, onUnmounted  } from 'vue';
import type { Ref } from "vue";
import {
  getNetworkType,
  onNetworkStatusChange,
  offNetworkStatusChange,
  getEnv, 
  ENV_TYPE
} from '@tarojs/taro';

export enum NetworkType {
  wifi = 'wifi',
  '2g' = '2g',
  '3g' = '3g',
  '4g' = '4g',
  '5g' = '5g',
  unknown = 'unknown',
  none = 'none',
}

function useNetworkType(): Ref<keyof getNetworkType.networkType | undefined> {
  const type = ref<keyof getNetworkType.networkType>();
  const env = getEnv();

  onMounted(() => {
    if (!env) return;
    getNetworkType().then(({ networkType }) => type.value = networkType);

    onNetworkStatusChange(listenNetworkStatusChange);

   
  });

  onUnmounted(() => {
    env !== ENV_TYPE.WEB && offNetworkStatusChange(listenNetworkStatusChange);
  });

  const listenNetworkStatusChange =({ networkType }) => {
    type.value = networkType;
  }
    

  return type;
}

export default useNetworkType;