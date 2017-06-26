/**
 * updater.js
 * 
 * Please use manual update only when it is really required, otherwise please use recommended non-intrusive auto update.
 * 
 * Import steps:
 * 1. create `updater.js` for the code snippet
 * 2. require `updater.js` for menu implementation, and set `checkForUpdates` callback from `updater` for the click property of `Check Updates...` MenuItem.
 */
const  dialog  = require('electron').dialog;
const  autoUpdater  = require('electron-updater').autoUpdater;

autoUpdater.autoDownload = false

autoUpdater.on('error', (event, error) => {
  dialog.showErrorBox('Error: ', error == null ? "unknown" : (error.stack || error).toString())
})

autoUpdater.on('update-available', () => {
  dialog.showMessageBox({
    type: 'info',
    title: 'Found updates',
    message: 'Found updates, do you want update now?',
    buttons: ['Sure', 'No']
  }, (buttonIndex) => {
    if (buttonIndex === 0) {
      autoUpdater.downloadUpdate()
      dialog.showMessageBox({
        title: 'Downloading',
        message: 'The update is being downloaded. Please wait.'
      })
    } 
  })
})

autoUpdater.on('update-not-available', () => {
  dialog.showMessageBox({
    title: 'No updates', 
    message: 'Current version is up-to-date.'
  })
})

autoUpdater.on('update-downloaded', () => {
  dialog.showMessageBox({
    title: 'Install updates',
    message: 'Updates downloaded, application will be quit for update...'
  }, () => {
    autoUpdater.quitAndInstall()
  })
})

autoUpdater.on('checking-for-update', () => {
  dialog.showMessageBox({
    title: 'Check for updates', 
    message: 'The app is checking for updates. Wait for a second'
  })
})

// export this to MenuItem click callback
function checkForUpdates () {
  autoUpdater.checkForUpdates()
}
module.exports.checkForUpdates = checkForUpdates