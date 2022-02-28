const {contextBridge, ipcRenderer} = require('electron');

contextBridge.exposeInMainWorld('podcastStorage', {
  uploadFileToTemp: async (filePath) => {
    return ipcRenderer.invoke('uploadFileToTemp', filePath).then((result) => {
      return result;
    });
  },
  moveToPermStorage: async (permFileName, tmpFileName) => {
    return ipcRenderer
        .invoke('moveTempPodcastToStorage', permFileName, tmpFileName)
        .then((result) => {
          return result;
        });
  },
  getPodcastInfoDataFile: async () => {
    return ipcRenderer
        .invoke('getPodcastInfoDataFile')
        .then((result) => {
          return result;
        });
  },
  updatePodcastInfoDataFile: async (newData) => {
    return ipcRenderer
        .invoke('updatePodcastInfoDataFile', JSON.stringify(newData))
        .then((result) => {
          return result;
        });
  },
});

contextBridge.exposeInMainWorld('mediaControls', {
  getPodcast: async (filePath) => {
    return ipcRenderer.invoke('getPodcast', filePath).then((result) => {
      return result;
    });
  },
});
