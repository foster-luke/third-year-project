// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
})
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('model', {
    train: () => ipcRenderer.invoke('train-model'),
})
