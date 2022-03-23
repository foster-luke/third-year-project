import React from 'react';
import PropTypes from 'prop-types';
import * as tf from '@tensorflow/tfjs';

/**
 * Main Section component
 */
class ModelTraining extends React.Component {
  /**
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {};
    this.trainModel = this.trainModel.bind(this);
  }

  /**
   * Train the model
   */
  trainModel() {
    // Define a model for linear regression.
    const model = tf.sequential();
    model.add(tf.layers.dense({units: 1, inputShape: [1]}));

    model.compile({loss: 'meanSquaredError', optimizer: 'sgd'});

    // Generate some synthetic data for training.
    const xs = tf.tensor2d([1, 2, 3, 4], [4, 1]);
    const ys = tf.tensor2d([1, 3, 5, 7], [4, 1]);

    // Train the model using the data.
    model.fit(xs, ys, {epochs: 100}).then(() => {
      /**
       * Use the model to do inference on a data point the model hasn't
       * seen before:
       */
      this.setState({
        modelTrainingResults:
          model.predict(tf.tensor2d([9], [1, 1])).toString(),
      });
    });
  }


  /**
   * @return {string}
   */
  render() {
    return <>
      {this.props.podcast.name}
      <button className="btn btn-primary" onClick={this.trainModel}>
                Train Model
      </button>
      <span>{this.state.modelTrainingResults}</span>
    </>;
  }
}

ModelTraining.propTypes = {
  podcast: PropTypes.object.isRequired,
};

export default ModelTraining;
