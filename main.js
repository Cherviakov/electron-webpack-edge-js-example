const { app, BrowserWindow } = require('electron');

const createWindow = () => {
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    }
  });
  win.loadURL('http://localhost:3000');
  win.webContents.once('dom-ready', () => {
    win.webContents.openDevTools();
  });
  win.on('close', (event) => {
    win = null;
    process.exit(0);
  });
};

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform === 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

process.on('uncaughtException', (err) => {
  console.error(err);
});

const edge = __non_webpack_require__('electron-edge-js');

const helloWorld = edge.func(` 
   #r "System.Console.dll"
   
   using System;
   using System.Threading.Tasks;
   
   public class Startup {
      public async Task<object> Invoke(dynamic input) {
        Console.WriteLine("Hello world!");
        return "done";
      }
   }
`);

helloWorld('Javascript', function (error, result) {
  if (error) {
    throw error;
  }
  console.log('helloWorld', result);
});
