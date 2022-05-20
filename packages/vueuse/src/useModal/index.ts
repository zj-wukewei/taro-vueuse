import { showModal } from '@tarojs/taro';
import type { showModal as showModalNamespace } from '@tarojs/taro';

export interface ModalOption {
  title?: string;
  content?: string;
  mask?: boolean;
  cancelColor?: string;
  cancelText?: string;
  confirmColor?: string;
  confirmText?: string;
  showCancel?: boolean;
}

export type ShowModal = (
  option?: ModalOption,
) => Promise<showModalNamespace.SuccessCallbackResult | TaroGeneral.CallbackResult>;

function useModal(initialOption?: ModalOption): [ShowModal] {
  const showModalAsync: ShowModal = (option?: ModalOption) => {
    return new Promise((resolve, reject) => {
      try {
        if (!option && !initialOption) {
          console.warn('please provide a option');
          return reject(new Error('please provide a option'));
        } else {
          const options = Object.assign({}, initialOption || {}, option || {});
          showModal({
            ...options,
            success: resolve,
            fail: reject,
          }).catch(reject);
        }
      } catch (e) {
        reject(e);
      }
    });
  };

  return [showModalAsync];
}

export default useModal;
