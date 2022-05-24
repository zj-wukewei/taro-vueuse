import { Ref } from 'vue';
import type { TRecord } from '../type';
export declare type TSetGlobalData = (key: string, value: unknown) => Promise<TaroGeneral.CallbackResult>;
declare function useApp(allDefault?: boolean): (import("@tarojs/taro").getApp.Instance<TaroGeneral.IAnyObject> | Ref<TRecord<any>> | TSetGlobalData)[];
export default useApp;
