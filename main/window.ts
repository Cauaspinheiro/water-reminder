import { BrowserWindow, BrowserWindowConstructorOptions } from 'electron'
import path from 'path'

export default function CreateWindow(): BrowserWindow {
  const browserOptions: BrowserWindowConstructorOptions = {
    minWidth: 768,
    minHeight: 768,
    backgroundColor: '#202833',
    width: 0,
    height: 0,
    icon: path.join(__dirname, '..', 'resources', 'icon.png'),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  }
  const win = new BrowserWindow(browserOptions)

  win.setMenuBarVisibility(false)
  win.maximize()

  return win
}
