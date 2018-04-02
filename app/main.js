const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

//const scratch2ex = require('./scratch2-ex')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({width: 800, height: 600})

  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  win.webContents.openDevTools()

  //scratch2ex.startServer()
  startServer()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

var express = require('express');
var exapp = express();

function startServer () {
    var server = exapp.listen(12345, function(){
        console.log("Server start... listening port " + server.address().port);
    });
}

var volume = 0;

exapp.get('/poll', (req, res) => {
    res.send("volume " + volume);
});

exapp.get('/playBeep', (req, res) => {
    console.log("play beep!");
    process.stderr.write("\x07"); // to prevent new line (instead of console.log)
    res.send("OK");
});

exapp.get('/setVolume/:volume', (req, res) => {
    var tmp_volume = req.params.volume;
    if(tmp_volume >= 0 && tmp_volume <= 10){
        volume = tmp_volume;
        console.log("set volume= " + volume);
    }else{
        console.log("out of range: " + tmp_volume);
    }
    res.send("OK");
});

