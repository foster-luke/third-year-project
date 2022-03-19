/* eslint-disable prefer-spread */
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

train();

// processPodcastFiles();

async function processPodcastFiles() {
  let averages = [await processPodcastFile('my_brother_my_brother_me-564-564-0b7a2e', '.mp3', './assets/podcasts/')];
  averages.push(await processPodcastFile('my_brother_my_brother_me-580-580-e74a91', '.mp3', './assets/podcasts/'));
  averages.push(await processPodcastFile('my_brother_my_brother_me-581-581-e96140', '.mp3', './assets/podcasts/'));
  averages.push(await processPodcastFile('my_brother_my_brother_me-582-582-13d737', '.mp3', './assets/podcasts/'));
  averages.push(await processPodcastFile('my_brother_my_brother_me-584-584-f688fa', '.mp3', './assets/podcasts/'));
  averages.push(await processPodcastFile('my_brother_my_brother_me-585-585-bb7da8', '.mp3', './assets/podcasts/'));
  averages.push(await processPodcastFile('my_brother_my_brother_me-586-586-1a9992', '.mp3', './assets/podcasts/'));
  averages.push(await processPodcastFile('my_brother_my_brother_me-587-587-9f7b10', '.mp3', './assets/podcasts/'));
  averages.push(await processPodcastFile('my_brother_my_brother_me-588-588-771eb1', '.mp3', './assets/podcasts/'));
  averages.push(await processPodcastFile('my_brother_my_brother_me-590-590-cdf91b', '.mp3', './assets/podcasts/'));
  averages.push(await processPodcastFile('my_brother_my_brother_me-595-ep_595-9f67b7', '.mp3', './assets/podcasts/'));
  averages.push(await processPodcastFile('my_brother_my_brother_me-598-ep_598-c7ef5e', '.mp3', './assets/podcasts/'));
  saveSampleDataToFile(averages, './data/sample_data/data.json');
}

async function processPodcastFile(fileName, fileExt, fileDir) {
  const tempFileDir = './assets/podcasts/data_tmp';
  const filePath = fileDir + fileName + fileExt;
  const wavFile = convertToWav(fileName, fileExt, fileDir);

  const length = await getAudioDurationInSeconds(fileDir + fileName + fileExt).then((duration) => {
    return parseInt(duration);
  });
  // length = 501;
  let averages = [];
  for (let i = 0; i < length; i += 500) {
    let localAverages = await splitAudioFile(wavFile.clone(), tempFileDir, i, length, filePath);
    averages = averages.concat(localAverages);
  }
  let ret = {};
  ret[filePath] = averages;
  return ret;
}

function convertToWav(fileName, fileExt, filePathDir) {
  const filePath = filePathDir + '/' + fileName + fileExt;
  const file = ffmpeg(filePath).format('wav');
  return file;
}

function splitAudioFile(wavFile, tempFileDir, startLength, endLength, filePath) {
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
    averages = extractSampleData(tempFileDir, startLength, endLength, filePath);
    return averages;
  });
}

async function extractSampleData(tempFileDir, startLength, endLength, fileName) {
  if (startLength + 500 < endLength) endLength = startLength + 500;
  let averages = [];
  for (let seek = startLength; seek < endLength; seek += 1) {
    const filePath = tempFileDir + '/split_' + seek + '.wav';
    const buffer = fs.readFileSync(filePath);
    const result = wav.decode(buffer);
    let total = 0;
    let data = result.channelData[0].sort();
    for (let index = 0; index < data.length; index++) {
      total += data[index];
    }
    let average = total / data.length;
    deleteTempFile(filePath);
    averages.push({
      time: seek,
      mean: average,
      lowest: data[0],
      highest: data[data.length -1],
      lowerQuartile: data[data.length / 4],
      median: data[data.length / 2],
      upperQuartile: data[data.length / 4 * 3],
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

function getSampleData() {
  const result = JSON.parse(fs.readFileSync('./data/sample_data/data.json'));

  return result;
}

function getLabelledSections(filePath) {
  let labelledSections = {};
  const result = JSON.parse(fs.readFileSync('./data/podcast_info.json'));
  let episodes = result[0].episodes;
  labelledSections = episodes.find((episode) => episode.filePath === filePath).sections;
  labelledSections = labelledSections.map(function(section) {
    startSection = section.start.split(':');
    endSection = section.end.split(':');
    startSeconds = 0;
    endSeconds = 0;
    startSeconds = parseInt(startSection[startSection.length - 3] ?? 0) * 60 * 60 + parseInt(startSection[startSection.length - 2]) * 60 + parseInt(startSection[startSection.length - 1]);
    endSeconds = parseInt(endSection[startSection.length - 3] ?? 0) * 60 * 60 + parseInt(endSection[endSection.length - 2]) * 60 + parseInt(endSection[endSection.length - 1]);
    return {
      startSeconds: startSeconds,
      endSeconds: endSeconds,
    };
  });
  return labelledSections;
}

// Start model training process.
async function train() {
  // Generate dummy data.
  // const data = tf.randomNormal([100, 784]);
  // const samples = getSampleData();
  const sampleData = getSampleData();
  let labels = null;
  let samples = [];
  sampleData.forEach((episode) => {
    filePath = (Object.keys(episode)[0]);
    episodeSamples = episode[filePath].map(function(sample) {
      return [
        sample.time,
        sample.lowest,
        sample.lowerQuartile,
        sample.mean,
        sample.median,
        sample.upperQuartile,
        sample.highest,
      ];
    });
    samples.push(episodeSamples);
    labelledSection = getLabelledSections(filePath)[0];
    if (labels == null) {
      labels = tf.zeros([labelledSection.startSeconds, 1])
          .concat(tf.ones([labelledSection.endSeconds - labelledSection.startSeconds, 1]))
          .concat(tf.zeros([episodeSamples.length - labelledSection.endSeconds, 1]));
    } else {
      labels = labels.concat(tf.zeros([labelledSection.startSeconds, 1])
          .concat(tf.ones([labelledSection.endSeconds - labelledSection.startSeconds, 1]))
          .concat(tf.zeros([episodeSamples.length - labelledSection.endSeconds, 1])));
    }
  });
  samples = [].concat.apply([], samples);
  const data = tf.tensor2d(samples);
  // return;
  // const labels = tf.randomUniform([100, 10]);
  let labelsArr = [];
  // const labels = tf.ones([samples.length, 1]);
  function onBatchEnd(batch, logs) {
  }

  // First dense layer uses relu activation.
  const denseLayer1 = tf.layers.dense({units: 10, activation: 'relu'});
  const denseLayer2 = tf.layers.dense({units: 1, activation: 'sigmoid'});

  // Obtain the output symbolic tensor by applying the layers on the input.
  const input = tf.input({shape: [7]});
  const output = denseLayer2.apply(denseLayer1.apply(input));


  // Create the model based on the inputs.
  const model = tf.sequential({
    layers: [
      tf.layers.dense({inputShape: [7], units: 1, activation: 'relu'}),
      tf.layers.dense({units: 1, activation: 'relu'}),
      tf.layers.dense({units: 1, activation: 'relu'}),
      tf.layers.dense({units: 1, activation: 'relu'}),
    ],
  });

  model.compile({
    optimizer: tf.train.adamax(),
    loss: tf.losses.softmaxCrossEntropy,
    metrics: ['accuracy', 'precision', tf.metrics.recall, 'mse'],
  });

  // model.summary();

  // Train for 5 epochs with batch size of 32.
  model.fit(data, labels, {
    epochs: 20,
    batchSize: 320,
  }).then((info) => {
    let predictions = model.predict(tf.tensor2d(samples));
    predictions.print();
  //  fs.writeFileSync('./data/sample_data/result.csv', predictions.arraySync().join('\n'));
  });
}

