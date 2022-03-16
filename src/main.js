const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;
const {default: installExtension, REACT_DEVELOPER_TOOLS} =
  require('electron-devtools-installer');

let mainWindow;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}

app.on('ready', () => {
  installExtension(REACT_DEVELOPER_TOOLS)
      .then((name) => console.log(`Added Extension:  ${name}`))
      .catch((err) => console.log('An error occurred: ', err));
});

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    'width': 1400,
    'height': 628,
    'resizable': false,
    'autoHideMenuBar': true,
    'webPreferences': {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
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

// Move podcast file from temp to permancent storage
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
