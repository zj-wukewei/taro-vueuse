import { ref, Ref } from 'vue';
import { getApp } from '@tarojs/taro';

import type { App } from '@tarojs/taro';
import type { TRecord } from '../type';

export type TSetGlobalData = (key: string, value: unknown) => Promise<TaroGeneral.CallbackResult>;

function useApp(allDefault?: boolean) {
  const appInstance = getApp({ allowDefault: Boolean(allDefault) });

  const globalData = ref<TRecord>(
    appInstance.globalData ?? {}
  );

  const setGlobalDataAsync: TSetGlobalData = (key, value) => {
    return new Promise((resolve, reject) => {
      try {
        const prevGlobalData = { ...globalData.value };
        prevGlobalData[key] = value;
        appInstance.globalData = prevGlobalData;
        globalData.value = prevGlobalData;
        resolve({ errMsg: 'setGlobalData: ok' });
      } catch (e) {
        reject({ errMsg: 'setGlobalData: fail', data: e });
      }
    });
  }

  return [appInstance, globalData, setGlobalDataAsync];
}

export default useApp;