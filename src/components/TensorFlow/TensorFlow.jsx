import React, { Component } from 'react';

class TensorFlow extends React.Component {
    constructor(props) {
        super(props);
        this.state = { modelTrainingResults: "" }
        
        this.trainModel = this.trainModel.bind(this);
    }

    trainModel() {
        console.log(this);
        this.setState({modelTrainingResults: "model results!"})
    }

    render() {
        return <>
            <button className="btn btn-primary" onClick={this.trainModel}>
                Train Model
            </button>
            <span>{this.state.modelTrainingResults}</span>
        </>
    }
}

export default TensorFlow;