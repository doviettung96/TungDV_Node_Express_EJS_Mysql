require('./route');
const electron = require("electron");
const isDev = require("electron-is-dev");
// Module to control application life.
const mysql = require("mysql");

const app = electron.app;
const autoUpdater = require('electron-updater').autoUpdater;

// initialize ejs parser

// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;
const url = require("url");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

// this part is for autoupdater
const updateFeed = "https://github.com/doviettung96/TungDV_Node_Express_EJS_Mysql/releases";

autoUpdater.on('update-downloaded', () => {
    autoUpdater.quitAndInstall();
})
autoUpdater.on("error", (ev, err) => {
    console.log(err);
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready",  () => {
    createWindow();

// Access electrons autoUpdater
    autoUpdater.checkForUpdates();

});
// check auto update when app is ready

// Quit when all windows are closed.
app.on("window-all-closed", function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.


let createWindow = function () {
    // Create the browser window.
    mainWindow = new BrowserWindow({width: 800, height: 600});

    // // and load the index.html of the app.
    // mainWindow.loadURL(url.format({
    //   pathname: path.join(__dirname, 'index.ejs'),
    //   protocol: 'file:',
    //   slashes: true
    // }))
    mainWindow.loadURL("http://localhost:10000");
    mainWindow.focus();

    // Open the DevTools.
    mainWindow.webContents.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on("closed", function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });
};
