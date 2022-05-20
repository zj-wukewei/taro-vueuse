import { showLoading, hideLoading } from '@tarojs/taro';

export interface LoadingOption {
  title: string;
  mask?: boolean;
}

export type ShowLoading = (option?: Partial<LoadingOption>) => Promise<TaroGeneral.CallbackResult>;
export type HideLoading = () => Promise<TaroGeneral.CallbackResult>;

function useLoading(initialOption?: Partial<LoadingOption>): [ShowLoading, HideLoading] {
  const showLoadingAsync: ShowLoading = (option = ({ title: '加载中...',  mask: false })) => {
    return new Promise((resolve, reject) => {
      try {
        if (!option && !initialOption) {
          console.warn('please provide a option');
          return reject(new Error('please provide a option'));
        } else {
          const options = Object.assign({}, initialOption || {}, option || {});
          if (!options.title) {
            reject({ errMsg: 'showLoading: fail' });
          } else {
            showLoading({
              ...(options as LoadingOption),
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

  const hideLoadingAsync: HideLoading = () => {
    return new Promise((resolve, reject) => {
      try {
        hideLoading({
          success: resolve,
          fail: reject,
        });
      } catch (e) {
        reject(e);
      }
    });
  };

  return [showLoadingAsync, hideLoadingAsync];
}

export default useLoading;
