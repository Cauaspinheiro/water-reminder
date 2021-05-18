import { ipcRenderer } from 'electron'

export default function SetConfigUseCase(config: ConfigSchema): void {
  if (!ipcRenderer) return

  ipcRenderer.send('set-config', config)
}
