"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  timeOutPromise: true,
  createFilterWrapper: true,
  debounceFilter: true,
  throttleFilter: true
};
exports.createFilterWrapper = createFilterWrapper;
exports.debounceFilter = debounceFilter;
exports.throttleFilter = throttleFilter;
exports.timeOutPromise = void 0;

var _types = require("./types");

Object.keys(_types).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _types[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _types[key];
    }
  });
});

var _vue = require("vue");

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


exports.timeOutPromise = timeOutPromise;

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
 * Create an EventFilter that debounce the events
 *
 * @param ms
 * @param [maxWait=null]
 */


function debounceFilter(ms) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var timer;
  var maxTimer;

  var filter = function filter(invoke) {
    var duration = (0, _vue.unref)(ms);
    var maxDuration = (0, _vue.unref)(options.maxWait);
    if (timer) clearTimeout(timer);

    if (duration <= 0 || maxDuration !== undefined && maxDuration <= 0) {
      if (maxTimer) {
        clearTimeout(maxTimer);
        maxTimer = null;
      }

      return invoke();
    } // Create the maxTimer. Clears the regular timer on invokation


    if (maxDuration && !maxTimer) {
      maxTimer = setTimeout(function () {
        if (timer) clearTimeout(timer);
        maxTimer = null;
        invoke();
      }, maxDuration);
    } // Create the regular timer. Clears the max timer on invokation


    timer = setTimeout(function () {
      if (maxTimer) clearTimeout(maxTimer);
      maxTimer = null;
      invoke();
    }, duration);
  };

  return filter;
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
    var duration = (0, _vue.unref)(ms);
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