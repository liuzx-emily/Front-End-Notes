/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _layer = __webpack_require__(3);

var _layer2 = _interopRequireDefault(_layer);

var _layer3 = __webpack_require__(2);

var _layer4 = _interopRequireDefault(_layer3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import "./layer.less";
// import './layer.scss';

function layer() {
    var NUM = 5;
    return {
        name: 'layer',
        tpl: _layer4.default,
        tplhtml: _layer2.default
    };
}

exports.default = layer;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _layer = __webpack_require__(0);

var _layer2 = _interopRequireDefault(_layer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// import "./css/common.css";
var App = function App() {
    var oApp = document.querySelector('#app');
    oApp.innerHTML += (0, _layer2.default)().tplhtml;
    oApp.innerHTML += new _layer2.default().tpl({
        name: 'emily',
        arr: [].concat(_toConsumableArray('biu'))
    });
    // oApp.innerHTML = layer.tpl({
    //     name: 'emily',
    //     arr: [0.5, "ha", 3]
    // });
    console.log(_layer2.default);
};

new App();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = function (obj) {
obj || (obj = {});
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="layer2">\r\n	<img src="' +
((__t = (__webpack_require__(4))) == null ? '' : __t) +
'" alt="" width="50">\r\n  	<div>layer.tpl中的内容' +
((__t = ( name )) == null ? '' : __t) +
'</div>\r\n  	';
 for(var i=0;i<arr.length;i++) { ;
__p += '\r\n  		' +
((__t = ( arr[i] )) == null ? '' : __t) +
'\r\n  	';
 } ;
__p += '\r\n</div>\r\n\r\n';

}
return __p
}

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = "<div class=\"layer1\">\r\n    <div>layer.html中的内容</div>\r\n</div>\r\n";

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/11-007f4.jpg";

/***/ })
/******/ ]);