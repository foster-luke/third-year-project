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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n\n\nclass TensorFlow extends react__WEBPACK_IMPORTED_MODULE_0__.Component {\n  constructor(props) {\n    super(props);\n    this.state = {\n      modelTrainingResults: \"\"\n    };\n  }\n\n  trainModel(e) {\n    this.state.modelTrainingResults = \"model results!\";\n  }\n\n  render() {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"button\", {\n      className: \"btn btn-primary\",\n      onClick: this.trainModel\n    }, \"Train Model\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"span\", null, this.state.modelTrainingResults));\n  }\n\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TensorFlow);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9UZW5zb3JGbG93L1RlbnNvckZsb3cuanN4LmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7O0FBRUEsTUFBTUUsVUFBTixTQUF5QkQsNENBQXpCLENBQW1DO0FBQy9CRSxFQUFBQSxXQUFXLENBQUNDLEtBQUQsRUFBUTtBQUNmLFVBQU1BLEtBQU47QUFDQSxTQUFLQyxLQUFMLEdBQWE7QUFBQ0MsTUFBQUEsb0JBQW9CLEVBQUU7QUFBdkIsS0FBYjtBQUNIOztBQUVEQyxFQUFBQSxVQUFVLENBQUNDLENBQUQsRUFBSTtBQUNWLFNBQUtILEtBQUwsQ0FBV0Msb0JBQVgsR0FBa0MsZ0JBQWxDO0FBQ0g7O0FBRURHLEVBQUFBLE1BQU0sR0FBRztBQUNMLHdCQUFPLGlIQUNIO0FBQVEsZUFBUyxFQUFDLGlCQUFsQjtBQUFvQyxhQUFPLEVBQUUsS0FBS0Y7QUFBbEQscUJBREcsZUFJSCwrREFBTyxLQUFLRixLQUFMLENBQVdDLG9CQUFsQixDQUpHLENBQVA7QUFNSDs7QUFqQjhCOztBQW9CbkMsaUVBQWVKLFVBQWYiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9teS1uZXctYXBwLy4vc3JjL2NvbXBvbmVudHMvVGVuc29yRmxvdy9UZW5zb3JGbG93LmpzeD9jMmJhIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5cbmNsYXNzIFRlbnNvckZsb3cgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHttb2RlbFRyYWluaW5nUmVzdWx0czogXCJcIn1cbiAgICB9XG5cbiAgICB0cmFpbk1vZGVsKGUpIHtcbiAgICAgICAgdGhpcy5zdGF0ZS5tb2RlbFRyYWluaW5nUmVzdWx0cyA9IFwibW9kZWwgcmVzdWx0cyFcIlxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIDw+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeVwiIG9uQ2xpY2s9e3RoaXMudHJhaW5Nb2RlbH0+XG4gICAgICAgICAgICAgICAgVHJhaW4gTW9kZWxcbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPHNwYW4+e3RoaXMuc3RhdGUubW9kZWxUcmFpbmluZ1Jlc3VsdHN9PC9zcGFuPlxuICAgICAgICA8Lz5cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFRlbnNvckZsb3c7Il0sIm5hbWVzIjpbIlJlYWN0IiwiQ29tcG9uZW50IiwiVGVuc29yRmxvdyIsImNvbnN0cnVjdG9yIiwicHJvcHMiLCJzdGF0ZSIsIm1vZGVsVHJhaW5pbmdSZXN1bHRzIiwidHJhaW5Nb2RlbCIsImUiLCJyZW5kZXIiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/components/TensorFlow/TensorFlow.jsx\n");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("7d363cd5c8856e15ac80")
/******/ })();
/******/ 
/******/ }
);