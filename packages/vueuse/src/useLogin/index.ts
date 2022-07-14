import { ref } from 'vue';
import type { Ref } from 'vue';
import { login, checkSession, getEnv } from '@tarojs/taro';

import { ENV_TYPE } from '../constant';

export type ILogin = (needCheck?: boolean) => Promise<string | undefined>;
export type ICheckSessionAction = () => Promise<TaroGeneral.CallbackResult>;
export interface IAction {
  checkSessionSync: ICheckSessionAction,
  loginSync: ILogin,
  getPhoneNumer: (e: any) => Promise<{
    code: string | undefined;
    encryptedData: string;
    iv: string;
    phoneNumberCode: string; //新版2.12.2版本之后变动
  }>,
  
}

function useLogin(): IAction {
  const env = getEnv();

  const checkSessionSync: ICheckSessionAction = () => {
    return new Promise((resolve, reject) => {
      if (env === ENV_TYPE.WEB) { 
        checkSession({
          success: resolve,
          fail: reject,
        }).catch(reject);
      } else {
        reject({ errMsg: 'checkSession:fail' });
      }
    });
  }

  const loginSync: ILogin = (needCheck) => {
    return new Promise((resolve, reject) => {
      if (env === ENV_TYPE.WEB) { 
         const loginAction = () => {
            login({
              success: (res) => resolve(res.code),
              fail: reject,
            }).catch(reject);
          };

          try {
            if (needCheck) {
              checkSessionSync()
                .then(() => {
                  loginAction();
                })
                .catch(reject);
            } else {
              loginAction();
            }
          } catch (e) {
            reject({ errMsg: 'login:fail', data: e });
          }

      } else {
        reject({ errMsg: 'checkSession:fail' });
      }
    });
  }

  const getPhoneNumer = (e: any) => {
    if (!e.detail.encryptedData) return Promise.reject({ errMsg: 'login:fail' });
    const info = e.detail;
    return loginSync(false).then(code => Promise.resolve({
      code: code,
      encryptedData: info.encryptedData as string,
      iv: info.iv as string,
      phoneNumberCode: info.code as string
    }));
  }

  return {
    checkSessionSync,
    loginSync,
    getPhoneNumer
  }

}

export default useLogin;