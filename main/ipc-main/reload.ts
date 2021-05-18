import { app, ipcMain, BrowserWindow } from 'electron'

ipcMain.on('reload-window', () => {
  app.relaunch()
  app.exit()
})
