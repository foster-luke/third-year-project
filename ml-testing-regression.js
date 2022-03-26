/* eslint-disable prefer-spread */
/* eslint-disable prefer-const */
/* eslint-disable max-len */
/* eslint-disable new-cap */
/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
const tf = require('@tensorflow/tfjs-node-gpu');
const fs = require('fs');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);

train('my_brother_my_brother_me');

function getSampleData(podcastSlug, episodeNumber) {
  const storedEpisodeSampleData = JSON.parse(fs.readFileSync('./data/sample_data/' + podcastSlug + '/' + episodeNumber + '.json'));
  episodeSampleData = [];
  // Extract sample data into usable array
  storedEpisodeSampleData.forEach((sample) => {
    episodeSampleData.push([
      sample.time,
      sample.lowest,
      sample.lowerQuartile,
      sample.mean,
      sample.median,
      sample.upperQuartile,
      sample.highest,
    ]);
  });
  return episodeSampleData;
}

function getLabelledEpisodes(podcastSlug) {
  // Get all podcasts data
  const result = JSON.parse(fs.readFileSync('./data/podcast_info.json'));

  // Get the data of a specific podcast
  let episodes = result.find((podcast) => podcast.slug === podcastSlug).episodes;

  // Extract the needed data for each episode
  let labelledEpisodes = [];
  episodes.forEach((episode) => {
    // Get the labelled sections
    let sections = [];
    episode.sections.forEach((section) => {
      startSection = section.start.split(':');
      endSection = section.end.split(':');
      startSeconds = parseInt(startSection[startSection.length - 3] ?? 0) * 60 * 60 + parseInt(startSection[startSection.length - 2]) * 60 + parseInt(startSection[startSection.length - 1]);
      endSeconds = parseInt(endSection[startSection.length - 3] ?? 0) * 60 * 60 + parseInt(endSection[endSection.length - 2]) * 60 + parseInt(endSection[endSection.length - 1]);
      sections.push(
          {
            startSeconds: startSeconds,
            endSeconds: endSeconds,
          },
      );
    });

    labelledEpisodes.push({
      number: episode.number,
      sections: sections,
    });
  });
  return labelledEpisodes;
}


// Start model training process.
async function train(podcastSlug) {
  // Get labelled episodes
  const labelledEpisodes = getLabelledEpisodes(podcastSlug);

  // Get sample data for each labelled episode
  let samples = [];
  let labels = [];
  let longestEpisodeLength = 0;
  labelledEpisodes.forEach((episode) => {
    // Get episode sample data and add it to array of all episodes
    episodeSampleData = getSampleData(podcastSlug, episode.number);
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

  // Pad the end of the sample data for each episode to match longest podcast length
  samples = samples.map(function(episodeSamples) {
    for (let i = episodeSamples.length; i < longestEpisodeLength; i++) {
      episodeSamples.push([0, 0, 0, 0, 0, 0, 0]);
    }
    return episodeSamples;
  });

  // Remove training data
  trainingLabels = [labels.pop()];
  trainingLabels.push(labels.pop());
  trainingLabels.push(labels.pop());
  trainingSamples = [samples.pop()];
  trainingSamples.push(samples.pop());
  trainingSamples.push(samples.pop());

  // Create tensors
  labelledSections = tf.tensor2d(labels);
  trainingLabelledSections = tf.tensor2d(trainingLabels);
  const data = tf.tensor3d(samples);
  const trainingData = tf.tensor3d(trainingSamples);

  // Create model layers
  const model = tf.sequential();
  model.add(tf.layers.flatten({units: 2500, activation: 'relu', inputShape: [longestEpisodeLength, samples[0][0].length]}));
  model.add(tf.layers.dense({units: 1750, activation: 'relu'}));
  model.add(tf.layers.dense({units: 500, activation: 'relu'}));
  model.add(tf.layers.dense({units: 250, activation: 'relu'}));
  model.add(tf.layers.dense({units: 150, activation: 'relu'}));
  model.add(tf.layers.dense({units: 50, activation: 'relu'}));
  model.add(tf.layers.dense({units: 15, activation: 'relu'}));
  model.add(tf.layers.dense({units: 2, activation: 'relu'}));

  model.compile({
    optimizer: tf.train.adamax(0.00001),
    loss: 'meanSquaredError',
    metrics: ['accuracy', tf.losses.absoluteDifference],
  });

  // Train model
  model.fit(data, labelledSections, {
    epochs: 500,
    batchSize: 6,
  }).then((info) => {
    // Post training tasks
    console.log(trainingLabels);
    let predictions = model.predict(trainingData);
    predictions.print();
    predsArr = predictions.arraySync();
    console.log('Ep 1 start Diff: ' + parseInt(Math.abs(predsArr[0][0] - trainingLabels[0][0])));
    console.log('Ep 1 end Diff: ' + parseInt(Math.abs(predsArr[0][1] - trainingLabels[0][1])));
    console.log('Ep 2 start Diff: ' + parseInt(Math.abs(predsArr[1][0] - trainingLabels[1][0])));
    console.log('Ep 2 end Diff: ' + parseInt(Math.abs(predsArr[1][1] - trainingLabels[1][1])));
    console.log('Ep 3 start Diff: ' + parseInt(Math.abs(predsArr[2][0] - trainingLabels[2][0])));
    console.log('Ep 3 end Diff: ' + parseInt(Math.abs(predsArr[2][1] - trainingLabels[2][1])));
  });
}

