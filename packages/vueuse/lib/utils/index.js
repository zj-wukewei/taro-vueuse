"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.timeOutPromise = void 0;

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

exports.timeOutPromise = timeOutPromise;