const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;

let mainWindow;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}


const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    'width': 800,
    'height': 628,
    'resizable': false,
    'autoHideMenuBar': true,
    'webPreferences': {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

// Save uploaded podcast file to temp
ipcMain.handle('uploadFileToTemp', async (event, filePath) => {
  const dir = './assets/podcasts/tmp/';
  const fileExtension = '.' + filePath.split('.').pop();

  let randomString = Math.random().toString(16).substring(2, 16);
  // Check file doesnt exist
  // if it does then change random string until it doesnt
  while (fs.existsSync(dir + randomString + fileExtension)) {
    randomString = Math.random().toString(16).substring(2, 16);
  }

  // Create a temp path with a randomised hexadecimal string
  const newPath = dir + randomString + fileExtension;

  // If the location does not exist then create it
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, {recursive: true});
  }

  const result =
    await fsPromises.copyFile(filePath, newPath, fs.constants.COPYFILE_EXCL)
        .then(function() {
          return newPath;
        })
        .catch(function(error) {
          throw error;
        });

  return result;
});

// Move podcast file from temp to permanent storage
ipcMain.handle('moveTempPodcastToStorage',
    async (event, tmpFileName, permFileName) => {
      const dir = './assets/podcasts/';
      const fileExtension = '.' + tmpFileName.split('.').pop();

      // If the location does not exist then create it
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, {recursive: true});
      }

      // Add random string to end of filename
      let randomString = '-' + Math.random().toString(16).substring(2, 8);

      // Check file doesnt exist
      // if it does then change random string until it doesnt
      while (fs.existsSync(dir + permFileName + randomString + fileExtension)) {
        randomString = '-' + Math.random().toString(16).substring(2, 8);
      }

      // Move file from temp to permanent storage
      await fsPromises.rename(
          tmpFileName,
          dir + permFileName + randomString + fileExtension,
      )
          .then(function() {
            return true;
          })
          .catch(function(error) {
            throw error;
          });

      return dir + permFileName + randomString + fileExtension;
    });

// Get podcast info data file contents
ipcMain.handle('getPodcastInfoDataFile', async (event) => {
  const dir = './data/';
  const filePath = dir + 'podcast_info.json';

  // If the data file does not exist then create it
  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(dir, {recursive: true});
    return await fsPromises.writeFile(filePath, '[]').then(function() {
      return [];
    });
  }

  // Read the file and return it as JSON
  const result = await fsPromises.readFile(filePath, {
    encoding: 'utf8',
  })
      .then(function(result) {
        return JSON.parse(result);
      })
      .catch(function(error) {
        return false;
      });

  return result;
});


// Update podcast info data file
ipcMain.handle('updatePodcastInfoDataFile', async (event, newData) => {
  const filePath = './data/podcast_info.json';
  // Write the new data to the file
  const result = await fsPromises.writeFile(filePath, newData, {
    encoding: 'utf8',
  })
      .then(function(result) {
        return result;
      })
      .catch(function(error) {
        throw error;
      });

  return result;
});

ipcMain.handle('getPodcast', async (event, filePath) => {
  const result = await fsPromises.readFile(filePath, {
    encoding: 'base64',
  })
      .then(function(result) {
        return result;
      })
      .catch(function(error) {
        throw error;
      });

  return result;
});

ipcMain.handle('getLabelledEpisodes', async (event, podcastSlug) => {
  const result = getLabelledEpisodes(podcastSlug);

  return result;
});

ipcMain.handle('getSampleData', async (event, podcastSlug, episodeNumber) => {
  const result = getSampleData(podcastSlug, episodeNumber);

  return result;
});

/**
   * Get the sample data for the given podcast episode
   * @param {string} podcastSlug
   * @param {number} episodeNumber
   * @return {array}
   */
function getSampleData(podcastSlug, episodeNumber) {
  const storedEpisodeSampleData =
      JSON.parse(
          fs.readFileSync(
              './data/sample_data/' +
            podcastSlug +
            '/' +
            episodeNumber +
            '.json',
          ),
      );
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

/**
   * Get all the labelled episodes for a given podcast
   * @param {string} podcastSlug
   * @return {array}
   */
function getLabelledEpisodes(podcastSlug) {
  // Get all podcasts data
  const result = JSON.parse(fs.readFileSync('./data/podcast_info.json'));

  // Get the data of a specific podcast
  const episodes =
      result.find((podcast) => podcast.slug === podcastSlug).episodes;

  // Extract the needed data for each episode
  const labelledEpisodes = [];
  episodes.forEach((episode) => {
    // Get the labelled sections
    const sections = [];
    episode.sections.forEach((section) => {
      startSection = section.start.split(':');
      endSection = section.end.split(':');
      startSeconds =
          parseInt(startSection[startSection.length - 3] ?? 0) * 60 * 60 +
          parseInt(startSection[startSection.length - 2]) * 60 +
          parseInt(startSection[startSection.length - 1]);

      endSeconds =
          parseInt(endSection[startSection.length - 3] ?? 0) * 60 * 60 +
          parseInt(endSection[endSection.length - 2]) * 60 +
          parseInt(endSection[endSection.length - 1]);

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
