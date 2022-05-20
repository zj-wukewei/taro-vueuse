"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));

var _taro = require("@tarojs/taro");

var _utils = require("../utils");

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
            (0, _taro.showToast)((0, _objectSpread2.default)((0, _objectSpread2.default)({}, options), {}, {
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
        (0, _taro.hideToast)({
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
      return (0, _utils.timeOutPromise)(1500);
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

var _default = useToast;
exports.default = _default;