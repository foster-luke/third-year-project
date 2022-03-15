/* eslint-disable prefer-const */
/* eslint-disable max-len */
/* eslint-disable new-cap */
/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
const tf = require('@tensorflow/tfjs-node');
const fsPromises = require('fs').promises;
const fs = require('fs');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);
const wav = require('node-wav');
const {getAudioDurationInSeconds} = require('get-audio-duration');

// train();
// processPodcastFile();

async function processPodcastFile() {
  const tempFileDir = './assets/podcasts/data_tmp';
  const wavFile = convertToWav('my_brother_my_brother_me-595-ep_595-9f67b7', '.mp3', './assets/podcasts');

  const length = await getAudioDurationInSeconds('./assets/podcasts/my_brother_my_brother_me-595-ep_595-9f67b7.mp3').then((duration) => {
    return parseInt(duration);
  });
  // length = 501;
  let averages = [];
  for (let i = 0; i < length; i += 500) {
    let localAverages = await splitAudioFile(wavFile.clone(), tempFileDir, i, length);
    averages = averages.concat(localAverages);
  }
  saveSampleDataToFile(averages, './data/sample_data/data.json');
}

function convertToWav(fileName, fileExt, filePathDir) {
  const filePath = filePathDir + '/' + fileName + fileExt;
  const file = ffmpeg(filePath).format('wav');
  return file;
}

function splitAudioFile(wavFile, tempFileDir, startLength, endLength) {
  if (startLength + 500 < endLength) endLength = startLength + 500;
  console.log(startLength);
  console.log(endLength);
  let splitPromise = new Promise((resolve, reject) => {
    wavFile.on('end', resolve);
    for (let seek = startLength; seek < endLength; seek += 1) {
      const filePath = tempFileDir + '/split_' + seek + '.wav';
      wavFile.output(filePath)
          .seekOutput(seek)
          .duration(1);
    }
    wavFile.run();
  });
  return splitPromise.then(function(ret) {
    averages = extractSampleData(tempFileDir, startLength, endLength);
    return averages;
  });
}

async function extractSampleData(tempFileDir, startLength, endLength) {
  if (startLength + 500 < endLength) endLength = startLength + 500;
  let averages = [];
  for (let seek = startLength; seek < endLength; seek += 1) {
    const filePath = tempFileDir + '/split_' + seek + '.wav';
    const buffer = fs.readFileSync(filePath);
    const result = wav.decode(buffer);
    let total = 0;
    for (let index = 0; index < result.channelData[0].length; index++) {
      total += result.channelData[0][index];
    }
    let average = total / result.channelData[0].length;
    deleteTempFile(filePath);
    averages.push({
      time: seek,
      average: average,
    });
  }
  return averages;
}

function deleteTempFile(filePath) {
  fs.rmSync(filePath);
}

function saveSampleDataToFile(data, filePath) {
  fs.writeFileSync(filePath, JSON.stringify(data));
}


async function getAudioFile() {
  const result = await fsPromises.readFile('./assets/podcasts/small.mp3', {
    encoding: 'base64',
  })
      .then(function(result) {
        return result;
      })
      .catch(function(error) {
        throw error;
      });

  return result;
}

// Start model training process.
async function train() {
  const model = tf.sequential({
    layers: [
      tf.layers.dense({inputShape: [784], units: 32, activation: 'relu'}),
      tf.layers.dense({units: 10, activation: 'softmax'}),
    ],
  });
  model.weights.forEach((w) => {
  });
  model.weights.forEach((w) => {
    const newVals = tf.randomNormal(w.shape);
    // w.val is an instance of tf.Variable
    w.val.assign(newVals);
  });
  model.compile({
    optimizer: 'sgd',
    loss: 'categoricalCrossentropy',
    metrics: ['accuracy'],
  });
  // Generate dummy data.
  const data = tf.randomNormal([100, 784]);
  const labels = tf.randomUniform([100, 10]);

  function onBatchEnd(batch, logs) {
  }

  // Train for 5 epochs with batch size of 32.
  model.fit(data, labels, {
    epochs: 5,
    batchSize: 32,
    callbacks: {onBatchEnd},
  }).then((info) => {
  });
}

