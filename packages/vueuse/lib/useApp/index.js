"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));

var _vue = require("vue");

var _taro = require("@tarojs/taro");

function useApp(allDefault) {
  var _appInstance$globalDa;

  var appInstance = (0, _taro.getApp)({
    allowDefault: Boolean(allDefault)
  });
  var globalData = (0, _vue.ref)((_appInstance$globalDa = appInstance.globalData) !== null && _appInstance$globalDa !== void 0 ? _appInstance$globalDa : {});

  var setGlobalDataAsync = function setGlobalDataAsync(key, value) {
    return new Promise(function (resolve, reject) {
      try {
        var prevGlobalData = (0, _objectSpread2.default)({}, globalData.value);
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

var _default = useApp;
exports.default = _default;