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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n\n\nclass TensorFlow extends react__WEBPACK_IMPORTED_MODULE_0__.Component {\n  constructor(props) {\n    super(props);\n    this.state = {\n      modelTrainingResults: \"\"\n    };\n  }\n\n  trainModel() {\n    this.setState({\n      modelTrainingResults: \"model results!\"\n    });\n  }\n\n  render() {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"button\", {\n      className: \"btn btn-primary\",\n      onClick: this.trainModel\n    }, \"Train Model\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"span\", null, this.state.modelTrainingResults));\n  }\n\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TensorFlow);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9UZW5zb3JGbG93L1RlbnNvckZsb3cuanN4LmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7O0FBRUEsTUFBTUUsVUFBTixTQUF5QkYsNENBQXpCLENBQXlDO0FBQ3JDRyxFQUFBQSxXQUFXLENBQUNDLEtBQUQsRUFBUTtBQUNmLFVBQU1BLEtBQU47QUFDQSxTQUFLQyxLQUFMLEdBQWE7QUFBQ0MsTUFBQUEsb0JBQW9CLEVBQUU7QUFBdkIsS0FBYjtBQUNIOztBQUVEQyxFQUFBQSxVQUFVLEdBQUc7QUFDVCxTQUFLQyxRQUFMLENBQWM7QUFBQ0YsTUFBQUEsb0JBQW9CLEVBQUU7QUFBdkIsS0FBZDtBQUNIOztBQUVERyxFQUFBQSxNQUFNLEdBQUc7QUFDTCx3QkFBTyxpSEFDSDtBQUFRLGVBQVMsRUFBQyxpQkFBbEI7QUFBb0MsYUFBTyxFQUFFLEtBQUtGO0FBQWxELHFCQURHLGVBSUgsK0RBQU8sS0FBS0YsS0FBTCxDQUFXQyxvQkFBbEIsQ0FKRyxDQUFQO0FBTUg7O0FBakJvQzs7QUFvQnpDLGlFQUFlSixVQUFmIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbXktbmV3LWFwcC8uL3NyYy9jb21wb25lbnRzL1RlbnNvckZsb3cvVGVuc29yRmxvdy5qc3g/YzJiYSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuXG5jbGFzcyBUZW5zb3JGbG93IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB7bW9kZWxUcmFpbmluZ1Jlc3VsdHM6IFwiXCJ9XG4gICAgfVxuXG4gICAgdHJhaW5Nb2RlbCgpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7bW9kZWxUcmFpbmluZ1Jlc3VsdHM6IFwibW9kZWwgcmVzdWx0cyFcIn0pXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gPD5cbiAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5XCIgb25DbGljaz17dGhpcy50cmFpbk1vZGVsfT5cbiAgICAgICAgICAgICAgICBUcmFpbiBNb2RlbFxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8c3Bhbj57dGhpcy5zdGF0ZS5tb2RlbFRyYWluaW5nUmVzdWx0c308L3NwYW4+XG4gICAgICAgIDwvPlxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVGVuc29yRmxvdzsiXSwibmFtZXMiOlsiUmVhY3QiLCJDb21wb25lbnQiLCJUZW5zb3JGbG93IiwiY29uc3RydWN0b3IiLCJwcm9wcyIsInN0YXRlIiwibW9kZWxUcmFpbmluZ1Jlc3VsdHMiLCJ0cmFpbk1vZGVsIiwic2V0U3RhdGUiLCJyZW5kZXIiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/components/TensorFlow/TensorFlow.jsx\n");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("16322111ababcb4edbeb")
/******/ })();
/******/ 
/******/ }
);