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