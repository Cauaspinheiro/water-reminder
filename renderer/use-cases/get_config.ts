import { ipcRenderer } from 'electron'

import ConfigDefaultValue from '../store/config_default_value'

export default function GetConfig(): ConfigSchema {
  if (!ipcRenderer) return ConfigDefaultValue

  return ipcRenderer.sendSync('get-config')
}
