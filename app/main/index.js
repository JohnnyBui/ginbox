const electron = require('electron');
const notifier = require('node-notifier');
const url = require('url');
const path = require('path');

const { app, BrowserWindow, ipcMain } = require('electron');

let splashWindow;
let mainWindow;

function createSplash() {
  splashWindow = new BrowserWindow({ width: 350, height: 380, frame: false });
  splashWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'splash.html'),
    protocol: 'file:',
    slashes: true
  }));
}

function createWindow() {
  const screenElectron = electron.screen;
  const mainScreen = screenElectron.getPrimaryDisplay();
  mainWindow = new BrowserWindow({ width: mainScreen.size.width * .8, height: mainScreen.size.height * .8, show: false });

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  mainWindow.once('ready-to-show', () => {
    splashWindow.close();
    mainWindow.show();
  });

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

app.on('ready', () => {
  createSplash();
  createWindow();
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on('new-unread-count', (event, arg) => {
  notifier.notify({
    title: `New Unread Message${arg > 1 ? 's' : ''}`,
    message: `You have ${arg} new unread message${arg > 1 ? 's' : ''}!`
  });
});