import _objectSpread from "@babel/runtime/helpers/esm/objectSpread2";
import { showToast, hideToast } from '@tarojs/taro';
import { timeOutPromise } from '../utils';

function useToast(initialOption) {
  var showToastAsync = function showToastAsync(option) {
    return new Promise(function (resolve, reject) {
      try {
        if (!option && !initialOption) {
          console.warn('please provide a option');
          return reject(new Error('please provide a option'));
        } else {
          var options = Object.assign({}, initialOption || {}, option || {});

          if (!options.title) {
            reject({
              errMsg: 'showToast: fail'
            });
          } else {
            showToast(_objectSpread(_objectSpread({}, options), {}, {
              success: resolve,
              fail: reject
            })).catch(reject);
          }
        }
      } catch (e) {
        reject(e);
      }
    });
  };

  var hideToastAsync = function hideToastAsync() {
    return new Promise(function (resolve, reject) {
      try {
        hideToast({
          success: resolve,
          fail: reject
        });
      } catch (e) {
        reject(e);
      }
    });
  };

  var showSuccessAsync = function showSuccessAsync(title) {
    return showToastAsync({
      title: title,
      icon: 'success'
    });
  };

  var showErrorAsync = function showErrorAsync(title) {
    return showToastAsync({
      title: title,
      icon: 'error'
    });
  };

  var showNoneAsync = function showNoneAsync(title) {
    return showToastAsync({
      title: title,
      icon: 'none'
    });
  };

  var showNoneTimeoutAsync = function showNoneTimeoutAsync(title) {
    return showToastAsync({
      title: title,
      icon: 'none'
    }).then(function () {
      return timeOutPromise(1500);
    });
  };

  return [{
    showToastAsync: showToastAsync,
    showSuccessAsync: showSuccessAsync,
    showErrorAsync: showErrorAsync,
    showNoneAsync: showNoneAsync,
    showNoneTimeoutAsync: showNoneTimeoutAsync
  }, hideToastAsync];
}

export default useToast;