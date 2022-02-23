const {contextBridge, ipcRenderer} = require('electron');
contextBridge.exposeInMainWorld('electron', {
  uploadFile: (filePath) => {
    // ipcRenderer.send('uploadFile', filePath);
    return ipcRenderer.invoke('uploadFile', filePath).then((result) => {
      return result;
    });
  },
});

contextBridge.exposeInMainWorld('mediaControls', {
  getPodcast: (filePath) => {
    return ipcRenderer.invoke('getPodcast', filePath).then((result) => {
      return result;
    });
  },
});
