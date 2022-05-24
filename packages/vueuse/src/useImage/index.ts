import Taro, {
  saveImageToPhotosAlbum,
  previewImage,
  getImageInfo,
  compressImage,
  chooseImage,
  chooseMessageFile,
  getEnv,
} from '@tarojs/taro';
import { ref } from 'vue';
import type { Ref } from 'vue';
import { saveImageForH5, downloadImage, compressForH5 } from './utils';
import { ENV_TYPE } from '../constant';

export type ChooseImageOption = Partial<
  Pick<chooseImage.Option, 'count' | 'sizeType' | 'sourceType'>
>;

export type PreviewImageOption = Pick<previewImage.Option, 'current' | 'urls'>;

export type ChooseImageAction = (
  option?: ChooseImageOption,
) => Promise<chooseImage.SuccessCallbackResult>;

export type PreviewImageAction = (
  option: PreviewImageOption,
) => Promise<TaroGeneral.CallbackResult>;

export type SaveImageToPhotosAlbumAction = (
  filePath: string,
) => Promise<TaroGeneral.CallbackResult>;

export type GetImageInfoAction = (src: string) => Promise<getImageInfo.SuccessCallbackResult>;

export type ChooseMessageFileAction = (
  count: number,
  type?: Pick<chooseMessageFile.Option, 'type'>,
  extend?: Pick<chooseMessageFile.Option, 'extension'>,
) => Promise<chooseMessageFile.SuccessCallbackResult>;

export type CompressImageAction = (
  src: string,
  quality?: number,
) => Promise<compressImage.SuccessCallbackResult>;

export type IFileInfo = Ref<Pick<chooseImage.SuccessCallbackResult, 'tempFilePaths' | 'tempFiles'>>;

export interface IAction {
  choose: ChooseImageAction;
  chooseMessageFile: ChooseMessageFileAction;
  preview: PreviewImageAction;
  save: SaveImageToPhotosAlbumAction;
  getInfo: GetImageInfoAction;
  compress: CompressImageAction;
}

function useImage(options: ChooseImageOption): [IFileInfo, IAction] {
  const fileInfoRef = ref<IFileInfo>({});
  const env = getEnv();

  const chooseImageAsync: ChooseImageAction = (option = {}) => {
    const { count, sizeType, sourceType } = options;
    const finalOptions = Object.assign(
      {},
      Object.fromEntries(
        [
          ['count', count],
          ['sizeType', sizeType],
          ['sourceType', sourceType],
        ].filter((v) => v[1]) || [],
      ),
      option || {},
    );
    return new Promise((resolve, reject) => {
      try {
        chooseImage({
          ...finalOptions,
          success: (res) => {
            const { errMsg, ...fileInfo } = res;
            fileInfoRef.value = fileInfo;
            resolve(res);
          },
          fail: reject,
        }).catch(reject);
      } catch (e) {
        reject(e);
      }
    });
  };

  const previewImageAsync: PreviewImageAction = (option) => {
    return new Promise((resolve, reject) => {
      try {
        previewImage({
          ...option,
          success: resolve,
          fail: reject,
        }).catch(reject);
      } catch (e) {
        reject(e);
      }
    });
  };

  const saveImageToPhotosAlbumAsync: SaveImageToPhotosAlbumAction = (filePath) => {
    return new Promise(async (resolve, reject) => {
      if (!filePath) {
        reject('you must provide filePath');
      } else {
        try {
          if (env === ENV_TYPE.WEB) {
            const result = await saveImageForH5(filePath);
            if (result) {
              resolve({
                errMsg: 'save success',
              });
            } else {
              reject('save fail');
            }
          } else {
            saveImageToPhotosAlbum({
              filePath,
              success: resolve,
              fail: reject,
            }).catch(reject);
          }
        } catch (e) {
          reject(e);
        }
      }
    });
  };

  const getImageInfoAsync: GetImageInfoAction = (src) => {
    return new Promise((resolve, reject) => {
      if (!src) {
        reject('please enter a valid path');
      } else {
        try {
          getImageInfo({
            src,
            success: resolve,
            fail: reject,
          }).catch(reject);
        } catch (e) {
          reject(e);
        }
      }
    });
  };

  const chooseMessageFileAsync: ChooseMessageFileAction = (count, type, extension) => {
    return new Promise((resolve, reject) => {
      if (!count || env !== ENV_TYPE.WEAPP) {
        reject('you must provide count');
      } else {
        try {
          const payload = Object.fromEntries(
            [
              ['type', type],
              ['extension', extension],
            ].filter((v) => v[1]) || [],
          );
          Taro.chooseMessageFile({
            count,
            ...payload,
            success: resolve,
            fail: reject,
          });
        } catch (e) {
          reject(e);
        }
      }
    });
  };

  const compressImageAsync: CompressImageAction = (src, quality) => {
    return new Promise(async (resolve, reject) => {
      if (!src) {
        reject('you must provide src');
      }
      try {
        if (env === ENV_TYPE.WEB) {
          const blob = await downloadImage(src);
          compressForH5(blob, quality).then(resolve, reject);
        } else {
          Taro.compressImage({
            src,
            ...(quality ? { quality } : {}),
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
    fileInfoRef as IFileInfo,
    {
      choose: chooseImageAsync,
      chooseMessageFile: chooseMessageFileAsync,
      preview: previewImageAsync,
      save: saveImageToPhotosAlbumAsync,
      getInfo: getImageInfoAsync,
      compress: compressImageAsync,
    },
  ];
}

export default useImage;
