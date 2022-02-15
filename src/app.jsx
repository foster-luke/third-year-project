import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import TensorFlow from './components/TensorFlow/TensorFlow.jsx'

function render() {
    ReactDOM.render(
        <>
        <h2>Hello from React!</h2>
        <div className="container">
            <div className="row">
                <div className="col-sm">
                One of three columns
                </div>
                <div className="col-sm">
                One of three columns
                </div>
                <div className="col-sm">
                One of three columns
                </div>
            </div>
            </div>
            <TensorFlow />
        </>
        , document.body);
}

render();