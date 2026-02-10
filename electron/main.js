const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

// The built directory structure
//
// ├─┬ dist-electron
// │ ├── main.js
// │ └── preload.js
// ├─┬ dist
// │ ├── index.html
// │ └── about.html
// ├── electron/
// └── ...

process.env.DIST = path.join(__dirname, "../dist");
process.env.VITE_PUBLIC = app.isPackaged
  ? process.env.DIST
  : path.join(process.env.DIST, "../public");

let mainWindow;
let aboutWindow;

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 700,
    icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  // Dev server or production file
  if (process.env.VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(process.env.DIST, "index.html"));
  }
  mainWindow.webContents.openDevTools();

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

function createAboutWindow() {
  if (aboutWindow) {
    aboutWindow.focus();
    return;
  }

  aboutWindow = new BrowserWindow({
    width: 600,
    height: 500,
    parent: mainWindow,
    modal: false,
    icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  if (process.env.VITE_DEV_SERVER_URL) {
    aboutWindow.loadURL(`${process.env.VITE_DEV_SERVER_URL}about.html`);
  } else {
    aboutWindow.loadFile(path.join(process.env.DIST, "about.html"));
  }

  aboutWindow.on("closed", () => {
    aboutWindow = null;
  });
}

// IPC handler: open about window
ipcMain.on("open-about", () => {
  createAboutWindow();
});

app.on("ready", createMainWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (mainWindow === null) createMainWindow();
});
