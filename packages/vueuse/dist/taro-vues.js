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
	/**
	 * @internal
	 */

	function createFilterWrapper(filter, fn) {
	  function wrapper() {
	    var _this = this;

	    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    filter(function () {
	      return fn.apply(_this, args);
	    }, {
	      fn: fn,
	      thisArg: this,
	      args: args
	    });
	  }

	  return wrapper;
	}
	/**
	 * Create an EventFilter that throttle the events
	 *
	 * @param ms
	 * @param [trailing=true]
	 * @param [leading=true]
	 */

	function throttleFilter(ms) {
	  var trailing = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
	  var leading = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
	  var lastExec = 0;
	  var timer;
	  var isLeading = true;

	  var clear = function clear() {
	    if (timer) {
	      clearTimeout(timer);
	      timer = undefined;
	    }
	  };

	  var filter = function filter(invoke) {
	    var duration = vue.unref(ms);
	    var elapsed = Date.now() - lastExec;
	    clear();

	    if (duration <= 0) {
	      lastExec = Date.now();
	      return invoke();
	    }

	    if (elapsed > duration && (leading || !isLeading)) {
	      lastExec = Date.now();
	      invoke();
	    } else if (trailing) {
	      timer = setTimeout(function () {
	        lastExec = Date.now();
	        isLeading = true;
	        clear();
	        invoke();
	      }, duration);
	    }

	    if (!leading && !timer) timer = setTimeout(function () {
	      return isLeading = true;
	    }, duration);
	    isLeading = false;
	  };

	  return filter;
	}

	/**
	 * Throttle execution of a function. Especially useful for rate limiting
	 * execution of handlers on events like resize and scroll.
	 *
	 * @param   fn             A function to be executed after delay milliseconds. The `this` context and all arguments are passed through, as-is,
	 *                                    to `callback` when the throttled-function is executed.
	 * @param   ms             A zero-or-greater delay in milliseconds. For event callbacks, values around 100 or 250 (or even higher) are most useful.
	 *
	 * @param [trailing=true] if true, call fn again after the time is up
	 *
	 * @param [leading=true] if true, call fn on the leading edge of the ms timeout
	 *
	 * @return  A new, throttled, function.
	 */

	function useThrottleFn(fn) {
	  var ms = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 200;
	  var trailing = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
	  var leading = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
	  return createFilterWrapper(throttleFilter(ms, trailing, leading), fn);
	}

	function refThrottled(value) {
	  var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 200;
	  var trailing = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
	  var leading = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
	  if (delay <= 0) return value;
	  var throttled = vue.ref(value.value);
	  var updater = useThrottleFn(function () {
	    throttled.value = value.value;
	  }, delay, trailing, leading);
	  vue.watch(value, function () {
	    return updater();
	  });
	  return throttled;
	}

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

	function useLoading(initialOption) {
	  var showLoadingAsync = function showLoadingAsync() {
	    var option = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
	      title: '加载中...',
	      mask: false
	    };
	    return new Promise(function (resolve, reject) {
	      try {
	        if (!option && !initialOption) {
	          console.warn('please provide a option');
	          return reject(new Error('please provide a option'));
	        } else {
	          var options = Object.assign({}, initialOption || {}, option || {});

	          if (!options.title) {
	            reject({
	              errMsg: 'showLoading: fail'
	            });
	          } else {
	            taro.showLoading(_objectSpread(_objectSpread({}, options), {}, {
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

	  var hideLoadingAsync = function hideLoadingAsync() {
	    return new Promise(function (resolve, reject) {
	      try {
	        taro.hideLoading({
	          success: resolve,
	          fail: reject
	        });
	      } catch (e) {
	        reject(e);
	      }
	    });
	  };

	  return [showLoadingAsync, hideLoadingAsync];
	}

	function useModal(initialOption) {
	  var showModalAsync = function showModalAsync(option) {
	    return new Promise(function (resolve, reject) {
	      try {
	        if (!option && !initialOption) {
	          console.warn('please provide a option');
	          return reject(new Error('please provide a option'));
	        } else {
	          var options = Object.assign({}, initialOption || {}, option || {});
	          taro.showModal(_objectSpread(_objectSpread({}, options), {}, {
	            success: resolve,
	            fail: reject
	          })).catch(reject);
	        }
	      } catch (e) {
	        reject(e);
	      }
	    });
	  };

	  return [showModalAsync];
	}

	exports.refThrottled = refThrottled;
	exports.useApp = useApp;
	exports.useLoading = useLoading;
	exports.useModal = useModal;
	exports.useThrottleFn = useThrottleFn;
	exports.useToast = useToast;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=taro-vues.js.map
