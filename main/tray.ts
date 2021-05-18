import { app, BrowserWindow, Menu, Tray } from 'electron'
import path from 'path'

import ConfigStore from './store/config_store'

let tray: Tray
export default function HandleTray(window: BrowserWindow): void {
  const {
    general_config: { hide_tray }
  } = ConfigStore.get('config')

  if (!hide_tray) return

  window.on('close', (e: { preventDefault: () => void }) => {
    if (app.isQuitting) {
      tray?.destroy()
      return true
    }

    e.preventDefault()
    window.hide()

    tray = new Tray(path.join(__dirname, '..', 'resources', 'tray.png'))

    tray.on('click', () => {
      window.show()
      tray?.destroy()
    })

    const menu = Menu.buildFromTemplate([
      {
        label: 'Abrir',
        click() {
          window.show()
          tray?.destroy()
        }
      },
      {
        label: 'Fechar',
        click() {
          app.isQuitting = true
          app.quit()
        }
      }
    ])

    tray.setContextMenu(menu)
  })

  window.on('restore', () => {
    window.show()
    tray?.destroy()
    window.focus()
  })
}
