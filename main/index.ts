import { app } from 'electron'
import serve from 'electron-serve'

import AutoLaunchByConfig from './auto_launcher'
import isProd from './is_prod'
import RenderElectron from './render_electron'
import './ipc-main'

AutoLaunchByConfig()

if (isProd) {
  serve({ directory: 'app' })
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`)
}

RenderElectron()
