import { requestSubscribeMessage, getEnv, getSetting, openSetting } from '@tarojs/taro';
import type { requestSubscribeMessage as requestSubscribeMessageNamespace } from '@tarojs/taro';
import useModal from '../useModal';
import { ENV_TYPE } from '../constant';
import type { TAuthResultType } from '../type';

export type TSuccessResult = { [tmplId: string]: TAuthResultType };
export type IAction = (
  tmplIds: string[],
) => Promise<TSuccessResult | requestSubscribeMessageNamespace.FailCallbackResult>;

function useRequestSubscribeMessage(): [IAction] {
  const env = getEnv();
  const [show] = useModal({
    content: '未授权发送通知，您将收不到通知！',
    confirmText: '重新授权',
    cancelText: '取消授权',
  });

  const requestSubscribeMessageAsync: IAction = (tmplIds) => {
    return new Promise((resolve, reject) => {
      if (env !== ENV_TYPE.WEAPP || !tmplIds?.length) {
        reject({ errMsg: 'requestSubscribeMessage: fail' });
      } else {
        try {
          getSetting({
            withSubscriptions: true,
            success: (res) => {
              if (res.subscriptionsSetting.mainSwitch) {
                if (res.subscriptionsSetting.itemSettings != null) {
                  let currTmplIds: string[] = [];
                  let currItemSettings : TSuccessResult = {}
                  tmplIds.forEach(id => {
                    const moIdState = res.subscriptionsSetting.itemSettings[id]; // 用户同意的消息模板id
                    if (moIdState == undefined) {
                      currTmplIds.push(id);
                    } else {
                      currItemSettings[id] = moIdState as TAuthResultType;
                    }
                  });

                  if (currTmplIds.length == tmplIds.length) {
                    requestSubscribeMessage({
                      tmplIds,
                      success: ({ errMsg, ...result }) => resolve(result as TSuccessResult),
                      fail: reject,
                    }).catch(reject);
                  } else if (currTmplIds.length > 0) {
                    requestSubscribeMessage({
                      tmplIds,
                      success: ({ errMsg, ...result }) => resolve(({...currItemSettings, ...result}) as TSuccessResult),
                      fail: reject,
                    }).catch(reject);
                  } else {
                    resolve(currItemSettings);
                  }
               

                } else {
                  requestSubscribeMessage({
                    tmplIds,
                    success: ({ errMsg, ...result }) => resolve(result as TSuccessResult),
                    fail: reject,
                  }).catch(reject);
                }
              } else {
                show().then(() => {
                  openSetting();
                  reject({ errMsg: '用户主开关关闭 mainSwitch为false' });
                }).catch(reject)
              }
            },
            fail: reject
          });
          
        } catch (e) {
          reject({ errMsg: 'requestSubscribeMessage: fail', data: e });
        }
      }
    });
  };
  return [requestSubscribeMessageAsync];
}

export default useRequestSubscribeMessage;
