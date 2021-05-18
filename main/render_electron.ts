import { app } from 'electron'

import isProd from './is_prod'
import HandleTray from './tray'
import CreateWindow from './window'

export default async function RenderElectron(): Promise<void> {
  await app.whenReady()

  const singleInstanceLock = app.requestSingleInstanceLock()

  if (!singleInstanceLock) {
    return app.quit()
  }

  app.focus()

  const mainWindow = CreateWindow()

  HandleTray(mainWindow)

  if (isProd) {
    await mainWindow.loadURL('app://./home.html')
  } else {
    const port = process.argv[2]
    await mainWindow.loadURL(`http://localhost:${port}/home`)
  }
}
