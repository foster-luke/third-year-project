import React from 'react';
import PropTypes from 'prop-types';
import * as tf from '@tensorflow/tfjs';

/**
 * Model training component
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
   * Custom asynchronous foreach function
   * Credit to https://codeburst.io/javascript-async-await-with-foreach-b6ba62bbf404
   * @param {*} array
   * @param {*} callback
   */
  async asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }

  /**
   * Train the model
   * @return {*}
   */
  async trainModel() {
    const podcastSlug = this.props.podcast.slug;

    // Get labelled episodes
    const labelledEpisodes =
      await window.machineLearning.getLabelledEpisodes(podcastSlug);
    // Get sample data for each labelled episode
    let samples = [];
    const labels = [];

    let longestEpisodeLength = 0;
    const start = async () => {
      await this.asyncForEach(labelledEpisodes, async (episode) => {
        // Get episode sample data and add it to array of all episodes
        const episodeSampleData =
          await window
              .machineLearning
              .getSampleData(podcastSlug, episode.number);
        samples.push(episodeSampleData);
        // Get the longest episode length
        if (episodeSampleData.length > longestEpisodeLength) {
          longestEpisodeLength = episodeSampleData.length;
        }

        // Add labelled sections for this episode to array
        episode.sections.forEach((section) => {
          labels.push([
            section.startSeconds,
            section.endSeconds,
          ]);
        });
      });
    };
    await start();

    // Pad the end of the sample data for each
    // episode to match longest podcast length
    samples = samples.map(function(episodeSamples) {
      for (let i = episodeSamples.length; i < longestEpisodeLength; i++) {
        episodeSamples.push([0, 0, 0, 0, 0, 0, 0]);
      }
      return episodeSamples;
    });

    // Create tensors
    const labelledSections = tf.tensor2d(labels, [labels.length, 2]);
    const data = tf.tensor3d(
        samples,
        [samples.length, samples[0].length, samples[0][0].length],
    );

    // Create model layers
    const model = tf.sequential();
    model.add(tf.layers.flatten({
      units: 2500,
      activation: 'relu',
      inputShape: [longestEpisodeLength, samples[0][0].length],
    }));
    model.add(tf.layers.dense({units: 1750, activation: 'relu'}));
    model.add(tf.layers.dense({units: 500, activation: 'relu'}));
    model.add(tf.layers.dense({units: 250, activation: 'relu'}));
    model.add(tf.layers.dense({units: 150, activation: 'relu'}));
    model.add(tf.layers.dense({units: 50, activation: 'relu'}));
    model.add(tf.layers.dense({units: 15, activation: 'relu'}));
    model.add(tf.layers.dense({units: 2, activation: 'relu'}));

    model.compile({
      optimizer: tf.train.adamax(0.000001),
      loss: 'meanSquaredError',
      metrics: ['accuracy', tf.losses.absoluteDifference],
    });

    // Train model
    model.fit(data, labelledSections, {
      epochs: 200,
      batchSize: 6,
    }).then((info) => {
    // Post training tasks
      console.log(info);
      this.setState({
        modelTrainingResults: JSON.stringify(info),
      });
    });
    return true;
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
