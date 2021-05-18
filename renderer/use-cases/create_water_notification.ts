import { ipcRenderer } from 'electron'

export interface CreateWaterNotificationProps {
  percentAchieved: number
  onClick(): void
  onClose(): void
}

export default function CreateWaterNotification(
  props: CreateWaterNotificationProps
): void {
  if (!ipcRenderer) return

  ipcRenderer.on('notification-closed', props.onClose)
  ipcRenderer.on('notification-clicked', props.onClick)

  ipcRenderer.send('create-notification', props.percentAchieved)
}
