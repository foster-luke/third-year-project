/* eslint-disable prefer-spread */
/* eslint-disable prefer-const */
/* eslint-disable max-len */
/* eslint-disable new-cap */
/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
const fs = require('fs');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);
const wav = require('node-wav');
const {getAudioDurationInSeconds} = require('get-audio-duration');

// Get podcast episode details from command arguments
const myArgs = process.argv.slice(2);
if (myArgs[0] === undefined) {
  throw new Error('Please add a podcast slug to your node command');
}
if (myArgs[1] === undefined) {
  throw new Error('Please add a episode number to your node command');
}
if (myArgs[2] === undefined) {
  throw new Error('Please add a file name to your node command, e.g. \'my_brother_my_brother_me-564-564-0b7a2e\'');
}
const podcastSlug = myArgs[0]; // 'my_brother_my_brother_me'
const episodeNumber = myArgs[1]; // 564
const fileName = myArgs[2]; // 'my_brother_my_brother_me-564-564-0b7a2e'

processPodcastFiles(podcastSlug, episodeNumber, fileName);

async function processPodcastFiles(podcastSlug, episodeNumber, fileName) {
  let averages = await processPodcastFile(fileName, '.mp3', './assets/podcasts/');
  saveSampleDataToFile(averages, './data/sample_data/' + podcastSlug, '/' + episodeNumber + '.json');
}

async function processPodcastFile(fileName, fileExt, fileDir) {
  const tempFileDir = './assets/podcasts/data_tmp';
  const filePath = fileDir + fileName + fileExt;
  const wavFile = convertToWav(fileName, fileExt, fileDir);

  const length = await getAudioDurationInSeconds(fileDir + fileName + fileExt).then((duration) => {
    return parseInt(duration);
  });
  // length = 101;
  let averages = [];
  for (let i = 0; i < length; i += 500) {
    let localAverages = await splitAudioFile(wavFile.clone(), tempFileDir, i, length, filePath);
    averages = averages.concat(localAverages);
  }
  return averages;
}

function convertToWav(fileName, fileExt, filePathDir) {
  const filePath = filePathDir + '/' + fileName + fileExt;
  const file = ffmpeg(filePath).format('wav');
  return file;
}

function splitAudioFile(wavFile, tempFileDir, startLength, endLength, filePath) {
  if (!fs.existsSync(tempFileDir)) {
    fs.mkdirSync(tempFileDir, {recursive: true});
  }
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

function saveSampleDataToFile(data, dir, fileName) {
  // If the data directory does not exist then create it
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, {recursive: true});
  }
  fs.writeFileSync(dir + fileName, JSON.stringify(data));
}
