import { scanCode } from '@tarojs/taro';

export interface IOptions {
  onlyFromCamera?: boolean;
  scanType?: keyof scanCode.ScanType;
}

export type IScanAction = (options?: IOptions) => Promise<scanCode.SuccessCallbackResult>;

export type ICameraScanAction = (
  scanType?: keyof scanCode.ScanType,
) => Promise<scanCode.SuccessCallbackResult>;

function useScanCode({ onlyFromCamera, scanType }: IOptions = {}): [
  IScanAction,
  ICameraScanAction,
] {
  const scan: IScanAction = (option = {}) => {
    return new Promise((resolve, reject) => {
      try {
        const { onlyFromCamera: personalOnlyFromCamera, scanType: personalScanType } = option;
        const payload = Object.fromEntries(
          Object.entries({
            onlyFromCamera: personalOnlyFromCamera || onlyFromCamera,
            scanType: personalScanType || scanType,
          }).filter((v) => typeof v[1] !== 'undefined'),
        );
        scanCode({
          ...payload,
          success: resolve,
          fail: reject,
        }).catch(reject);
      } catch (e) {
        reject({
          errMsg: 'scanCode:fail',
          message: e,
        });
      }
    });
  };

  const cameraScan: ICameraScanAction = (cameraScanType) => {
    return scan({
      onlyFromCamera: true,
      scanType: cameraScanType || scanType,
    });
  };

  return [scan, cameraScan];
}

export default useScanCode;
