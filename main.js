const electron = require('electron');
const notifier = require('node-notifier');
const url = require('url');
const path = require('path');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let splashWindow;
let mainWindow;

function createSplash() {
  splashWindow = new BrowserWindow( { width: 350, height: 380, frame: false });
  splashWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'splash.html'),
    protocol: 'file:',
    slashes: true
  }));
}

function createWindow() {
  notifier.notify({
    title: 'My notification',
    message: 'Hello, there!'
  });
  // Create the browser window.
  const screenElectron = electron.screen;
  const mainScreen = screenElectron.getPrimaryDisplay();
  mainWindow = new BrowserWindow({ width: mainScreen.size.width * .8, height: mainScreen.size.height * .8, show: false });

  // and load the index.html of the app.
  mainWindow.loadURL('https://inbox.google.com');

  mainWindow.webContents.on('did-finish-load', () => {
    splashWindow.close();
    mainWindow.show();
  });

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  createSplash();
  createWindow();
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.