const { contextBridge, ipcRenderer } = require('electron')
const path = require('path')

contextBridge.exposeInMainWorld('electron', {
    uploadFile: (filePath) => {
        // ipcRenderer.send('uploadFile', filePath);
        return ipcRenderer.invoke('uploadFile', filePath).then((result) => {
            return result;
        });
    }
})

contextBridge.exposeInMainWorld('mediaControls', {
    getPodcast: (filePath) => {
        return ipcRenderer.invoke('getPodcast', filePath).then((result) => {
            return result;
        });
    }
})