import { getUpdateManager, UpdateManager, getEnv } from '@tarojs/taro';
import useModal from '../useModal';
import useToast from '../useToast';
import { ENV_TYPE } from '../constant';

export type Result = UpdateManager | undefined;

export type IAction = (manager: UpdateManager) => void;
export interface IUpdateManager {
  onCheckForUpdate?: (manager: UpdateManager, result: UpdateManager.OnCheckForUpdateResult) => void;
  onUpdateReady?: IAction;
  onUpdateFailed?: IAction;
}

function useUpdateManager({
  onCheckForUpdate,
  onUpdateReady,
  onUpdateFailed,
}: IUpdateManager = {}): Result {
  const env = getEnv();
  const updateManagerInstance = getUpdateManager();
  const [{ showNoneAsync }] = useToast();
  const [ show ] = useModal({
    title: '更新提示',
    content: '新版本已经准备好，是否重启应用？',
  });

  const onDefaultCheckForUpdate = (
    manager: UpdateManager,
    result: UpdateManager.OnCheckForUpdateResult,
  ) => {
    if (result.hasUpdate) {
      showNoneAsync('检测到有新版本正在更新...');
    }
  };

  const onDefaultUpdateReady: IAction = () => {
    show().then(() => {
      updateManagerInstance.applyUpdate();
    })
  }

  const onDefaultUpdateFailed: IAction = () => {
    showNoneAsync('新版本下载失败，请稍后重试！');
  }

  const addEventListener = () => {
    if (env === ENV_TYPE.WEAPP) {
      updateManagerInstance.onCheckForUpdate((result: UpdateManager.OnCheckForUpdateResult) => {
        (onCheckForUpdate ?? onDefaultCheckForUpdate)(updateManagerInstance, result);
      });
      updateManagerInstance.onUpdateReady(() => {
        (onUpdateReady ?? onDefaultUpdateReady)(updateManagerInstance);
      });
      updateManagerInstance.onUpdateFailed(() => {
        (onUpdateFailed ?? onDefaultUpdateFailed)(updateManagerInstance);
      });
    } else {
      console.log(`此hooks只为小程序提供，当前环境为${env}`);
    }
  };
  addEventListener();

  return updateManagerInstance;
}

export default useUpdateManager;
