import { login, checkSession, getEnv, useDidShow } from '@tarojs/taro';
import { ref } from "vue";

import { ENV_TYPE } from '../constant';

export type ILogin = (needCheck?: boolean) => Promise<string | undefined>;
export type ICheckSessionAction = () => Promise<TaroGeneral.CallbackResult>;
export interface IAction {
  checkSessionSync: ICheckSessionAction,
  loginSync: ILogin,
  getPhoneNumber: (e: any) => Promise<{
    code: string | undefined;
    encryptedData: string;
    iv: string;
    phoneNumberCode: string; //新版2.12.2版本之后变动
  }>,
  
}

function useLogin(): IAction {
  const env = getEnv();
  const code = ref();

  const checkSessionSync: ICheckSessionAction = () => {
    return new Promise((resolve, reject) => {
      if (env === ENV_TYPE.WEAPP) { 
        checkSession({
          success: resolve,
          fail: reject,
        }).catch(reject);
      } else {
        reject({ errMsg: 'checkSession:fail' });
      }
    });
  }

  useDidShow(() => {
    loginSync(false);
  })

  const loginSync: ILogin = (needCheck) => {
    return new Promise((resolve, reject) => {
      if (env === ENV_TYPE.WEAPP) { 
         const loginAction = () => {
            login({
              success: (res) => {
                code.value = res.code;
                resolve(res.code);
              },
              fail: reject,
            }).catch(reject);
          };

          try {
            if (needCheck) {
              checkSessionSync()
                .then(() => {
                  if (code.value) {
                   resolve(code.value);
                  } else {
                   loginAction();
                  }
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

  

  const getPhoneNumber = (e: any) => {
    if (!e.detail.encryptedData) return Promise.reject({ errMsg: 'login:fail' });
    const info = e.detail;
    return loginSync(true).then(code => Promise.resolve({
      code: code,
      encryptedData: info.encryptedData as string,
      iv: info.iv as string,
      phoneNumberCode: info.code as string
    }));
  }

  return {
    checkSessionSync,
    loginSync,
    getPhoneNumber
  }

}

export default useLogin;