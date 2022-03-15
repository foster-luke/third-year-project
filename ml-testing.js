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


const tempFileDir = './assets/podcasts/data_tmp';
const wavFile = convertToWav('my_brother_my_brother_me-595-ep_595-9f67b7', '.mp3', './assets/podcasts');
let averages = splitAudioFile(wavFile, tempFileDir);
// const averages = extractSampleData(tempFileDir);
console.log(averages);


// train();

function convertToWav(fileName, fileExt, filePathDir) {
  const filePath = filePathDir + '/' + fileName + fileExt;
  const file = ffmpeg(filePath).format('wav');
  return file;
}

function splitAudioFile(wavFile, tempFileDir) {
  let splitPromise = new Promise((resolve, reject) => {
    let averages;
    // wavFile.on('end', function() {
    //   averages = extractSampleData(tempFileDir);
    // });
    wavFile.on('end', resolve);
    for (let seek = 0; seek < 10; seek += 1) {
      const filePath = tempFileDir + '/split_' + seek + '.wav';
      wavFile.seekInput(seek)
          .inputOptions('-t ' + 1)
          .output(filePath);
    }
    wavFile.run();
  });
  return splitPromise.then(function(ret) {
    averages = extractSampleData(tempFileDir);
    console.log(averages);
    return averages;
  });
}

function extractSampleData(tempFileDir) {
  let averages = [];
  for (let seek = 0; seek < 10; seek += 1) {
    const filePath = tempFileDir + '/split_' + seek + '.wav';
    console.log(filePath);
    const buffer = fs.readFileSync(filePath);
    const result = wav.decode(buffer);
    let total = 0;
    for (let index = 0; index < result.channelData[0].length; index++) {
      total += result.channelData[0][index];
    }
    let average = total / result.channelData[0].length;
    averages.push({
      time: seek,
      average: average,
    });
  }
  // fs.writeFile()
  return averages;
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

