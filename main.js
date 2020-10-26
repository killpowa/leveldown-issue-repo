const { join } = require("path");
const { app, BrowserWindow } = require("electron");
const { is } = require("electron-util");
const unhandled = require("electron-unhandled");
const debug = require("electron-debug");
const log = require("electron-log");
const level = require("level");
const nsfw = require("nsfw").default;

unhandled();
debug();

let mainWindow;

const createMainWindow = async () => {
  const win = new BrowserWindow({
    title: app.name,
    show: false,
    width: 600,
    height: 400,
  });

  win.on("ready-to-show", () => {
    win.show();
  });

  win.on("closed", () => {
    // Dereference the window
    // For multiple windows store them in an array
    mainWindow = undefined;
  });

  await win.loadFile(join(__dirname, "public/index.html"));

  return win;
};

// Prevent multiple instances of the app
if (!app.requestSingleInstanceLock()) {
  app.quit();
}

app.on("second-instance", () => {
  if (mainWindow) {
    if (mainWindow.isMinimized()) {
      mainWindow.restore();
    }

    mainWindow.show();
  }
});

app.on("window-all-closed", () => {
  if (!is.macos) {
    app.quit();
  }
});

app.on("activate", async () => {
  if (!mainWindow) {
    mainWindow = await createMainWindow();
  }
});

(async () => {
  await app.whenReady();
  mainWindow = await createMainWindow();
  const db = level("db");
  try {
    const value = await db.get("test");
    await db.put("test", Number(value) + 1);
    console.log(await db.get("test"));
    const init = await nsfw("C:\\", (e) => {
      log.log(e);
    });
    init.start();
  } catch {
    await db.put("test", 1);
  }
})();
