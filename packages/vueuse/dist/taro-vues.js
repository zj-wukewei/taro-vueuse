(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue'), require('@tarojs/taro')) :
	typeof define === 'function' && define.amd ? define(['exports', 'vue', '@tarojs/taro'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global['taro-vues'] = {}, global.vue, global.Taro));
}(this, (function (exports, vue, taro) { 'use strict';

	function getDefaultExportFromCjs (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, basedir, module) {
		return module = {
			path: basedir,
			exports: {},
			require: function (path, base) {
				return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
			}
		}, fn(module, module.exports), module.exports;
	}

	function commonjsRequire () {
		throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
	}

	var defineProperty = createCommonjsModule(function (module) {
	function _defineProperty(obj, key, value) {
	  if (key in obj) {
	    Object.defineProperty(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }

	  return obj;
	}

	module.exports = _defineProperty, module.exports.__esModule = true, module.exports["default"] = module.exports;
	});

	var objectSpread2 = createCommonjsModule(function (module) {
	function ownKeys(object, enumerableOnly) {
	  var keys = Object.keys(object);

	  if (Object.getOwnPropertySymbols) {
	    var symbols = Object.getOwnPropertySymbols(object);
	    enumerableOnly && (symbols = symbols.filter(function (sym) {
	      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
	    })), keys.push.apply(keys, symbols);
	  }

	  return keys;
	}

	function _objectSpread2(target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = null != arguments[i] ? arguments[i] : {};
	    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
	      defineProperty(target, key, source[key]);
	    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
	      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
	    });
	  }

	  return target;
	}

	module.exports = _objectSpread2, module.exports.__esModule = true, module.exports["default"] = module.exports;
	});

	var _objectSpread = /*@__PURE__*/getDefaultExportFromCjs(objectSpread2);

	function useApp(allDefault) {
	  var _appInstance$globalDa;

	  var appInstance = taro.getApp({
	    allowDefault: Boolean(allDefault)
	  });
	  var globalData = vue.ref((_appInstance$globalDa = appInstance.globalData) !== null && _appInstance$globalDa !== void 0 ? _appInstance$globalDa : {});

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

	var timeOutPromise = function timeOutPromise(time) {
	  return new Promise(function (resolve, reject) {
	    try {
	      setTimeout(function () {
	        resolve(time);
	      }, time);
	    } catch (error) {
	      reject();
	    }
	  });
	};

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
	            taro.showToast(_objectSpread(_objectSpread({}, options), {}, {
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
	        taro.hideToast({
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

	exports.useApp = useApp;
	exports.useToast = useToast;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=taro-vues.js.map
