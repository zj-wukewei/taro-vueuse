import {
  setStorage,
  getStorage,
  removeStorage,
  clearStorage,
  getStorageInfo,
  getStorageSync as getTaroStorageSync,
} from '@tarojs/taro';

export type setAction = (key: string, data: any) => Promise<boolean>;
export type getAction = (key?: string) => Promise<any>;
export type getActionSync = (key: string) => any;
export type removeAction = (key: string) => Promise<boolean>;

type getStorageSyncAction = (key: string) => Promise<any>;

export interface IAction {
  getSync: getActionSync;
  set: setAction;
  get: getAction;
  remove: removeAction;
}

const cache = new Map<string, any>();

function useStorage(): IAction {
  const getSync: getActionSync = (key) => {
    if (!cache.has(key)) {
      const data = getTaroStorageSync(key);
      cache.set(key, data);
    }
    const data = cache.get(key);
    return data;
  }

  const getStorageSync: getStorageSyncAction = (key) => {
    return new Promise((resolve, reject) => {
      try {
        getStorage({
          key,
          success: ({ data }) => resolve(data),
          fail: () => reject(undefined),
        });
      } catch (e) {
        reject(undefined);
      }
    });
  };

  const setStorageAsync: setAction = (key, data) => {
    return new Promise((resolve, reject) => {
      try {
        if (!key) {
          console.warn('please provide a option');
          return reject(false);
        } else {
          setStorage({
            key,
            data,
            success: () => {
              cache.set(key, data);
              resolve(true);
            },
            fail: () => reject(false),
          });
        }
      } catch (e) {
        reject(false);
      }
    });
  };

  const getStorageAsync: getAction = (key) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (!key) {
          getStorageInfo({
            success: async ({ keys }) => {
              if (!keys.length) {
                resolve(undefined);
              } else {
                const result: { [_: string]: any } = {};
                for await (let currentKey of keys) {
                  const data = await getStorageSync(currentKey);
                  result[currentKey] = data;
                }
                resolve(result);
              }
            },
            fail: () => reject(undefined),
          });
        } else {
          if (!cache.has(key)) {
            const data = await getStorageSync(key);
            cache.set(key, data);
          }
          const data = cache.get(key);
          resolve(data);
        }
      } catch (e) {
        reject(undefined);
      }
    });
  };

  const removeStorageAsync: removeAction = (key) => {
    return new Promise((resolve, reject) => {
      const callbackOptions = {
        success: () => {
          if (cache.has(key)) {
            cache.delete(key);
          }
          resolve(true);
        },
        fail: () => reject(false),
      };
      try {
        if (!key) {
          clearStorage();
          // why not add options to feedback success? because it is not worked!
          cache.clear();
          resolve(true);
        } else {
          removeStorage({
            key,
            ...callbackOptions,
          });
        }
      } catch (e) {
        reject(false);
      }
    });
  };
  return {
    getSync: getSync,
    set: setStorageAsync,
    get: getStorageAsync,
    remove: removeStorageAsync,
  };
}

export default useStorage;
