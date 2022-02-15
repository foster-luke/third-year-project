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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n\n\nclass TensorFlow extends react__WEBPACK_IMPORTED_MODULE_0__.Component {\n  constructor(props) {\n    super(props);\n    this.state = {\n      modelTrainingResults: \"\"\n    };\n    this.trainModel = this.trainModel.bind(this);\n  }\n\n  trainModel() {\n    console.log(this);\n    this.setState({\n      modelTrainingResults: \"model results!\"\n    });\n  }\n\n  render() {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"button\", {\n      className: \"btn btn-primary\",\n      onClick: this.trainModel\n    }, \"Train Model\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"span\", null, this.state.modelTrainingResults));\n  }\n\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TensorFlow);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9UZW5zb3JGbG93L1RlbnNvckZsb3cuanN4LmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7O0FBRUEsTUFBTUUsVUFBTixTQUF5QkYsNENBQXpCLENBQXlDO0FBQ3JDRyxFQUFBQSxXQUFXLENBQUNDLEtBQUQsRUFBUTtBQUNmLFVBQU1BLEtBQU47QUFDQSxTQUFLQyxLQUFMLEdBQWE7QUFBRUMsTUFBQUEsb0JBQW9CLEVBQUU7QUFBeEIsS0FBYjtBQUVBLFNBQUtDLFVBQUwsR0FBa0IsS0FBS0EsVUFBTCxDQUFnQkMsSUFBaEIsQ0FBcUIsSUFBckIsQ0FBbEI7QUFDSDs7QUFFREQsRUFBQUEsVUFBVSxHQUFHO0FBQ1RFLElBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLElBQVo7QUFDQSxTQUFLQyxRQUFMLENBQWM7QUFBQ0wsTUFBQUEsb0JBQW9CLEVBQUU7QUFBdkIsS0FBZDtBQUNIOztBQUVETSxFQUFBQSxNQUFNLEdBQUc7QUFDTCx3QkFBTyxpSEFDSDtBQUFRLGVBQVMsRUFBQyxpQkFBbEI7QUFBb0MsYUFBTyxFQUFFLEtBQUtMO0FBQWxELHFCQURHLGVBSUgsK0RBQU8sS0FBS0YsS0FBTCxDQUFXQyxvQkFBbEIsQ0FKRyxDQUFQO0FBTUg7O0FBcEJvQzs7QUF1QnpDLGlFQUFlSixVQUFmIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbXktbmV3LWFwcC8uL3NyYy9jb21wb25lbnRzL1RlbnNvckZsb3cvVGVuc29yRmxvdy5qc3g/YzJiYSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuXG5jbGFzcyBUZW5zb3JGbG93IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB7IG1vZGVsVHJhaW5pbmdSZXN1bHRzOiBcIlwiIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMudHJhaW5Nb2RlbCA9IHRoaXMudHJhaW5Nb2RlbC5iaW5kKHRoaXMpO1xuICAgIH1cblxuICAgIHRyYWluTW9kZWwoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHttb2RlbFRyYWluaW5nUmVzdWx0czogXCJtb2RlbCByZXN1bHRzIVwifSlcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiA8PlxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnlcIiBvbkNsaWNrPXt0aGlzLnRyYWluTW9kZWx9PlxuICAgICAgICAgICAgICAgIFRyYWluIE1vZGVsXG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDxzcGFuPnt0aGlzLnN0YXRlLm1vZGVsVHJhaW5pbmdSZXN1bHRzfTwvc3Bhbj5cbiAgICAgICAgPC8+XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBUZW5zb3JGbG93OyJdLCJuYW1lcyI6WyJSZWFjdCIsIkNvbXBvbmVudCIsIlRlbnNvckZsb3ciLCJjb25zdHJ1Y3RvciIsInByb3BzIiwic3RhdGUiLCJtb2RlbFRyYWluaW5nUmVzdWx0cyIsInRyYWluTW9kZWwiLCJiaW5kIiwiY29uc29sZSIsImxvZyIsInNldFN0YXRlIiwicmVuZGVyIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/components/TensorFlow/TensorFlow.jsx\n");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("fc7583f54428143dbef3")
/******/ })();
/******/ 
/******/ }
);