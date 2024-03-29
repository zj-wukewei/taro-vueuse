import {
  useRouter as useTaroRouter,
  switchTab,
  reLaunch,
  redirectTo,
  navigateTo,
  navigateBack,
  navigateToMiniProgram,
  navigateBackMiniProgram,
} from '@tarojs/taro';
import { stringify } from 'querystring';
import { typeOf } from '../utils/tool';
import type { TRouteInfo, TRecord } from '../type';

export type NavigateBackSync = (
  delta?: number | boolean,
  extraData?: TRecord,
) => Promise<TaroGeneral.CallbackResult>;
export interface INavigateToMiniProgramSyncOptions {
  appId?: string;
  path?: string;
  envVersion?: keyof navigateToMiniProgram.envVersion;
  extraData?: TRecord;
  shortLink?: string;
}

export type CommonRouteWithOptionsSync = (
  url: string,
  options?: TRecord,
) => Promise<TaroGeneral.CallbackResult>;

export type NavigateToSync = (
  urlOrMark: string | boolean,
  options?: TRecord | INavigateToMiniProgramSyncOptions,
) => Promise<TaroGeneral.CallbackResult>;
export interface ResultMethods {
  switchTab: CommonRouteWithOptionsSync;
  relaunch: CommonRouteWithOptionsSync;
  redirectTo: CommonRouteWithOptionsSync;
  navigateTo: NavigateToSync;
  navigateBack: NavigateBackSync;
}

export type Result = [TRouteInfo, ResultMethods];

function stringfiyUrl(url: string, options?: TRecord): string {
  let stringfiyUrl = url;
  if (options && typeof options === 'object') {
    const hasQuery = stringfiyUrl.includes('?');
    stringfiyUrl += (hasQuery ? '&' : '?') + stringify(options);
  }
  return stringfiyUrl;
}

function useRouter(): Result {
  const router = useTaroRouter();

  const switchTabSync: CommonRouteWithOptionsSync = (url, options) => {
    return new Promise((resolve, reject) => {
      try {
        url = stringfiyUrl(url, options);
        switchTab({ url, success: resolve, fail: reject }).catch(reject);
      } catch (e) {
        reject(e);
      }
    });
  };
  const relaunchSync: CommonRouteWithOptionsSync = (url, options) => {
    return new Promise((resolve, reject) => {
      try {
        url = stringfiyUrl(url, options);
        reLaunch({ url, success: resolve, fail: reject }).catch(reject);
      } catch (e) {
        reject(e);
      }
    });
  };

  const redirectToSync: CommonRouteWithOptionsSync = (url, options) => {
    return new Promise((resolve, reject) => {
      try {
        url = stringfiyUrl(url, options);
        redirectTo({ url, success: resolve, fail: reject }).catch(reject);
      } catch (e) {
        reject(e);
      }
    });
  };

  const navigateToSync: NavigateToSync = (urlOrMark, options) => {
    return new Promise((resolve, reject) => {
      try {
        const { appId } = options || {} as INavigateToMiniProgramSyncOptions;
        // if appid exist, use navigateToMiniprogram
        if (appId && urlOrMark) {
          navigateToMiniProgram({
            appId,
            path: options?.path,
            extraData: options?.extraData,
            envVersion: options?.envVersion,
            shortLink: options?.shortLink,
            success: resolve,
            fail: reject,
          }).catch(reject);
        } else if (typeOf(urlOrMark, 'String')) {
          urlOrMark = stringfiyUrl(urlOrMark as string, options);
          navigateTo({ url: urlOrMark, success: resolve, fail: reject }).catch(reject);
        }
      } catch (e) {
        reject(e);
      }
    });
  };

  const navigateBackSync: NavigateBackSync = (delta, extraData) => {
    return new Promise((resolve, reject) => {
      try {
        // if deltaOrMark is boolean, use navigateBackMiniprogram
        if (typeOf(delta, 'Boolean') && delta) {
          navigateBackMiniProgram({
            ...(extraData ? { extraData } : {}),
            success: resolve,
            fail: reject,
          }).catch(reject);
        } else {
          navigateBack({
            delta: delta as number,
            success: resolve,
            fail: reject,
          }).catch(reject);
        }
      } catch (e) {
        reject(e);
      }
    });
  };

  return [
    router,
    {
      switchTab: switchTabSync,
      relaunch: relaunchSync,
      redirectTo: redirectToSync,
      navigateTo: navigateToSync,
      navigateBack: navigateBackSync,
    },
  ];
}

export default useRouter;
