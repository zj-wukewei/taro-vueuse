export * from './types';
import { unref } from 'vue';
export var timeOutPromise = function timeOutPromise(time) {
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

export function createFilterWrapper(filter, fn) {
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

export function throttleFilter(ms) {
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
    var duration = unref(ms);
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