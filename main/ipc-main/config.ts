import { ipcMain } from 'electron'

import ConfigStore from '../store/config_store'

ipcMain.on('get-config', event => {
  event.returnValue = ConfigStore.get('config')
})

ipcMain.on('set-config', (_, arg: ConfigSchema) => {
  ConfigStore.set('config', arg)
})
