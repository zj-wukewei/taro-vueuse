import { openSetting, getSetting, authorize } from "@tarojs/taro";
import useModal from "../useModal";
import type { AuthSetting, SubscriptionsSetting } from '@tarojs/taro'

export interface DeviceAuthOption {
  /** 必填，权限名称，名称查看文档https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/authorize.html */
  scope: keyof AuthSetting;
  /** 未授权的提示语 */
  modalTitle?: string;
  /** 确定按钮的文案 */
  confirmText?: string;
}

interface OpenSettingSuccessCallbackResult extends TaroGeneral.CallbackResult {
  /** 用户授权结果 */
  authSetting: AuthSetting
  /** 用户订阅消息设置，接口参数 withSubscriptions 值为 true 时才会返回。 */
  subscriptionsSetting: SubscriptionsSetting
  /** 调用结果 */
  errMsg: string
}

interface GetSettingSuccessCallbackResult extends TaroGeneral.CallbackResult {
  /** 用户授权结果 */
  authSetting: AuthSetting
  /** 用户订阅消息设置，接口参数 withSubscriptions 值为 true 时才会返回。 */
  subscriptionsSetting: SubscriptionsSetting
  /** 在插件中调用时，当前宿主小程序的用户授权结果 */
  miniprogramAuthSetting: AuthSetting
  /** 调用结果 */
  errMsg: string
}

export type RequestDeviceAuth = (options: DeviceAuthOption) => Promise<GetSettingSuccessCallbackResult>

export default function useDeviceAuth() {
  const [showModalAsync] = useModal();

  const requestDeviceAuth: RequestDeviceAuth = ({
    scope,
    modalTitle = "尚未进行授权，功能将无法使用",
    confirmText = "去授权",
  }) => {
    if (!scope) {
      throw new Error("please set scope property");
    }
    return new Promise((resolve, reject) => {
      getSetting({
        success(res: GetSettingSuccessCallbackResult) {
          // 申请过权限但是被拒绝了
          // @ts-ignore
          if (!res.authSetting[scope] && res.authSetting[scope] == false) {
            showModalAsync({
              content: modalTitle,
              confirmText: confirmText,
            }).then((res) => {
              if (res.confirm) {
                openSetting({
                  success: (openRes: OpenSettingSuccessCallbackResult) => {
                    // @ts-ignore
                    if (!openRes.authSetting[scope]) {
                      authorize({
                        scope: scope,
                        success() {
                          resolve({
                            ...res,
                            authSetting: {
                              ...res.authSetting,
                              [scope]: true
                            }
                          });
                        },
                        fail(err: TaroGeneral.CallbackResult) {
                          reject(err);
                        },
                      });
                    } else {
                      resolve(res);
                    }
                  },
                });
              } else {
                reject({
                  errMsg: "取消授权",
                });
              }
            });
            // 没有申请过权限，权限列表为空
            // @ts-ignore
          } else if (!res.authSetting[scope]) {
            authorize({
              scope: scope,
              success() {
                resolve({
                  ...res,
                  authSetting: {
                    ...res.authSetting,
                    [scope]: true
                  }
                });
              },
              fail(err: TaroGeneral.CallbackResult) {
                reject(err);
              },
            });
          }  else {
            resolve(res);
          }
        },
      });
    });
  };

  return [requestDeviceAuth];
}
