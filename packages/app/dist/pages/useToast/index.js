(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["pages/useToast/index"],{

/***/ "../../node_modules/@tarojs/taro-loader/lib/raw.js!./src/pages/useToast/index.vue":
/*!****************************************************************************************************************************************!*\
  !*** /Users/wukewei/Documents/outproject/vongi/taro-vueuse/node_modules/@tarojs/taro-loader/lib/raw.js!./src/pages/useToast/index.vue ***!
  \****************************************************************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _index_vue_vue_type_template_id_3be00632__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.vue?vue&type=template&id=3be00632 */ "./src/pages/useToast/index.vue?vue&type=template&id=3be00632");
/* harmony import */ var _index_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.vue?vue&type=script&lang=js */ "./src/pages/useToast/index.vue?vue&type=script&lang=js");
/* harmony import */ var _index_vue_vue_type_style_index_0_id_3be00632_lang_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index.vue?vue&type=style&index=0&id=3be00632&lang=scss */ "./src/pages/useToast/index.vue?vue&type=style&index=0&id=3be00632&lang=scss");
/* harmony import */ var _Users_wukewei_Documents_outproject_vongi_taro_vueuse_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! /Users/wukewei/Documents/outproject/vongi/taro-vueuse/node_modules/vue-loader/dist/exportHelper.js */ "../../node_modules/vue-loader/dist/exportHelper.js");
/* harmony import */ var _Users_wukewei_Documents_outproject_vongi_taro_vueuse_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_Users_wukewei_Documents_outproject_vongi_taro_vueuse_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__);







const __exports__ = /*#__PURE__*/_Users_wukewei_Documents_outproject_vongi_taro_vueuse_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3___default()(_index_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"], [['render',_index_vue_vue_type_template_id_3be00632__WEBPACK_IMPORTED_MODULE_0__[/* render */ "a"]],['__file',"src/pages/useToast/index.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ __webpack_exports__["a"] = (__exports__);

/***/ }),

/***/ "../../node_modules/babel-loader/lib/index.js!../../node_modules/vue-loader/dist/index.js?!./src/pages/useToast/index.vue?vue&type=script&lang=js":
/*!************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/wukewei/Documents/outproject/vongi/taro-vueuse/node_modules/babel-loader/lib!/Users/wukewei/Documents/outproject/vongi/taro-vueuse/node_modules/vue-loader/dist??ref--10-0!./src/pages/useToast/index.vue?vue&type=script&lang=js ***!
  \************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _Users_wukewei_Documents_outproject_vongi_taro_vueuse_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! /Users/wukewei/Documents/outproject/vongi/taro-vueuse/node_modules/@babel/runtime/helpers/esm/slicedToArray.js */ "../../node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var taro_vueuse__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! taro-vueuse */ "../vueuse/es/useToast/index.js");


/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'use-toast',
  components: {},
  setup: function setup() {
    var _useToast = Object(taro_vueuse__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(),
        _useToast2 = Object(_Users_wukewei_Documents_outproject_vongi_taro_vueuse_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(_useToast, 2),
        _useToast2$ = _useToast2[0],
        showNoneAsync = _useToast2$.showNoneAsync,
        showNoneTimeoutAsync = _useToast2$.showNoneTimeoutAsync,
        hide = _useToast2[1];

    var handleClick = function handleClick() {
      showNoneAsync('showNoneAsync').then(function () {
        return console.log("立马输出");
      });
    };

    var handleTimeOutClick = function handleTimeOutClick() {
      showNoneTimeoutAsync('showNoneTimeoutAsync').then(function () {
        return console.log("1.5s输出");
      });
      ;
    };

    return {
      handleClick: handleClick,
      handleTimeOutClick: handleTimeOutClick
    };
  }
});

/***/ }),

/***/ "../../node_modules/babel-loader/lib/index.js!../../node_modules/vue-loader/dist/templateLoader.js?!../../node_modules/vue-loader/dist/index.js?!./src/pages/useToast/index.vue?vue&type=template&id=3be00632":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/wukewei/Documents/outproject/vongi/taro-vueuse/node_modules/babel-loader/lib!/Users/wukewei/Documents/outproject/vongi/taro-vueuse/node_modules/vue-loader/dist/templateLoader.js??ref--6!/Users/wukewei/Documents/outproject/vongi/taro-vueuse/node_modules/vue-loader/dist??ref--10-0!./src/pages/useToast/index.vue?vue&type=template&id=3be00632 ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render */
/*! exports used: render */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "../../node_modules/vue/dist/vue.runtime.esm-bundler.js");

var _hoisted_1 = {
  class: "index"
};
var _hoisted_2 = {
  class: "btn"
};

var _hoisted_3 = /*#__PURE__*/Object(vue__WEBPACK_IMPORTED_MODULE_0__[/* createTextVNode */ "i"])("showNoneAsync");

var _hoisted_4 = /*#__PURE__*/Object(vue__WEBPACK_IMPORTED_MODULE_0__[/* createTextVNode */ "i"])("showNoneTimeoutAsync");

function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_nut_button = Object(vue__WEBPACK_IMPORTED_MODULE_0__[/* resolveComponent */ "v"])("nut-button");

  return Object(vue__WEBPACK_IMPORTED_MODULE_0__[/* openBlock */ "q"])(), Object(vue__WEBPACK_IMPORTED_MODULE_0__[/* createElementBlock */ "g"])("view", _hoisted_1, [Object(vue__WEBPACK_IMPORTED_MODULE_0__[/* createElementVNode */ "h"])("view", _hoisted_2, [Object(vue__WEBPACK_IMPORTED_MODULE_0__[/* createVNode */ "j"])(_component_nut_button, {
    type: "primary",
    onClick: $setup.handleClick
  }, {
    default: Object(vue__WEBPACK_IMPORTED_MODULE_0__[/* withCtx */ "A"])(function () {
      return [_hoisted_3];
    }),
    _: 1
    /* STABLE */

  }, 8
  /* PROPS */
  , ["onClick"]), Object(vue__WEBPACK_IMPORTED_MODULE_0__[/* createVNode */ "j"])(_component_nut_button, {
    type: "primary",
    onClick: $setup.handleTimeOutClick
  }, {
    default: Object(vue__WEBPACK_IMPORTED_MODULE_0__[/* withCtx */ "A"])(function () {
      return [_hoisted_4];
    }),
    _: 1
    /* STABLE */

  }, 8
  /* PROPS */
  , ["onClick"])])]);
}

/***/ }),

/***/ "../../node_modules/mini-css-extract-plugin/dist/loader.js!../../node_modules/css-loader/dist/cjs.js?!../../node_modules/vue-loader/dist/stylePostLoader.js!../../node_modules/postcss-loader/dist/cjs.js?!../../node_modules/@tarojs/mini-runner/node_modules/resolve-url-loader/index.js!../../node_modules/sass-loader/dist/cjs.js?!../../node_modules/vue-loader/dist/index.js?!./src/pages/useToast/index.vue?vue&type=style&index=0&id=3be00632&lang=scss":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/wukewei/Documents/outproject/vongi/taro-vueuse/node_modules/mini-css-extract-plugin/dist/loader.js!/Users/wukewei/Documents/outproject/vongi/taro-vueuse/node_modules/css-loader/dist/cjs.js??ref--1-oneOf-0-1!/Users/wukewei/Documents/outproject/vongi/taro-vueuse/node_modules/vue-loader/dist/stylePostLoader.js!/Users/wukewei/Documents/outproject/vongi/taro-vueuse/node_modules/postcss-loader/dist/cjs.js??ref--1-oneOf-0-2!/Users/wukewei/Documents/outproject/vongi/taro-vueuse/node_modules/@tarojs/mini-runner/node_modules/resolve-url-loader!/Users/wukewei/Documents/outproject/vongi/taro-vueuse/node_modules/sass-loader/dist/cjs.js??ref--1-oneOf-0-4!/Users/wukewei/Documents/outproject/vongi/taro-vueuse/node_modules/vue-loader/dist??ref--10-0!./src/pages/useToast/index.vue?vue&type=style&index=0&id=3be00632&lang=scss ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "../vueuse/es/useToast/index.js":
/*!**************************************!*\
  !*** ../vueuse/es/useToast/index.js ***!
  \**************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectSpread2 */ "../../node_modules/@babel/runtime/helpers/esm/objectSpread2.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tarojs/taro */ "../../node_modules/@tarojs/taro/index.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_tarojs_taro__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils */ "../vueuse/es/utils/index.js");




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
            Object(_tarojs_taro__WEBPACK_IMPORTED_MODULE_1__["showToast"])(Object(_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(Object(_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])({}, options), {}, {
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
        Object(_tarojs_taro__WEBPACK_IMPORTED_MODULE_1__["hideToast"])({
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
      return Object(_utils__WEBPACK_IMPORTED_MODULE_2__[/* timeOutPromise */ "a"])(1500);
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

/* harmony default export */ __webpack_exports__["a"] = (useToast);

/***/ }),

/***/ "../vueuse/es/utils/index.js":
/*!***********************************!*\
  !*** ../vueuse/es/utils/index.js ***!
  \***********************************/
/*! exports provided: timeOutPromise */
/*! exports used: timeOutPromise */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return timeOutPromise; });
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

/***/ }),

/***/ "./src/pages/useToast/index.vue":
/*!**************************************!*\
  !*** ./src/pages/useToast/index.vue ***!
  \**************************************/
/*! no exports provided */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _tarojs_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tarojs/runtime */ "../../node_modules/@tarojs/runtime/dist/runtime.esm.js");
/* harmony import */ var _node_modules_tarojs_taro_loader_lib_raw_js_index_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../node_modules/@tarojs/taro-loader/lib/raw.js!./index.vue */ "../../node_modules/@tarojs/taro-loader/lib/raw.js!./src/pages/useToast/index.vue");


var config = {"navigationBarTitleText":"useToash"};


var inst = Page(Object(_tarojs_runtime__WEBPACK_IMPORTED_MODULE_0__["createPageConfig"])(_node_modules_tarojs_taro_loader_lib_raw_js_index_vue__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"], 'pages/useToast/index', {root:{cn:[]}}, config || {}))




/***/ }),

/***/ "./src/pages/useToast/index.vue?vue&type=script&lang=js":
/*!**************************************************************!*\
  !*** ./src/pages/useToast/index.vue?vue&type=script&lang=js ***!
  \**************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_dist_index_js_ref_10_0_index_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib!../../../../../node_modules/vue-loader/dist??ref--10-0!./index.vue?vue&type=script&lang=js */ "../../node_modules/babel-loader/lib/index.js!../../node_modules/vue-loader/dist/index.js?!./src/pages/useToast/index.vue?vue&type=script&lang=js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_dist_index_js_ref_10_0_index_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["a"]; });

 

/***/ }),

/***/ "./src/pages/useToast/index.vue?vue&type=style&index=0&id=3be00632&lang=scss":
/*!***********************************************************************************!*\
  !*** ./src/pages/useToast/index.vue?vue&type=style&index=0&id=3be00632&lang=scss ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_1_oneOf_0_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_ref_1_oneOf_0_2_node_modules_tarojs_mini_runner_node_modules_resolve_url_loader_index_js_node_modules_sass_loader_dist_cjs_js_ref_1_oneOf_0_4_node_modules_vue_loader_dist_index_js_ref_10_0_index_vue_vue_type_style_index_0_id_3be00632_lang_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/mini-css-extract-plugin/dist/loader.js!../../../../../node_modules/css-loader/dist/cjs.js??ref--1-oneOf-0-1!../../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../../node_modules/postcss-loader/dist/cjs.js??ref--1-oneOf-0-2!../../../../../node_modules/@tarojs/mini-runner/node_modules/resolve-url-loader!../../../../../node_modules/sass-loader/dist/cjs.js??ref--1-oneOf-0-4!../../../../../node_modules/vue-loader/dist??ref--10-0!./index.vue?vue&type=style&index=0&id=3be00632&lang=scss */ "../../node_modules/mini-css-extract-plugin/dist/loader.js!../../node_modules/css-loader/dist/cjs.js?!../../node_modules/vue-loader/dist/stylePostLoader.js!../../node_modules/postcss-loader/dist/cjs.js?!../../node_modules/@tarojs/mini-runner/node_modules/resolve-url-loader/index.js!../../node_modules/sass-loader/dist/cjs.js?!../../node_modules/vue-loader/dist/index.js?!./src/pages/useToast/index.vue?vue&type=style&index=0&id=3be00632&lang=scss");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_1_oneOf_0_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_ref_1_oneOf_0_2_node_modules_tarojs_mini_runner_node_modules_resolve_url_loader_index_js_node_modules_sass_loader_dist_cjs_js_ref_1_oneOf_0_4_node_modules_vue_loader_dist_index_js_ref_10_0_index_vue_vue_type_style_index_0_id_3be00632_lang_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_ref_1_oneOf_0_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_ref_1_oneOf_0_2_node_modules_tarojs_mini_runner_node_modules_resolve_url_loader_index_js_node_modules_sass_loader_dist_cjs_js_ref_1_oneOf_0_4_node_modules_vue_loader_dist_index_js_ref_10_0_index_vue_vue_type_style_index_0_id_3be00632_lang_scss__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "./src/pages/useToast/index.vue?vue&type=template&id=3be00632":
/*!********************************************************************!*\
  !*** ./src/pages/useToast/index.vue?vue&type=template&id=3be00632 ***!
  \********************************************************************/
/*! exports provided: render */
/*! exports used: render */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_dist_templateLoader_js_ref_6_node_modules_vue_loader_dist_index_js_ref_10_0_index_vue_vue_type_template_id_3be00632__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib!../../../../../node_modules/vue-loader/dist/templateLoader.js??ref--6!../../../../../node_modules/vue-loader/dist??ref--10-0!./index.vue?vue&type=template&id=3be00632 */ "../../node_modules/babel-loader/lib/index.js!../../node_modules/vue-loader/dist/templateLoader.js?!../../node_modules/vue-loader/dist/index.js?!./src/pages/useToast/index.vue?vue&type=template&id=3be00632");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_dist_templateLoader_js_ref_6_node_modules_vue_loader_dist_index_js_ref_10_0_index_vue_vue_type_template_id_3be00632__WEBPACK_IMPORTED_MODULE_0__["a"]; });



/***/ })

},[["./src/pages/useToast/index.vue","runtime","taro","vendors"]]]);
//# sourceMappingURL=index.js.map