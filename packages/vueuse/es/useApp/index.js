import _objectSpread from "@babel/runtime/helpers/esm/objectSpread2";
import { ref } from 'vue';
import { getApp } from '@tarojs/taro';

function useApp(allDefault) {
  var _appInstance$globalDa;

  var appInstance = getApp({
    allowDefault: Boolean(allDefault)
  });
  var globalData = ref((_appInstance$globalDa = appInstance.globalData) !== null && _appInstance$globalDa !== void 0 ? _appInstance$globalDa : {});

  var setGlobalDataAsync = function setGlobalDataAsync(key, value) {
    return new Promise(function (resolve, reject) {
      try {
        var prevGlobalData = _objectSpread({}, globalData.value);

        prevGlobalData[key] = value;
        appInstance.globalData = prevGlobalData;
        globalData.value = prevGlobalData;
        resolve({
          errMsg: 'setGlobalData: ok'
        });
      } catch (e) {
        reject({
          errMsg: 'setGlobalData: fail',
          data: e
        });
      }
    });
  };

  return [appInstance, globalData, setGlobalDataAsync];
}

export default useApp;