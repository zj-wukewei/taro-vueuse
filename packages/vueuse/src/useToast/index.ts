import { showToast, hideToast } from '@tarojs/taro';
import { timeOutPromise } from '../utils';

export interface ToastOption {
  title: string;
  duration?: number;
  icon?: 'success' | 'loading' | 'none' | 'error';
  image?: string;
  mask?: boolean;
}

export type ShowToast = (option?: Partial<ToastOption>) => Promise<TaroGeneral.CallbackResult>;

export type ShowStringToast = (title: string) => Promise<TaroGeneral.CallbackResult>;

export type HideToast = () => Promise<TaroGeneral.CallbackResult>;

function useToast(initialOption?: Partial<ToastOption>): [
  {
    showToastAsync: ShowToast;
    showSuccessAsync: ShowStringToast;
    showErrorAsync: ShowStringToast;
    showNoneAsync: ShowStringToast;
    showNoneTimeoutAsync: (title: string) => Promise<number>;
  },
  HideToast,
] {
  const showToastAsync: ShowToast = (option?: Partial<ToastOption>) => {
    return new Promise((resolve, reject) => {
      try {
        if (!option && !initialOption) {
          console.warn('please provide a option');
          return reject(new Error('please provide a option'));
        } else {
          const options = Object.assign({}, initialOption || {}, option || {});
          if (!options.title) {
            reject({ errMsg: 'showToast: fail' });
          } else {
            showToast({
              ...(options as ToastOption),
              success: resolve,
              fail: reject,
            }).catch(reject);
          }
        }
      } catch (e) {
        reject(e);
      }
    });
  };

  const hideToastAsync: HideToast = () => {
    return new Promise((resolve, reject) => {
      try {
        hideToast({
          success: resolve,
          fail: reject,
        });
      } catch (e) {
        reject(e);
      }
    });
  };

  const showSuccessAsync: ShowStringToast = (title: string) =>
    showToastAsync({ title, icon: 'success' });

  const showErrorAsync: ShowStringToast = (title: string) =>
    showToastAsync({ title, icon: 'error' });

  const showNoneAsync: ShowStringToast = (title: string) => showToastAsync({ title, icon: 'none' });

  const showNoneTimeoutAsync = (title: string) =>
    showToastAsync({ title, icon: 'none' }).then(() => timeOutPromise(1500));
  return [
    {
      showToastAsync,
      showSuccessAsync,
      showErrorAsync,
      showNoneAsync,
      showNoneTimeoutAsync,
    },
    hideToastAsync,
  ];
}

export default useToast;
