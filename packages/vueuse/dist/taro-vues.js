(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue'), require('@tarojs/taro'), require('querystring')) :
	typeof define === 'function' && define.amd ? define(['exports', 'vue', '@tarojs/taro', 'querystring'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global['taro-vues'] = {}, global.vue, global.Taro, global.querystring));
}(this, (function (exports, vue, Taro, querystring) { 'use strict';

	function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

	var Taro__default = /*#__PURE__*/_interopDefaultLegacy(Taro);

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

	  var appInstance = Taro.getApp({
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

	/**
	 * Create global state that can be injected into components.
	 *
	 * @see https://vueuse.org/createInjectionState
	 *
	 */

	function createInjectionState(composable) {
	  var key = Symbol('InjectionState');

	  var useProvidingState = function useProvidingState() {
	    vue.provide(key, composable.apply(void 0, arguments));
	  };

	  var install = function install(app) {
	    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      args[_key - 1] = arguments[_key];
	    }

	    app.provide(key, composable.apply(void 0, args));
	  };

	  var useInjectedState = function useInjectedState() {
	    return vue.inject(key);
	  };

	  return [useProvidingState, useInjectedState, install];
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

	var safeNamespace = ['__taro', 'at'];
	function wrapperEvent(namespace, eventName) {
	  return namespace ? "".concat(namespace, ".").concat(eventName) : eventName;
	}

	var createEventCenter = function createEventCenter() {
	  return Taro__default['default'].eventCenter;
	};

	function useEvent(namespace) {
	  var events = createEventCenter();

	  var emitEvent = function emitEvent(eventName) {
	    if (!eventName) {
	      console.warn('eventName not provide');
	      return;
	    }

	    var realEventName = wrapperEvent(namespace, eventName);

	    for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      params[_key - 1] = arguments[_key];
	    }

	    events.trigger(realEventName, params);
	  };

	  var setListener = function setListener(eventName) {
	    for (var _len2 = arguments.length, handlers = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	      handlers[_key2 - 1] = arguments[_key2];
	    }

	    if (!eventName || safeNamespace.some(function (v) {
	      return eventName.startsWith(v);
	    })) {
	      console.warn('eventName not valid. listen failed');
	    } else if (!handlers.length) {
	      console.warn('you mast provide one handler to listen. add failed');
	    } else {
	      var realEventName = wrapperEvent(namespace, eventName);
	      vue.onMounted(function () {
	        handlers.forEach(function (handler) {
	          events.on(realEventName, handler);
	        });
	      });
	      vue.onUnmounted(function () {
	        events.off(realEventName);
	      });
	    }
	  };

	  var removeAllListener = function removeAllListener() {
	    events.off();
	  };

	  return {
	    emitEvent: emitEvent,
	    setListener: setListener,
	    removeAllListener: removeAllListener
	  };
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
	            Taro.showToast(_objectSpread(_objectSpread({}, options), {}, {
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
	        Taro.hideToast({
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
	            Taro.showLoading(_objectSpread(_objectSpread({}, options), {}, {
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
	        Taro.hideLoading({
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

	var runtime_1 = createCommonjsModule(function (module) {
	/**
	 * Copyright (c) 2014-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	var runtime = (function (exports) {

	  var Op = Object.prototype;
	  var hasOwn = Op.hasOwnProperty;
	  var undefined$1; // More compressible than void 0.
	  var $Symbol = typeof Symbol === "function" ? Symbol : {};
	  var iteratorSymbol = $Symbol.iterator || "@@iterator";
	  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
	  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

	  function define(obj, key, value) {
	    Object.defineProperty(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	    return obj[key];
	  }
	  try {
	    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
	    define({}, "");
	  } catch (err) {
	    define = function(obj, key, value) {
	      return obj[key] = value;
	    };
	  }

	  function wrap(innerFn, outerFn, self, tryLocsList) {
	    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
	    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
	    var generator = Object.create(protoGenerator.prototype);
	    var context = new Context(tryLocsList || []);

	    // The ._invoke method unifies the implementations of the .next,
	    // .throw, and .return methods.
	    generator._invoke = makeInvokeMethod(innerFn, self, context);

	    return generator;
	  }
	  exports.wrap = wrap;

	  // Try/catch helper to minimize deoptimizations. Returns a completion
	  // record like context.tryEntries[i].completion. This interface could
	  // have been (and was previously) designed to take a closure to be
	  // invoked without arguments, but in all the cases we care about we
	  // already have an existing method we want to call, so there's no need
	  // to create a new function object. We can even get away with assuming
	  // the method takes exactly one argument, since that happens to be true
	  // in every case, so we don't have to touch the arguments object. The
	  // only additional allocation required is the completion record, which
	  // has a stable shape and so hopefully should be cheap to allocate.
	  function tryCatch(fn, obj, arg) {
	    try {
	      return { type: "normal", arg: fn.call(obj, arg) };
	    } catch (err) {
	      return { type: "throw", arg: err };
	    }
	  }

	  var GenStateSuspendedStart = "suspendedStart";
	  var GenStateSuspendedYield = "suspendedYield";
	  var GenStateExecuting = "executing";
	  var GenStateCompleted = "completed";

	  // Returning this object from the innerFn has the same effect as
	  // breaking out of the dispatch switch statement.
	  var ContinueSentinel = {};

	  // Dummy constructor functions that we use as the .constructor and
	  // .constructor.prototype properties for functions that return Generator
	  // objects. For full spec compliance, you may wish to configure your
	  // minifier not to mangle the names of these two functions.
	  function Generator() {}
	  function GeneratorFunction() {}
	  function GeneratorFunctionPrototype() {}

	  // This is a polyfill for %IteratorPrototype% for environments that
	  // don't natively support it.
	  var IteratorPrototype = {};
	  define(IteratorPrototype, iteratorSymbol, function () {
	    return this;
	  });

	  var getProto = Object.getPrototypeOf;
	  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
	  if (NativeIteratorPrototype &&
	      NativeIteratorPrototype !== Op &&
	      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
	    // This environment has a native %IteratorPrototype%; use it instead
	    // of the polyfill.
	    IteratorPrototype = NativeIteratorPrototype;
	  }

	  var Gp = GeneratorFunctionPrototype.prototype =
	    Generator.prototype = Object.create(IteratorPrototype);
	  GeneratorFunction.prototype = GeneratorFunctionPrototype;
	  define(Gp, "constructor", GeneratorFunctionPrototype);
	  define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
	  GeneratorFunction.displayName = define(
	    GeneratorFunctionPrototype,
	    toStringTagSymbol,
	    "GeneratorFunction"
	  );

	  // Helper for defining the .next, .throw, and .return methods of the
	  // Iterator interface in terms of a single ._invoke method.
	  function defineIteratorMethods(prototype) {
	    ["next", "throw", "return"].forEach(function(method) {
	      define(prototype, method, function(arg) {
	        return this._invoke(method, arg);
	      });
	    });
	  }

	  exports.isGeneratorFunction = function(genFun) {
	    var ctor = typeof genFun === "function" && genFun.constructor;
	    return ctor
	      ? ctor === GeneratorFunction ||
	        // For the native GeneratorFunction constructor, the best we can
	        // do is to check its .name property.
	        (ctor.displayName || ctor.name) === "GeneratorFunction"
	      : false;
	  };

	  exports.mark = function(genFun) {
	    if (Object.setPrototypeOf) {
	      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
	    } else {
	      genFun.__proto__ = GeneratorFunctionPrototype;
	      define(genFun, toStringTagSymbol, "GeneratorFunction");
	    }
	    genFun.prototype = Object.create(Gp);
	    return genFun;
	  };

	  // Within the body of any async function, `await x` is transformed to
	  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
	  // `hasOwn.call(value, "__await")` to determine if the yielded value is
	  // meant to be awaited.
	  exports.awrap = function(arg) {
	    return { __await: arg };
	  };

	  function AsyncIterator(generator, PromiseImpl) {
	    function invoke(method, arg, resolve, reject) {
	      var record = tryCatch(generator[method], generator, arg);
	      if (record.type === "throw") {
	        reject(record.arg);
	      } else {
	        var result = record.arg;
	        var value = result.value;
	        if (value &&
	            typeof value === "object" &&
	            hasOwn.call(value, "__await")) {
	          return PromiseImpl.resolve(value.__await).then(function(value) {
	            invoke("next", value, resolve, reject);
	          }, function(err) {
	            invoke("throw", err, resolve, reject);
	          });
	        }

	        return PromiseImpl.resolve(value).then(function(unwrapped) {
	          // When a yielded Promise is resolved, its final value becomes
	          // the .value of the Promise<{value,done}> result for the
	          // current iteration.
	          result.value = unwrapped;
	          resolve(result);
	        }, function(error) {
	          // If a rejected Promise was yielded, throw the rejection back
	          // into the async generator function so it can be handled there.
	          return invoke("throw", error, resolve, reject);
	        });
	      }
	    }

	    var previousPromise;

	    function enqueue(method, arg) {
	      function callInvokeWithMethodAndArg() {
	        return new PromiseImpl(function(resolve, reject) {
	          invoke(method, arg, resolve, reject);
	        });
	      }

	      return previousPromise =
	        // If enqueue has been called before, then we want to wait until
	        // all previous Promises have been resolved before calling invoke,
	        // so that results are always delivered in the correct order. If
	        // enqueue has not been called before, then it is important to
	        // call invoke immediately, without waiting on a callback to fire,
	        // so that the async generator function has the opportunity to do
	        // any necessary setup in a predictable way. This predictability
	        // is why the Promise constructor synchronously invokes its
	        // executor callback, and why async functions synchronously
	        // execute code before the first await. Since we implement simple
	        // async functions in terms of async generators, it is especially
	        // important to get this right, even though it requires care.
	        previousPromise ? previousPromise.then(
	          callInvokeWithMethodAndArg,
	          // Avoid propagating failures to Promises returned by later
	          // invocations of the iterator.
	          callInvokeWithMethodAndArg
	        ) : callInvokeWithMethodAndArg();
	    }

	    // Define the unified helper method that is used to implement .next,
	    // .throw, and .return (see defineIteratorMethods).
	    this._invoke = enqueue;
	  }

	  defineIteratorMethods(AsyncIterator.prototype);
	  define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
	    return this;
	  });
	  exports.AsyncIterator = AsyncIterator;

	  // Note that simple async functions are implemented on top of
	  // AsyncIterator objects; they just return a Promise for the value of
	  // the final result produced by the iterator.
	  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
	    if (PromiseImpl === void 0) PromiseImpl = Promise;

	    var iter = new AsyncIterator(
	      wrap(innerFn, outerFn, self, tryLocsList),
	      PromiseImpl
	    );

	    return exports.isGeneratorFunction(outerFn)
	      ? iter // If outerFn is a generator, return the full iterator.
	      : iter.next().then(function(result) {
	          return result.done ? result.value : iter.next();
	        });
	  };

	  function makeInvokeMethod(innerFn, self, context) {
	    var state = GenStateSuspendedStart;

	    return function invoke(method, arg) {
	      if (state === GenStateExecuting) {
	        throw new Error("Generator is already running");
	      }

	      if (state === GenStateCompleted) {
	        if (method === "throw") {
	          throw arg;
	        }

	        // Be forgiving, per 25.3.3.3.3 of the spec:
	        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
	        return doneResult();
	      }

	      context.method = method;
	      context.arg = arg;

	      while (true) {
	        var delegate = context.delegate;
	        if (delegate) {
	          var delegateResult = maybeInvokeDelegate(delegate, context);
	          if (delegateResult) {
	            if (delegateResult === ContinueSentinel) continue;
	            return delegateResult;
	          }
	        }

	        if (context.method === "next") {
	          // Setting context._sent for legacy support of Babel's
	          // function.sent implementation.
	          context.sent = context._sent = context.arg;

	        } else if (context.method === "throw") {
	          if (state === GenStateSuspendedStart) {
	            state = GenStateCompleted;
	            throw context.arg;
	          }

	          context.dispatchException(context.arg);

	        } else if (context.method === "return") {
	          context.abrupt("return", context.arg);
	        }

	        state = GenStateExecuting;

	        var record = tryCatch(innerFn, self, context);
	        if (record.type === "normal") {
	          // If an exception is thrown from innerFn, we leave state ===
	          // GenStateExecuting and loop back for another invocation.
	          state = context.done
	            ? GenStateCompleted
	            : GenStateSuspendedYield;

	          if (record.arg === ContinueSentinel) {
	            continue;
	          }

	          return {
	            value: record.arg,
	            done: context.done
	          };

	        } else if (record.type === "throw") {
	          state = GenStateCompleted;
	          // Dispatch the exception by looping back around to the
	          // context.dispatchException(context.arg) call above.
	          context.method = "throw";
	          context.arg = record.arg;
	        }
	      }
	    };
	  }

	  // Call delegate.iterator[context.method](context.arg) and handle the
	  // result, either by returning a { value, done } result from the
	  // delegate iterator, or by modifying context.method and context.arg,
	  // setting context.delegate to null, and returning the ContinueSentinel.
	  function maybeInvokeDelegate(delegate, context) {
	    var method = delegate.iterator[context.method];
	    if (method === undefined$1) {
	      // A .throw or .return when the delegate iterator has no .throw
	      // method always terminates the yield* loop.
	      context.delegate = null;

	      if (context.method === "throw") {
	        // Note: ["return"] must be used for ES3 parsing compatibility.
	        if (delegate.iterator["return"]) {
	          // If the delegate iterator has a return method, give it a
	          // chance to clean up.
	          context.method = "return";
	          context.arg = undefined$1;
	          maybeInvokeDelegate(delegate, context);

	          if (context.method === "throw") {
	            // If maybeInvokeDelegate(context) changed context.method from
	            // "return" to "throw", let that override the TypeError below.
	            return ContinueSentinel;
	          }
	        }

	        context.method = "throw";
	        context.arg = new TypeError(
	          "The iterator does not provide a 'throw' method");
	      }

	      return ContinueSentinel;
	    }

	    var record = tryCatch(method, delegate.iterator, context.arg);

	    if (record.type === "throw") {
	      context.method = "throw";
	      context.arg = record.arg;
	      context.delegate = null;
	      return ContinueSentinel;
	    }

	    var info = record.arg;

	    if (! info) {
	      context.method = "throw";
	      context.arg = new TypeError("iterator result is not an object");
	      context.delegate = null;
	      return ContinueSentinel;
	    }

	    if (info.done) {
	      // Assign the result of the finished delegate to the temporary
	      // variable specified by delegate.resultName (see delegateYield).
	      context[delegate.resultName] = info.value;

	      // Resume execution at the desired location (see delegateYield).
	      context.next = delegate.nextLoc;

	      // If context.method was "throw" but the delegate handled the
	      // exception, let the outer generator proceed normally. If
	      // context.method was "next", forget context.arg since it has been
	      // "consumed" by the delegate iterator. If context.method was
	      // "return", allow the original .return call to continue in the
	      // outer generator.
	      if (context.method !== "return") {
	        context.method = "next";
	        context.arg = undefined$1;
	      }

	    } else {
	      // Re-yield the result returned by the delegate method.
	      return info;
	    }

	    // The delegate iterator is finished, so forget it and continue with
	    // the outer generator.
	    context.delegate = null;
	    return ContinueSentinel;
	  }

	  // Define Generator.prototype.{next,throw,return} in terms of the
	  // unified ._invoke helper method.
	  defineIteratorMethods(Gp);

	  define(Gp, toStringTagSymbol, "Generator");

	  // A Generator should always return itself as the iterator object when the
	  // @@iterator function is called on it. Some browsers' implementations of the
	  // iterator prototype chain incorrectly implement this, causing the Generator
	  // object to not be returned from this call. This ensures that doesn't happen.
	  // See https://github.com/facebook/regenerator/issues/274 for more details.
	  define(Gp, iteratorSymbol, function() {
	    return this;
	  });

	  define(Gp, "toString", function() {
	    return "[object Generator]";
	  });

	  function pushTryEntry(locs) {
	    var entry = { tryLoc: locs[0] };

	    if (1 in locs) {
	      entry.catchLoc = locs[1];
	    }

	    if (2 in locs) {
	      entry.finallyLoc = locs[2];
	      entry.afterLoc = locs[3];
	    }

	    this.tryEntries.push(entry);
	  }

	  function resetTryEntry(entry) {
	    var record = entry.completion || {};
	    record.type = "normal";
	    delete record.arg;
	    entry.completion = record;
	  }

	  function Context(tryLocsList) {
	    // The root entry object (effectively a try statement without a catch
	    // or a finally block) gives us a place to store values thrown from
	    // locations where there is no enclosing try statement.
	    this.tryEntries = [{ tryLoc: "root" }];
	    tryLocsList.forEach(pushTryEntry, this);
	    this.reset(true);
	  }

	  exports.keys = function(object) {
	    var keys = [];
	    for (var key in object) {
	      keys.push(key);
	    }
	    keys.reverse();

	    // Rather than returning an object with a next method, we keep
	    // things simple and return the next function itself.
	    return function next() {
	      while (keys.length) {
	        var key = keys.pop();
	        if (key in object) {
	          next.value = key;
	          next.done = false;
	          return next;
	        }
	      }

	      // To avoid creating an additional object, we just hang the .value
	      // and .done properties off the next function object itself. This
	      // also ensures that the minifier will not anonymize the function.
	      next.done = true;
	      return next;
	    };
	  };

	  function values(iterable) {
	    if (iterable) {
	      var iteratorMethod = iterable[iteratorSymbol];
	      if (iteratorMethod) {
	        return iteratorMethod.call(iterable);
	      }

	      if (typeof iterable.next === "function") {
	        return iterable;
	      }

	      if (!isNaN(iterable.length)) {
	        var i = -1, next = function next() {
	          while (++i < iterable.length) {
	            if (hasOwn.call(iterable, i)) {
	              next.value = iterable[i];
	              next.done = false;
	              return next;
	            }
	          }

	          next.value = undefined$1;
	          next.done = true;

	          return next;
	        };

	        return next.next = next;
	      }
	    }

	    // Return an iterator with no values.
	    return { next: doneResult };
	  }
	  exports.values = values;

	  function doneResult() {
	    return { value: undefined$1, done: true };
	  }

	  Context.prototype = {
	    constructor: Context,

	    reset: function(skipTempReset) {
	      this.prev = 0;
	      this.next = 0;
	      // Resetting context._sent for legacy support of Babel's
	      // function.sent implementation.
	      this.sent = this._sent = undefined$1;
	      this.done = false;
	      this.delegate = null;

	      this.method = "next";
	      this.arg = undefined$1;

	      this.tryEntries.forEach(resetTryEntry);

	      if (!skipTempReset) {
	        for (var name in this) {
	          // Not sure about the optimal order of these conditions:
	          if (name.charAt(0) === "t" &&
	              hasOwn.call(this, name) &&
	              !isNaN(+name.slice(1))) {
	            this[name] = undefined$1;
	          }
	        }
	      }
	    },

	    stop: function() {
	      this.done = true;

	      var rootEntry = this.tryEntries[0];
	      var rootRecord = rootEntry.completion;
	      if (rootRecord.type === "throw") {
	        throw rootRecord.arg;
	      }

	      return this.rval;
	    },

	    dispatchException: function(exception) {
	      if (this.done) {
	        throw exception;
	      }

	      var context = this;
	      function handle(loc, caught) {
	        record.type = "throw";
	        record.arg = exception;
	        context.next = loc;

	        if (caught) {
	          // If the dispatched exception was caught by a catch block,
	          // then let that catch block handle the exception normally.
	          context.method = "next";
	          context.arg = undefined$1;
	        }

	        return !! caught;
	      }

	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        var record = entry.completion;

	        if (entry.tryLoc === "root") {
	          // Exception thrown outside of any try block that could handle
	          // it, so set the completion value of the entire function to
	          // throw the exception.
	          return handle("end");
	        }

	        if (entry.tryLoc <= this.prev) {
	          var hasCatch = hasOwn.call(entry, "catchLoc");
	          var hasFinally = hasOwn.call(entry, "finallyLoc");

	          if (hasCatch && hasFinally) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            } else if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }

	          } else if (hasCatch) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            }

	          } else if (hasFinally) {
	            if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }

	          } else {
	            throw new Error("try statement without catch or finally");
	          }
	        }
	      }
	    },

	    abrupt: function(type, arg) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc <= this.prev &&
	            hasOwn.call(entry, "finallyLoc") &&
	            this.prev < entry.finallyLoc) {
	          var finallyEntry = entry;
	          break;
	        }
	      }

	      if (finallyEntry &&
	          (type === "break" ||
	           type === "continue") &&
	          finallyEntry.tryLoc <= arg &&
	          arg <= finallyEntry.finallyLoc) {
	        // Ignore the finally entry if control is not jumping to a
	        // location outside the try/catch block.
	        finallyEntry = null;
	      }

	      var record = finallyEntry ? finallyEntry.completion : {};
	      record.type = type;
	      record.arg = arg;

	      if (finallyEntry) {
	        this.method = "next";
	        this.next = finallyEntry.finallyLoc;
	        return ContinueSentinel;
	      }

	      return this.complete(record);
	    },

	    complete: function(record, afterLoc) {
	      if (record.type === "throw") {
	        throw record.arg;
	      }

	      if (record.type === "break" ||
	          record.type === "continue") {
	        this.next = record.arg;
	      } else if (record.type === "return") {
	        this.rval = this.arg = record.arg;
	        this.method = "return";
	        this.next = "end";
	      } else if (record.type === "normal" && afterLoc) {
	        this.next = afterLoc;
	      }

	      return ContinueSentinel;
	    },

	    finish: function(finallyLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.finallyLoc === finallyLoc) {
	          this.complete(entry.completion, entry.afterLoc);
	          resetTryEntry(entry);
	          return ContinueSentinel;
	        }
	      }
	    },

	    "catch": function(tryLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc === tryLoc) {
	          var record = entry.completion;
	          if (record.type === "throw") {
	            var thrown = record.arg;
	            resetTryEntry(entry);
	          }
	          return thrown;
	        }
	      }

	      // The context.catch method must only be called with a location
	      // argument that corresponds to a known catch block.
	      throw new Error("illegal catch attempt");
	    },

	    delegateYield: function(iterable, resultName, nextLoc) {
	      this.delegate = {
	        iterator: values(iterable),
	        resultName: resultName,
	        nextLoc: nextLoc
	      };

	      if (this.method === "next") {
	        // Deliberately forget the last sent value so that we don't
	        // accidentally pass it on to the delegate.
	        this.arg = undefined$1;
	      }

	      return ContinueSentinel;
	    }
	  };

	  // Regardless of whether this script is executing as a CommonJS module
	  // or not, return the runtime object so that we can declare the variable
	  // regeneratorRuntime in the outer scope, which allows this module to be
	  // injected easily by `bin/regenerator --include-runtime script.js`.
	  return exports;

	}(
	  // If this script is executing as a CommonJS module, use module.exports
	  // as the regeneratorRuntime namespace. Otherwise create a new empty
	  // object. Either way, the resulting object will be used to initialize
	  // the regeneratorRuntime variable at the top of this file.
	   module.exports 
	));

	try {
	  regeneratorRuntime = runtime;
	} catch (accidentalStrictMode) {
	  // This module should not be running in strict mode, so the above
	  // assignment should always work unless something is misconfigured. Just
	  // in case runtime.js accidentally runs in strict mode, in modern engines
	  // we can explicitly access globalThis. In older engines we can escape
	  // strict mode using a global Function call. This could conceivably fail
	  // if a Content Security Policy forbids using Function, but in that case
	  // the proper solution is to fix the accidental strict mode problem. If
	  // you've misconfigured your bundler to force strict mode and applied a
	  // CSP to forbid Function, and you're not willing to fix either of those
	  // problems, please detail your unique predicament in a GitHub issue.
	  if (typeof globalThis === "object") {
	    globalThis.regeneratorRuntime = runtime;
	  } else {
	    Function("r", "regeneratorRuntime = r")(runtime);
	  }
	}
	});

	var regenerator = runtime_1;

	var asyncToGenerator = createCommonjsModule(function (module) {
	function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
	  try {
	    var info = gen[key](arg);
	    var value = info.value;
	  } catch (error) {
	    reject(error);
	    return;
	  }

	  if (info.done) {
	    resolve(value);
	  } else {
	    Promise.resolve(value).then(_next, _throw);
	  }
	}

	function _asyncToGenerator(fn) {
	  return function () {
	    var self = this,
	        args = arguments;
	    return new Promise(function (resolve, reject) {
	      var gen = fn.apply(self, args);

	      function _next(value) {
	        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
	      }

	      function _throw(err) {
	        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
	      }

	      _next(undefined);
	    });
	  };
	}

	module.exports = _asyncToGenerator, module.exports.__esModule = true, module.exports["default"] = module.exports;
	});

	var _asyncToGenerator = /*@__PURE__*/getDefaultExportFromCjs(asyncToGenerator);

	var objectWithoutPropertiesLoose = createCommonjsModule(function (module) {
	function _objectWithoutPropertiesLoose(source, excluded) {
	  if (source == null) return {};
	  var target = {};
	  var sourceKeys = Object.keys(source);
	  var key, i;

	  for (i = 0; i < sourceKeys.length; i++) {
	    key = sourceKeys[i];
	    if (excluded.indexOf(key) >= 0) continue;
	    target[key] = source[key];
	  }

	  return target;
	}

	module.exports = _objectWithoutPropertiesLoose, module.exports.__esModule = true, module.exports["default"] = module.exports;
	});

	var objectWithoutProperties = createCommonjsModule(function (module) {
	function _objectWithoutProperties(source, excluded) {
	  if (source == null) return {};
	  var target = objectWithoutPropertiesLoose(source, excluded);
	  var key, i;

	  if (Object.getOwnPropertySymbols) {
	    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

	    for (i = 0; i < sourceSymbolKeys.length; i++) {
	      key = sourceSymbolKeys[i];
	      if (excluded.indexOf(key) >= 0) continue;
	      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
	      target[key] = source[key];
	    }
	  }

	  return target;
	}

	module.exports = _objectWithoutProperties, module.exports.__esModule = true, module.exports["default"] = module.exports;
	});

	var _objectWithoutProperties = /*@__PURE__*/getDefaultExportFromCjs(objectWithoutProperties);

	/*!
	 * Compressor.js v1.1.1
	 * https://fengyuanchen.github.io/compressorjs
	 *
	 * Copyright 2018-present Chen Fengyuan
	 * Released under the MIT license
	 *
	 * Date: 2022-03-22T15:13:43.699Z
	 */

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
	      _defineProperty(target, key, source[key]);
	    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
	      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
	    });
	  }

	  return target;
	}

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	function _defineProperties(target, props) {
	  for (var i = 0; i < props.length; i++) {
	    var descriptor = props[i];
	    descriptor.enumerable = descriptor.enumerable || false;
	    descriptor.configurable = true;
	    if ("value" in descriptor) descriptor.writable = true;
	    Object.defineProperty(target, descriptor.key, descriptor);
	  }
	}

	function _createClass(Constructor, protoProps, staticProps) {
	  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
	  if (staticProps) _defineProperties(Constructor, staticProps);
	  Object.defineProperty(Constructor, "prototype", {
	    writable: false
	  });
	  return Constructor;
	}

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

	function _extends() {
	  _extends = Object.assign || function (target) {
	    for (var i = 1; i < arguments.length; i++) {
	      var source = arguments[i];

	      for (var key in source) {
	        if (Object.prototype.hasOwnProperty.call(source, key)) {
	          target[key] = source[key];
	        }
	      }
	    }

	    return target;
	  };

	  return _extends.apply(this, arguments);
	}

	var canvasToBlob = {exports: {}};

	/*
	 * JavaScript Canvas to Blob
	 * https://github.com/blueimp/JavaScript-Canvas-to-Blob
	 *
	 * Copyright 2012, Sebastian Tschan
	 * https://blueimp.net
	 *
	 * Licensed under the MIT license:
	 * https://opensource.org/licenses/MIT
	 *
	 * Based on stackoverflow user Stoive's code snippet:
	 * http://stackoverflow.com/q/4998908
	 */

	(function (module) {
	  if (typeof window === 'undefined') {
	    return;
	  }

	  (function (window) {

	    var CanvasPrototype = window.HTMLCanvasElement && window.HTMLCanvasElement.prototype;
	    var hasCanvasPrototype = !!CanvasPrototype;

	    var hasBlobConstructor = window.Blob && function () {
	      try {
	        return Boolean(new Blob());
	      } catch (e) {
	        return false;
	      }
	    }();

	    var hasArrayBufferViewSupport = hasBlobConstructor && window.Uint8Array && function () {
	      try {
	        return new Blob([new Uint8Array(100)]).size === 100;
	      } catch (e) {
	        return false;
	      }
	    }();

	    var BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;
	    var dataURIPattern = /^data:((.*?)(;charset=.*?)?)(;base64)?,/;

	    var dataURLtoBlob = (hasBlobConstructor || BlobBuilder) && window.atob && window.ArrayBuffer && window.Uint8Array && function (dataURI) {
	      var matches, mediaType, isBase64, dataString, byteString, arrayBuffer, intArray, i, bb; // Parse the dataURI components as per RFC 2397

	      matches = dataURI.match(dataURIPattern);

	      if (!matches) {
	        throw new Error('invalid data URI');
	      } // Default to text/plain;charset=US-ASCII


	      mediaType = matches[2] ? matches[1] : 'text/plain' + (matches[3] || ';charset=US-ASCII');
	      isBase64 = !!matches[4];
	      dataString = dataURI.slice(matches[0].length);

	      if (isBase64) {
	        // Convert base64 to raw binary data held in a string:
	        byteString = atob(dataString);
	      } else {
	        // Convert base64/URLEncoded data component to raw binary:
	        byteString = decodeURIComponent(dataString);
	      } // Write the bytes of the string to an ArrayBuffer:


	      arrayBuffer = new ArrayBuffer(byteString.length);
	      intArray = new Uint8Array(arrayBuffer);

	      for (i = 0; i < byteString.length; i += 1) {
	        intArray[i] = byteString.charCodeAt(i);
	      } // Write the ArrayBuffer (or ArrayBufferView) to a blob:


	      if (hasBlobConstructor) {
	        return new Blob([hasArrayBufferViewSupport ? intArray : arrayBuffer], {
	          type: mediaType
	        });
	      }

	      bb = new BlobBuilder();
	      bb.append(arrayBuffer);
	      return bb.getBlob(mediaType);
	    };

	    if (hasCanvasPrototype) {
	      if (window.HTMLCanvasElement && !CanvasPrototype.toBlob) {
	        if (CanvasPrototype.mozGetAsFile) {
	          CanvasPrototype.toBlob = function (callback, type, quality) {
	            var self = this;
	            setTimeout(function () {
	              if (quality && CanvasPrototype.toDataURL && dataURLtoBlob) {
	                callback(dataURLtoBlob(self.toDataURL(type, quality)));
	              } else {
	                callback(self.mozGetAsFile('blob', type));
	              }
	            });
	          };
	        } else if (CanvasPrototype.toDataURL && dataURLtoBlob) {
	          if (CanvasPrototype.msToBlob) {
	            CanvasPrototype.toBlob = function (callback, type, quality) {
	              var self = this;
	              setTimeout(function () {
	                if ((type && type !== 'image/png' || quality) && CanvasPrototype.toDataURL && dataURLtoBlob) {
	                  callback(dataURLtoBlob(self.toDataURL(type, quality)));
	                } else {
	                  callback(self.msToBlob(type));
	                }
	              });
	            };
	          } else {
	            CanvasPrototype.toBlob = function (callback, type, quality) {
	              var self = this;
	              setTimeout(function () {
	                callback(dataURLtoBlob(self.toDataURL(type, quality)));
	              });
	            };
	          }
	        }
	      }
	    }

	    if (module.exports) {
	      module.exports = dataURLtoBlob;
	    } else {
	      window.dataURLtoBlob = dataURLtoBlob;
	    }
	  })(globalThis || window); // shims globalThis to miniprogram

	})(canvasToBlob);

	var toBlob = canvasToBlob.exports;

	var isBlob = function isBlob(value) {
	  if (typeof Blob === 'undefined') {
	    return false;
	  }

	  return value instanceof Blob || Object.prototype.toString.call(value) === '[object Blob]';
	};

	var DEFAULTS = {
	  /**
	   * Indicates if output the original image instead of the compressed one
	   * when the size of the compressed image is greater than the original one's
	   * @type {boolean}
	   */
	  strict: true,

	  /**
	   * Indicates if read the image's Exif Orientation information,
	   * and then rotate or flip the image automatically.
	   * @type {boolean}
	   */
	  checkOrientation: true,

	  /**
	   * The max width of the output image.
	   * @type {number}
	   */
	  maxWidth: Infinity,

	  /**
	   * The max height of the output image.
	   * @type {number}
	   */
	  maxHeight: Infinity,

	  /**
	   * The min width of the output image.
	   * @type {number}
	   */
	  minWidth: 0,

	  /**
	   * The min height of the output image.
	   * @type {number}
	   */
	  minHeight: 0,

	  /**
	   * The width of the output image.
	   * If not specified, the natural width of the source image will be used.
	   * @type {number}
	   */
	  width: undefined,

	  /**
	   * The height of the output image.
	   * If not specified, the natural height of the source image will be used.
	   * @type {number}
	   */
	  height: undefined,

	  /**
	   * Sets how the size of the image should be resized to the container
	   * specified by the `width` and `height` options.
	   * @type {string}
	   */
	  resize: 'none',

	  /**
	   * The quality of the output image.
	   * It must be a number between `0` and `1`,
	   * and only available for `image/jpeg` and `image/webp` images.
	   * Check out {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob canvas.toBlob}.
	   * @type {number}
	   */
	  quality: 0.8,

	  /**
	   * The mime type of the output image.
	   * By default, the original mime type of the source image file will be used.
	   * @type {string}
	   */
	  mimeType: 'auto',

	  /**
	   * Files whose file type is included in this list,
	   * and whose file size exceeds the `convertSize` value will be converted to JPEGs.
	   * @type {string｜Array}
	   */
	  convertTypes: ['image/png'],

	  /**
	   * PNG files over this size (5 MB by default) will be converted to JPEGs.
	   * To disable this, just set the value to `Infinity`.
	   * @type {number}
	   */
	  convertSize: 5000000,

	  /**
	   * The hook function to execute before draw the image into the canvas for compression.
	   * @type {Function}
	   * @param {CanvasRenderingContext2D} context - The 2d rendering context of the canvas.
	   * @param {HTMLCanvasElement} canvas - The canvas for compression.
	   * @example
	   * function (context, canvas) {
	   *   context.fillStyle = '#fff';
	   * }
	   */
	  beforeDraw: null,

	  /**
	   * The hook function to execute after drew the image into the canvas for compression.
	   * @type {Function}
	   * @param {CanvasRenderingContext2D} context - The 2d rendering context of the canvas.
	   * @param {HTMLCanvasElement} canvas - The canvas for compression.
	   * @example
	   * function (context, canvas) {
	   *   context.filter = 'grayscale(100%)';
	   * }
	   */
	  drew: null,

	  /**
	   * The hook function to execute when success to compress the image.
	   * @type {Function}
	   * @param {File} file - The compressed image File object.
	   * @example
	   * function (file) {
	   *   console.log(file);
	   * }
	   */
	  success: null,

	  /**
	   * The hook function to execute when fail to compress the image.
	   * @type {Function}
	   * @param {Error} err - An Error object.
	   * @example
	   * function (err) {
	   *   console.log(err.message);
	   * }
	   */
	  error: null
	};

	var IS_BROWSER = typeof window !== 'undefined' && typeof window.document !== 'undefined';
	var WINDOW = IS_BROWSER ? window : {};

	/**
	 * Check if the given value is a positive number.
	 * @param {*} value - The value to check.
	 * @returns {boolean} Returns `true` if the given value is a positive number, else `false`.
	 */

	var isPositiveNumber = function isPositiveNumber(value) {
	  return value > 0 && value < Infinity;
	};
	var slice = Array.prototype.slice;
	/**
	 * Convert array-like or iterable object to an array.
	 * @param {*} value - The value to convert.
	 * @returns {Array} Returns a new array.
	 */

	function toArray(value) {
	  return Array.from ? Array.from(value) : slice.call(value);
	}
	var REGEXP_IMAGE_TYPE = /^image\/.+$/;
	/**
	 * Check if the given value is a mime type of image.
	 * @param {*} value - The value to check.
	 * @returns {boolean} Returns `true` if the given is a mime type of image, else `false`.
	 */

	function isImageType(value) {
	  return REGEXP_IMAGE_TYPE.test(value);
	}
	/**
	 * Convert image type to extension.
	 * @param {string} value - The image type to convert.
	 * @returns {boolean} Returns the image extension.
	 */

	function imageTypeToExtension(value) {
	  var extension = isImageType(value) ? value.substr(6) : '';

	  if (extension === 'jpeg') {
	    extension = 'jpg';
	  }

	  return ".".concat(extension);
	}
	var fromCharCode = String.fromCharCode;
	/**
	 * Get string from char code in data view.
	 * @param {DataView} dataView - The data view for read.
	 * @param {number} start - The start index.
	 * @param {number} length - The read length.
	 * @returns {string} The read result.
	 */

	function getStringFromCharCode(dataView, start, length) {
	  var str = '';
	  var i;
	  length += start;

	  for (i = start; i < length; i += 1) {
	    str += fromCharCode(dataView.getUint8(i));
	  }

	  return str;
	}
	var btoa = WINDOW.btoa;
	/**
	 * Transform array buffer to Data URL.
	 * @param {ArrayBuffer} arrayBuffer - The array buffer to transform.
	 * @param {string} mimeType - The mime type of the Data URL.
	 * @returns {string} The result Data URL.
	 */

	function arrayBufferToDataURL(arrayBuffer, mimeType) {
	  var chunks = [];
	  var chunkSize = 8192;
	  var uint8 = new Uint8Array(arrayBuffer);

	  while (uint8.length > 0) {
	    // XXX: Babel's `toConsumableArray` helper will throw error in IE or Safari 9
	    // eslint-disable-next-line prefer-spread
	    chunks.push(fromCharCode.apply(null, toArray(uint8.subarray(0, chunkSize))));
	    uint8 = uint8.subarray(chunkSize);
	  }

	  return "data:".concat(mimeType, ";base64,").concat(btoa(chunks.join('')));
	}
	/**
	 * Get orientation value from given array buffer.
	 * @param {ArrayBuffer} arrayBuffer - The array buffer to read.
	 * @returns {number} The read orientation value.
	 */

	function resetAndGetOrientation(arrayBuffer) {
	  var dataView = new DataView(arrayBuffer);
	  var orientation; // Ignores range error when the image does not have correct Exif information

	  try {
	    var littleEndian;
	    var app1Start;
	    var ifdStart; // Only handle JPEG image (start by 0xFFD8)

	    if (dataView.getUint8(0) === 0xFF && dataView.getUint8(1) === 0xD8) {
	      var length = dataView.byteLength;
	      var offset = 2;

	      while (offset + 1 < length) {
	        if (dataView.getUint8(offset) === 0xFF && dataView.getUint8(offset + 1) === 0xE1) {
	          app1Start = offset;
	          break;
	        }

	        offset += 1;
	      }
	    }

	    if (app1Start) {
	      var exifIDCode = app1Start + 4;
	      var tiffOffset = app1Start + 10;

	      if (getStringFromCharCode(dataView, exifIDCode, 4) === 'Exif') {
	        var endianness = dataView.getUint16(tiffOffset);
	        littleEndian = endianness === 0x4949;

	        if (littleEndian || endianness === 0x4D4D
	        /* bigEndian */
	        ) {
	          if (dataView.getUint16(tiffOffset + 2, littleEndian) === 0x002A) {
	            var firstIFDOffset = dataView.getUint32(tiffOffset + 4, littleEndian);

	            if (firstIFDOffset >= 0x00000008) {
	              ifdStart = tiffOffset + firstIFDOffset;
	            }
	          }
	        }
	      }
	    }

	    if (ifdStart) {
	      var _length = dataView.getUint16(ifdStart, littleEndian);

	      var _offset;

	      var i;

	      for (i = 0; i < _length; i += 1) {
	        _offset = ifdStart + i * 12 + 2;

	        if (dataView.getUint16(_offset, littleEndian) === 0x0112
	        /* Orientation */
	        ) {
	          // 8 is the offset of the current tag's value
	          _offset += 8; // Get the original orientation value

	          orientation = dataView.getUint16(_offset, littleEndian); // Override the orientation with its default value

	          dataView.setUint16(_offset, 1, littleEndian);
	          break;
	        }
	      }
	    }
	  } catch (e) {
	    orientation = 1;
	  }

	  return orientation;
	}
	/**
	 * Parse Exif Orientation value.
	 * @param {number} orientation - The orientation to parse.
	 * @returns {Object} The parsed result.
	 */

	function parseOrientation(orientation) {
	  var rotate = 0;
	  var scaleX = 1;
	  var scaleY = 1;

	  switch (orientation) {
	    // Flip horizontal
	    case 2:
	      scaleX = -1;
	      break;
	    // Rotate left 180°

	    case 3:
	      rotate = -180;
	      break;
	    // Flip vertical

	    case 4:
	      scaleY = -1;
	      break;
	    // Flip vertical and rotate right 90°

	    case 5:
	      rotate = 90;
	      scaleY = -1;
	      break;
	    // Rotate right 90°

	    case 6:
	      rotate = 90;
	      break;
	    // Flip horizontal and rotate right 90°

	    case 7:
	      rotate = 90;
	      scaleX = -1;
	      break;
	    // Rotate left 90°

	    case 8:
	      rotate = -90;
	      break;
	  }

	  return {
	    rotate: rotate,
	    scaleX: scaleX,
	    scaleY: scaleY
	  };
	}
	var REGEXP_DECIMALS = /\.\d*(?:0|9){12}\d*$/;
	/**
	 * Normalize decimal number.
	 * Check out {@link https://0.30000000000000004.com/}
	 * @param {number} value - The value to normalize.
	 * @param {number} [times=100000000000] - The times for normalizing.
	 * @returns {number} Returns the normalized number.
	 */

	function normalizeDecimalNumber(value) {
	  var times = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100000000000;
	  return REGEXP_DECIMALS.test(value) ? Math.round(value * times) / times : value;
	}
	/**
	 * Get the max sizes in a rectangle under the given aspect ratio.
	 * @param {Object} data - The original sizes.
	 * @param {string} [type='contain'] - The adjust type.
	 * @returns {Object} The result sizes.
	 */

	function getAdjustedSizes(_ref) {
	  var aspectRatio = _ref.aspectRatio,
	      height = _ref.height,
	      width = _ref.width;
	  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'none';
	  var isValidWidth = isPositiveNumber(width);
	  var isValidHeight = isPositiveNumber(height);

	  if (isValidWidth && isValidHeight) {
	    var adjustedWidth = height * aspectRatio;

	    if ((type === 'contain' || type === 'none') && adjustedWidth > width || type === 'cover' && adjustedWidth < width) {
	      height = width / aspectRatio;
	    } else {
	      width = height * aspectRatio;
	    }
	  } else if (isValidWidth) {
	    height = width / aspectRatio;
	  } else if (isValidHeight) {
	    width = height * aspectRatio;
	  }

	  return {
	    width: width,
	    height: height
	  };
	}

	var ArrayBuffer$1 = WINDOW.ArrayBuffer,
	    FileReader = WINDOW.FileReader;
	var URL = WINDOW.URL || WINDOW.webkitURL;
	var REGEXP_EXTENSION = /\.\w+$/;
	var AnotherCompressor = WINDOW.Compressor;
	/**
	 * Creates a new image compressor.
	 * @class
	 */

	var Compressor = /*#__PURE__*/function () {
	  /**
	   * The constructor of Compressor.
	   * @param {File|Blob} file - The target image file for compressing.
	   * @param {Object} [options] - The options for compressing.
	   */
	  function Compressor(file, options) {
	    _classCallCheck(this, Compressor);

	    this.file = file;
	    this.image = new Image();
	    this.options = _objectSpread2(_objectSpread2({}, DEFAULTS), options);
	    this.aborted = false;
	    this.result = null;
	    this.init();
	  }

	  _createClass(Compressor, [{
	    key: "init",
	    value: function init() {
	      var _this = this;

	      var file = this.file,
	          options = this.options;

	      if (!isBlob(file)) {
	        this.fail(new Error('The first argument must be a File or Blob object.'));
	        return;
	      }

	      var mimeType = file.type;

	      if (!isImageType(mimeType)) {
	        this.fail(new Error('The first argument must be an image File or Blob object.'));
	        return;
	      }

	      if (!URL || !FileReader) {
	        this.fail(new Error('The current browser does not support image compression.'));
	        return;
	      }

	      if (!ArrayBuffer$1) {
	        options.checkOrientation = false;
	      }

	      if (URL && !options.checkOrientation) {
	        this.load({
	          url: URL.createObjectURL(file)
	        });
	      } else {
	        var reader = new FileReader();
	        var checkOrientation = options.checkOrientation && mimeType === 'image/jpeg';
	        this.reader = reader;

	        reader.onload = function (_ref) {
	          var target = _ref.target;
	          var result = target.result;
	          var data = {};

	          if (checkOrientation) {
	            // Reset the orientation value to its default value 1
	            // as some iOS browsers will render image with its orientation
	            var orientation = resetAndGetOrientation(result);

	            if (orientation > 1 || !URL) {
	              // Generate a new URL which has the default orientation value
	              data.url = arrayBufferToDataURL(result, mimeType);

	              if (orientation > 1) {
	                _extends(data, parseOrientation(orientation));
	              }
	            } else {
	              data.url = URL.createObjectURL(file);
	            }
	          } else {
	            data.url = result;
	          }

	          _this.load(data);
	        };

	        reader.onabort = function () {
	          _this.fail(new Error('Aborted to read the image with FileReader.'));
	        };

	        reader.onerror = function () {
	          _this.fail(new Error('Failed to read the image with FileReader.'));
	        };

	        reader.onloadend = function () {
	          _this.reader = null;
	        };

	        if (checkOrientation) {
	          reader.readAsArrayBuffer(file);
	        } else {
	          reader.readAsDataURL(file);
	        }
	      }
	    }
	  }, {
	    key: "load",
	    value: function load(data) {
	      var _this2 = this;

	      var file = this.file,
	          image = this.image;

	      image.onload = function () {
	        _this2.draw(_objectSpread2(_objectSpread2({}, data), {}, {
	          naturalWidth: image.naturalWidth,
	          naturalHeight: image.naturalHeight
	        }));
	      };

	      image.onabort = function () {
	        _this2.fail(new Error('Aborted to load the image.'));
	      };

	      image.onerror = function () {
	        _this2.fail(new Error('Failed to load the image.'));
	      }; // Match all browsers that use WebKit as the layout engine in iOS devices,
	      // such as Safari for iOS, Chrome for iOS, and in-app browsers.


	      if (WINDOW.navigator && /(?:iPad|iPhone|iPod).*?AppleWebKit/i.test(WINDOW.navigator.userAgent)) {
	        // Fix the `The operation is insecure` error (#57)
	        image.crossOrigin = 'anonymous';
	      }

	      image.alt = file.name;
	      image.src = data.url;
	    }
	  }, {
	    key: "draw",
	    value: function draw(_ref2) {
	      var _this3 = this;

	      var naturalWidth = _ref2.naturalWidth,
	          naturalHeight = _ref2.naturalHeight,
	          _ref2$rotate = _ref2.rotate,
	          rotate = _ref2$rotate === void 0 ? 0 : _ref2$rotate,
	          _ref2$scaleX = _ref2.scaleX,
	          scaleX = _ref2$scaleX === void 0 ? 1 : _ref2$scaleX,
	          _ref2$scaleY = _ref2.scaleY,
	          scaleY = _ref2$scaleY === void 0 ? 1 : _ref2$scaleY;
	      var file = this.file,
	          image = this.image,
	          options = this.options;
	      var canvas = document.createElement('canvas');
	      var context = canvas.getContext('2d');
	      var is90DegreesRotated = Math.abs(rotate) % 180 === 90;
	      var resizable = (options.resize === 'contain' || options.resize === 'cover') && isPositiveNumber(options.width) && isPositiveNumber(options.height);
	      var maxWidth = Math.max(options.maxWidth, 0) || Infinity;
	      var maxHeight = Math.max(options.maxHeight, 0) || Infinity;
	      var minWidth = Math.max(options.minWidth, 0) || 0;
	      var minHeight = Math.max(options.minHeight, 0) || 0;
	      var aspectRatio = naturalWidth / naturalHeight;
	      var width = options.width,
	          height = options.height;

	      if (is90DegreesRotated) {
	        var _ref3 = [maxHeight, maxWidth];
	        maxWidth = _ref3[0];
	        maxHeight = _ref3[1];
	        var _ref4 = [minHeight, minWidth];
	        minWidth = _ref4[0];
	        minHeight = _ref4[1];
	        var _ref5 = [height, width];
	        width = _ref5[0];
	        height = _ref5[1];
	      }

	      if (resizable) {
	        aspectRatio = width / height;
	      }

	      var _getAdjustedSizes = getAdjustedSizes({
	        aspectRatio: aspectRatio,
	        width: maxWidth,
	        height: maxHeight
	      }, 'contain');

	      maxWidth = _getAdjustedSizes.width;
	      maxHeight = _getAdjustedSizes.height;

	      var _getAdjustedSizes2 = getAdjustedSizes({
	        aspectRatio: aspectRatio,
	        width: minWidth,
	        height: minHeight
	      }, 'cover');

	      minWidth = _getAdjustedSizes2.width;
	      minHeight = _getAdjustedSizes2.height;

	      if (resizable) {
	        var _getAdjustedSizes3 = getAdjustedSizes({
	          aspectRatio: aspectRatio,
	          width: width,
	          height: height
	        }, options.resize);

	        width = _getAdjustedSizes3.width;
	        height = _getAdjustedSizes3.height;
	      } else {
	        var _getAdjustedSizes4 = getAdjustedSizes({
	          aspectRatio: aspectRatio,
	          width: width,
	          height: height
	        });

	        var _getAdjustedSizes4$wi = _getAdjustedSizes4.width;
	        width = _getAdjustedSizes4$wi === void 0 ? naturalWidth : _getAdjustedSizes4$wi;
	        var _getAdjustedSizes4$he = _getAdjustedSizes4.height;
	        height = _getAdjustedSizes4$he === void 0 ? naturalHeight : _getAdjustedSizes4$he;
	      }

	      width = Math.floor(normalizeDecimalNumber(Math.min(Math.max(width, minWidth), maxWidth)));
	      height = Math.floor(normalizeDecimalNumber(Math.min(Math.max(height, minHeight), maxHeight)));
	      var destX = -width / 2;
	      var destY = -height / 2;
	      var destWidth = width;
	      var destHeight = height;
	      var params = [];

	      if (resizable) {
	        var srcX = 0;
	        var srcY = 0;
	        var srcWidth = naturalWidth;
	        var srcHeight = naturalHeight;

	        var _getAdjustedSizes5 = getAdjustedSizes({
	          aspectRatio: aspectRatio,
	          width: naturalWidth,
	          height: naturalHeight
	        }, {
	          contain: 'cover',
	          cover: 'contain'
	        }[options.resize]);

	        srcWidth = _getAdjustedSizes5.width;
	        srcHeight = _getAdjustedSizes5.height;
	        srcX = (naturalWidth - srcWidth) / 2;
	        srcY = (naturalHeight - srcHeight) / 2;
	        params.push(srcX, srcY, srcWidth, srcHeight);
	      }

	      params.push(destX, destY, destWidth, destHeight);

	      if (is90DegreesRotated) {
	        var _ref6 = [height, width];
	        width = _ref6[0];
	        height = _ref6[1];
	      }

	      canvas.width = width;
	      canvas.height = height;

	      if (!isImageType(options.mimeType)) {
	        options.mimeType = file.type;
	      }

	      var fillStyle = 'transparent'; // Converts PNG files over the `convertSize` to JPEGs.

	      if (file.size > options.convertSize && options.convertTypes.indexOf(options.mimeType) >= 0) {
	        options.mimeType = 'image/jpeg';
	      }

	      if (options.mimeType === 'image/jpeg') {
	        fillStyle = '#fff';
	      } // Override the default fill color (#000, black)


	      context.fillStyle = fillStyle;
	      context.fillRect(0, 0, width, height);

	      if (options.beforeDraw) {
	        options.beforeDraw.call(this, context, canvas);
	      }

	      if (this.aborted) {
	        return;
	      }

	      context.save();
	      context.translate(width / 2, height / 2);
	      context.rotate(rotate * Math.PI / 180);
	      context.scale(scaleX, scaleY);
	      context.drawImage.apply(context, [image].concat(params));
	      context.restore();

	      if (options.drew) {
	        options.drew.call(this, context, canvas);
	      }

	      if (this.aborted) {
	        return;
	      }

	      var done = function done(result) {
	        if (!_this3.aborted) {
	          _this3.done({
	            naturalWidth: naturalWidth,
	            naturalHeight: naturalHeight,
	            result: result
	          });
	        }
	      };

	      if (canvas.toBlob) {
	        canvas.toBlob(done, options.mimeType, options.quality);
	      } else {
	        done(toBlob(canvas.toDataURL(options.mimeType, options.quality)));
	      }
	    }
	  }, {
	    key: "done",
	    value: function done(_ref7) {
	      var naturalWidth = _ref7.naturalWidth,
	          naturalHeight = _ref7.naturalHeight,
	          result = _ref7.result;
	      var file = this.file,
	          image = this.image,
	          options = this.options;

	      if (URL && !options.checkOrientation) {
	        URL.revokeObjectURL(image.src);
	      }

	      if (result) {
	        // Returns original file if the result is greater than it and without size related options
	        if (options.strict && result.size > file.size && options.mimeType === file.type && !(options.width > naturalWidth || options.height > naturalHeight || options.minWidth > naturalWidth || options.minHeight > naturalHeight || options.maxWidth < naturalWidth || options.maxHeight < naturalHeight)) {
	          result = file;
	        } else {
	          var date = new Date();
	          result.lastModified = date.getTime();
	          result.lastModifiedDate = date;
	          result.name = file.name; // Convert the extension to match its type

	          if (result.name && result.type !== file.type) {
	            result.name = result.name.replace(REGEXP_EXTENSION, imageTypeToExtension(result.type));
	          }
	        }
	      } else {
	        // Returns original file if the result is null in some cases.
	        result = file;
	      }

	      this.result = result;

	      if (options.success) {
	        options.success.call(this, result);
	      }
	    }
	  }, {
	    key: "fail",
	    value: function fail(err) {
	      var options = this.options;

	      if (options.error) {
	        options.error.call(this, err);
	      } else {
	        throw err;
	      }
	    }
	  }, {
	    key: "abort",
	    value: function abort() {
	      if (!this.aborted) {
	        this.aborted = true;

	        if (this.reader) {
	          this.reader.abort();
	        } else if (!this.image.complete) {
	          this.image.onload = null;
	          this.image.onabort();
	        } else {
	          this.fail(new Error('The compression process has been aborted.'));
	        }
	      }
	    }
	    /**
	     * Get the no conflict compressor class.
	     * @returns {Compressor} The compressor class.
	     */

	  }], [{
	    key: "noConflict",
	    value: function noConflict() {
	      window.Compressor = AnotherCompressor;
	      return Compressor;
	    }
	    /**
	     * Change the default options.
	     * @param {Object} options - The new default options.
	     */

	  }, {
	    key: "setDefaults",
	    value: function setDefaults(options) {
	      _extends(DEFAULTS, options);
	    }
	  }]);

	  return Compressor;
	}();

	var downloadImage = /*#__PURE__*/function () {
	  var _ref = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(filePath) {
	    var responese, blob;
	    return regenerator.wrap(function _callee$(_context) {
	      while (1) {
	        switch (_context.prev = _context.next) {
	          case 0:
	            _context.next = 2;
	            return fetch(filePath);

	          case 2:
	            responese = _context.sent;
	            _context.next = 5;
	            return responese.blob();

	          case 5:
	            blob = _context.sent;
	            return _context.abrupt("return", blob);

	          case 7:
	          case "end":
	            return _context.stop();
	        }
	      }
	    }, _callee);
	  }));

	  return function downloadImage(_x) {
	    return _ref.apply(this, arguments);
	  };
	}();
	var generateBlobUrl = function generateBlobUrl(blob) {
	  var blobInstance = new Blob([blob], {
	    type: 'application/octet-stream'
	  });
	  var href = window.URL.createObjectURL(blobInstance);
	  return href;
	};
	var saveImageForH5 = /*#__PURE__*/function () {
	  var _ref2 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2(filePath) {
	    var result, blob, href, downloadElement;
	    return regenerator.wrap(function _callee2$(_context2) {
	      while (1) {
	        switch (_context2.prev = _context2.next) {
	          case 0:
	            if (!filePath) {
	              _context2.next = 20;
	              break;
	            }

	            result = true;
	            _context2.prev = 2;
	            _context2.next = 5;
	            return downloadImage(filePath);

	          case 5:
	            blob = _context2.sent;
	            href = generateBlobUrl(blob);
	            downloadElement = document.createElement('a');
	            downloadElement.href = href;
	            downloadElement.download = filePath.split('/').reverse()[0];
	            document.body.appendChild(downloadElement);
	            downloadElement.click();
	            document.body.removeChild(downloadElement);
	            window.URL.revokeObjectURL(href);
	            _context2.next = 19;
	            break;

	          case 16:
	            _context2.prev = 16;
	            _context2.t0 = _context2["catch"](2);
	            result = false;

	          case 19:
	            return _context2.abrupt("return", result);

	          case 20:
	            return _context2.abrupt("return", false);

	          case 21:
	          case "end":
	            return _context2.stop();
	        }
	      }
	    }, _callee2, null, [[2, 16]]);
	  }));

	  return function saveImageForH5(_x2) {
	    return _ref2.apply(this, arguments);
	  };
	}();
	var compressForH5 = function compressForH5(blob, quality) {
	  return new Promise(function (resolve, reject) {
	    new Compressor(blob, {
	      quality: (quality || 80) / 100,
	      success: function success(res) {
	        var tempFilePath = generateBlobUrl(res);
	        resolve({
	          tempFilePath: tempFilePath,
	          errMsg: 'compressImage:ok'
	        });
	      },
	      error: reject
	    });
	  });
	};

	var ENV_TYPE = {
	  WEAPP: 'WEAPP',
	  WEB: 'WEB',
	  RN: 'RN',
	  SWAN: 'SWAN',
	  ALIPAY: 'ALIPAY',
	  TT: 'TT',
	  QQ: 'QQ',
	  JD: 'JD'
	};

	var _excluded = ["errMsg"];

	function useImage(options) {
	  var fileInfoRef = vue.ref({});
	  var env = Taro.getEnv();

	  var chooseImageAsync = function chooseImageAsync() {
	    var option = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    var count = options.count,
	        sizeType = options.sizeType,
	        sourceType = options.sourceType;
	    var finalOptions = Object.assign({}, Object.fromEntries([['count', count], ['sizeType', sizeType], ['sourceType', sourceType]].filter(function (v) {
	      return v[1];
	    }) || []), option || {});
	    return new Promise(function (resolve, reject) {
	      try {
	        Taro.chooseImage(_objectSpread(_objectSpread({}, finalOptions), {}, {
	          success: function success(res) {
	            var errMsg = res.errMsg,
	                fileInfo = _objectWithoutProperties(res, _excluded);

	            fileInfoRef.value = fileInfo;
	            resolve(res);
	          },
	          fail: reject
	        })).catch(reject);
	      } catch (e) {
	        reject(e);
	      }
	    });
	  };

	  var previewImageAsync = function previewImageAsync(option) {
	    return new Promise(function (resolve, reject) {
	      try {
	        Taro.previewImage(_objectSpread(_objectSpread({}, option), {}, {
	          success: resolve,
	          fail: reject
	        })).catch(reject);
	      } catch (e) {
	        reject(e);
	      }
	    });
	  };

	  var saveImageToPhotosAlbumAsync = function saveImageToPhotosAlbumAsync(filePath) {
	    return new Promise( /*#__PURE__*/function () {
	      var _ref = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(resolve, reject) {
	        var result;
	        return regenerator.wrap(function _callee$(_context) {
	          while (1) {
	            switch (_context.prev = _context.next) {
	              case 0:
	                if (filePath) {
	                  _context.next = 4;
	                  break;
	                }

	                reject('you must provide filePath');
	                _context.next = 18;
	                break;

	              case 4:
	                _context.prev = 4;

	                if (!(env === ENV_TYPE.WEB)) {
	                  _context.next = 12;
	                  break;
	                }

	                _context.next = 8;
	                return saveImageForH5(filePath);

	              case 8:
	                result = _context.sent;

	                if (result) {
	                  resolve({
	                    errMsg: 'save success'
	                  });
	                } else {
	                  reject('save fail');
	                }

	                _context.next = 13;
	                break;

	              case 12:
	                Taro.saveImageToPhotosAlbum({
	                  filePath: filePath,
	                  success: resolve,
	                  fail: reject
	                }).catch(reject);

	              case 13:
	                _context.next = 18;
	                break;

	              case 15:
	                _context.prev = 15;
	                _context.t0 = _context["catch"](4);
	                reject(_context.t0);

	              case 18:
	              case "end":
	                return _context.stop();
	            }
	          }
	        }, _callee, null, [[4, 15]]);
	      }));

	      return function (_x, _x2) {
	        return _ref.apply(this, arguments);
	      };
	    }());
	  };

	  var getImageInfoAsync = function getImageInfoAsync(src) {
	    return new Promise(function (resolve, reject) {
	      if (!src) {
	        reject('please enter a valid path');
	      } else {
	        try {
	          Taro.getImageInfo({
	            src: src,
	            success: resolve,
	            fail: reject
	          }).catch(reject);
	        } catch (e) {
	          reject(e);
	        }
	      }
	    });
	  };

	  var chooseMessageFileAsync = function chooseMessageFileAsync(count, type, extension) {
	    return new Promise(function (resolve, reject) {
	      if (!count || env !== ENV_TYPE.WEAPP) {
	        reject('you must provide count');
	      } else {
	        try {
	          var payload = Object.fromEntries([['type', type], ['extension', extension]].filter(function (v) {
	            return v[1];
	          }) || []);
	          Taro__default['default'].chooseMessageFile(_objectSpread(_objectSpread({
	            count: count
	          }, payload), {}, {
	            success: resolve,
	            fail: reject
	          }));
	        } catch (e) {
	          reject(e);
	        }
	      }
	    });
	  };

	  var compressImageAsync = function compressImageAsync(src, quality) {
	    return new Promise( /*#__PURE__*/function () {
	      var _ref2 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2(resolve, reject) {
	        var blob;
	        return regenerator.wrap(function _callee2$(_context2) {
	          while (1) {
	            switch (_context2.prev = _context2.next) {
	              case 0:
	                if (!src) {
	                  reject('you must provide src');
	                }

	                _context2.prev = 1;

	                if (!(env === ENV_TYPE.WEB)) {
	                  _context2.next = 9;
	                  break;
	                }

	                _context2.next = 5;
	                return downloadImage(src);

	              case 5:
	                blob = _context2.sent;
	                compressForH5(blob, quality).then(resolve, reject);
	                _context2.next = 10;
	                break;

	              case 9:
	                Taro__default['default'].compressImage(_objectSpread(_objectSpread({
	                  src: src
	                }, quality ? {
	                  quality: quality
	                } : {}), {}, {
	                  success: resolve,
	                  fail: reject
	                })).catch(reject);

	              case 10:
	                _context2.next = 15;
	                break;

	              case 12:
	                _context2.prev = 12;
	                _context2.t0 = _context2["catch"](1);
	                reject(_context2.t0);

	              case 15:
	              case "end":
	                return _context2.stop();
	            }
	          }
	        }, _callee2, null, [[1, 12]]);
	      }));

	      return function (_x3, _x4) {
	        return _ref2.apply(this, arguments);
	      };
	    }());
	  };

	  return [fileInfoRef, {
	    choose: chooseImageAsync,
	    chooseMessageFile: chooseMessageFileAsync,
	    preview: previewImageAsync,
	    save: saveImageToPhotosAlbumAsync,
	    getInfo: getImageInfoAsync,
	    compress: compressImageAsync
	  }];
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
	          Taro.showModal(_objectSpread(_objectSpread({}, options), {}, {
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

	var _typeof_1 = createCommonjsModule(function (module) {
	function _typeof(obj) {
	  "@babel/helpers - typeof";

	  return (module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
	    return typeof obj;
	  } : function (obj) {
	    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	  }, module.exports.__esModule = true, module.exports["default"] = module.exports), _typeof(obj);
	}

	module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;
	});

	var _typeof = /*@__PURE__*/getDefaultExportFromCjs(_typeof_1);

	var typeOf = function typeOf(target, type) {
	  return [type].flat().some(function (v) {
	    return Object.prototype.toString.call(target) === "[object ".concat(v, "]");
	  });
	};

	function stringfiyUrl(url, options) {
	  var stringfiyUrl = url;

	  if (options && _typeof(options) === 'object') {
	    var hasQuery = stringfiyUrl.includes('?');
	    stringfiyUrl += (hasQuery ? '&' : '?') + querystring.stringify(options);
	  }

	  return stringfiyUrl;
	}

	function useRouter() {
	  var router = Taro.useRouter();

	  var switchTabSync = function switchTabSync(url, options) {
	    return new Promise(function (resolve, reject) {
	      try {
	        url = stringfiyUrl(url, options);
	        Taro.switchTab({
	          url: url,
	          success: resolve,
	          fail: reject
	        }).catch(reject);
	      } catch (e) {
	        reject(e);
	      }
	    });
	  };

	  var relaunchSync = function relaunchSync(url, options) {
	    return new Promise(function (resolve, reject) {
	      try {
	        url = stringfiyUrl(url, options);
	        Taro.reLaunch({
	          url: url,
	          success: resolve,
	          fail: reject
	        }).catch(reject);
	      } catch (e) {
	        reject(e);
	      }
	    });
	  };

	  var redirectToSync = function redirectToSync(url, options) {
	    return new Promise(function (resolve, reject) {
	      try {
	        url = stringfiyUrl(url, options);
	        Taro.redirectTo({
	          url: url,
	          success: resolve,
	          fail: reject
	        }).catch(reject);
	      } catch (e) {
	        reject(e);
	      }
	    });
	  };

	  var navigateToSync = function navigateToSync(urlOrMark, options) {
	    return new Promise(function (resolve, reject) {
	      try {
	        var _ref = options || {},
	            appId = _ref.appId; // if appid exist, use navigateToMiniprogram


	        if (appId && urlOrMark) {
	          Taro.navigateToMiniProgram(_objectSpread(_objectSpread({}, options), {}, {
	            appId: appId,
	            success: resolve,
	            fail: reject
	          })).catch(reject);
	        } else if (typeOf(urlOrMark, 'String')) {
	          urlOrMark = stringfiyUrl(urlOrMark, options);
	          Taro.navigateTo({
	            url: urlOrMark,
	            success: resolve,
	            fail: reject
	          }).catch(reject);
	        }
	      } catch (e) {
	        reject(e);
	      }
	    });
	  };

	  var navigateBackSync = function navigateBackSync(deltaOrMark, extraData) {
	    return new Promise(function (resolve, reject) {
	      try {
	        // if deltaOrMark is boolean, use navigateBackMiniprogram
	        if (typeOf(deltaOrMark, 'Boolean') && deltaOrMark) {
	          Taro.navigateBackMiniProgram(_objectSpread(_objectSpread({}, extraData ? {
	            extraData: extraData
	          } : {}), {}, {
	            success: resolve,
	            fail: reject
	          })).catch(reject);
	        } else {
	          Taro.navigateBack(_objectSpread(_objectSpread({}, deltaOrMark ? {
	            deltaOrMark: deltaOrMark
	          } : {}), {}, {
	            success: resolve,
	            fail: reject
	          })).catch(reject);
	        }
	      } catch (e) {
	        reject(e);
	      }
	    });
	  };

	  return [router, {
	    switchTab: switchTabSync,
	    relaunch: relaunchSync,
	    redirectTo: redirectToSync,
	    navigateTo: navigateToSync,
	    navigateBack: navigateBackSync
	  }];
	}

	exports.createInjectionState = createInjectionState;
	exports.refThrottled = refThrottled;
	exports.useApp = useApp;
	exports.useEvent = useEvent;
	exports.useImage = useImage;
	exports.useLoading = useLoading;
	exports.useModal = useModal;
	exports.useRouter = useRouter;
	exports.useThrottleFn = useThrottleFn;
	exports.useToast = useToast;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=taro-vues.js.map
