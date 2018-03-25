const { ipcRenderer } = require('electron');

const webview = document.querySelector('webview');

webview.addEventListener('did-finish-load', () => {
  ipcRenderer.send('webview-ready');
});