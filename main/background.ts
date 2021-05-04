import AutoLaunch from 'auto-launch'
import { app, Menu, Tray } from 'electron'
import serve from 'electron-serve'
import path from 'path'

import { createWindow } from './helpers'

const isProd: boolean = process.env.NODE_ENV === 'production'

const autoLauncher = new AutoLaunch({
  name: 'MyApp'
})
autoLauncher.isEnabled().then(function (isEnabled) {
  if (isEnabled) return

  autoLauncher.enable()
})

if (isProd) {
  serve({ directory: 'app' })
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`)
}

const renderApp = async () => {
  await app.whenReady()

  const mainWindow = createWindow('main', {
    width: 1000,
    height: 600
  })

  let tray: Tray | null = null

  mainWindow.on('close', function (event: { preventDefault: () => void }) {
    if (app.isQuitting) {
      tray?.destroy()
      return true
    }

    event.preventDefault()
    mainWindow.hide()

    tray = new Tray(path.join(__dirname, '..', 'resources', 'icon.ico'))

    tray.setContextMenu(
      Menu.buildFromTemplate([
        {
          label: 'Abrir',
          click: function () {
            mainWindow.show()
            tray?.destroy()
          }
        },
        {
          label: 'Fechar',
          click: function () {
            app.isQuitting = true
            app.quit()
          }
        }
      ])
    )
  })

  mainWindow.on('restore', function () {
    mainWindow.show()
    tray?.destroy()
  })

  if (isProd) {
    await mainWindow.loadURL('app://./home.html')
  } else {
    const port = process.argv[2]
    await mainWindow.loadURL(`http://localhost:${port}/home`)
  }
}

renderApp()

app.on('window-all-closed', () => {
  app.quit()
})
