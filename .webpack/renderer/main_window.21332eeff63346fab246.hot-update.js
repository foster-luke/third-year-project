"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdatemy_new_app"]("main_window",{

/***/ "./src/components/TensorFlow/TensorFlow.jsx":
/*!**************************************************!*\
  !*** ./src/components/TensorFlow/TensorFlow.jsx ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n\n\nclass TensorFlow extends react__WEBPACK_IMPORTED_MODULE_0__.Component {\n  constructor(props) {\n    super(props);\n    this.state = {\n      modelTrainingResults: \"\"\n    };\n  }\n\n  trainModel(e) {\n    this.state.modelTrainingResults = \"model results!\";\n  }\n\n  render() {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"button\", {\n      className: \"btn btn-primary\",\n      onClick: this.trainModel\n    }, \"Train Model\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"span\", null, modelTrainingResults));\n  }\n\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TensorFlow);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9UZW5zb3JGbG93L1RlbnNvckZsb3cuanN4LmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7O0FBRUEsTUFBTUUsVUFBTixTQUF5QkQsNENBQXpCLENBQW1DO0FBQy9CRSxFQUFBQSxXQUFXLENBQUNDLEtBQUQsRUFBUTtBQUNmLFVBQU1BLEtBQU47QUFDQSxTQUFLQyxLQUFMLEdBQWE7QUFBQ0MsTUFBQUEsb0JBQW9CLEVBQUU7QUFBdkIsS0FBYjtBQUNIOztBQUVEQyxFQUFBQSxVQUFVLENBQUNDLENBQUQsRUFBSTtBQUNWLFNBQUtILEtBQUwsQ0FBV0Msb0JBQVgsR0FBa0MsZ0JBQWxDO0FBQ0g7O0FBRURHLEVBQUFBLE1BQU0sR0FBRztBQUNMLHdCQUFPLGlIQUNIO0FBQVEsZUFBUyxFQUFDLGlCQUFsQjtBQUFvQyxhQUFPLEVBQUUsS0FBS0Y7QUFBbEQscUJBREcsZUFJSCwrREFBT0Qsb0JBQVAsQ0FKRyxDQUFQO0FBTUg7O0FBakI4Qjs7QUFvQm5DLGlFQUFlSixVQUFmIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbXktbmV3LWFwcC8uL3NyYy9jb21wb25lbnRzL1RlbnNvckZsb3cvVGVuc29yRmxvdy5qc3g/YzJiYSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuXG5jbGFzcyBUZW5zb3JGbG93IGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB7bW9kZWxUcmFpbmluZ1Jlc3VsdHM6IFwiXCJ9XG4gICAgfVxuXG4gICAgdHJhaW5Nb2RlbChlKSB7XG4gICAgICAgIHRoaXMuc3RhdGUubW9kZWxUcmFpbmluZ1Jlc3VsdHMgPSBcIm1vZGVsIHJlc3VsdHMhXCJcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiA8PlxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnlcIiBvbkNsaWNrPXt0aGlzLnRyYWluTW9kZWx9PlxuICAgICAgICAgICAgICAgIFRyYWluIE1vZGVsXG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDxzcGFuPnttb2RlbFRyYWluaW5nUmVzdWx0c308L3NwYW4+XG4gICAgICAgIDwvPlxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVGVuc29yRmxvdzsiXSwibmFtZXMiOlsiUmVhY3QiLCJDb21wb25lbnQiLCJUZW5zb3JGbG93IiwiY29uc3RydWN0b3IiLCJwcm9wcyIsInN0YXRlIiwibW9kZWxUcmFpbmluZ1Jlc3VsdHMiLCJ0cmFpbk1vZGVsIiwiZSIsInJlbmRlciJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/components/TensorFlow/TensorFlow.jsx\n");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("ec1c82cbf837bab69849")
/******/ })();
/******/ 
/******/ }
);