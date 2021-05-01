import { Notification, remote } from 'electron'

export interface CreateWaterNotificationProps {
  percentAchieved: number
}

export default function CreateWaterNotification(
  props: CreateWaterNotificationProps
): Notification | undefined {
  if (!remote) return undefined

  const notification = new remote.Notification({
    title: 'Hora de beber água!',
    body:
      `Você já bebeu ${props.percentAchieved}% da meta de hoje!\n\n` +
      'Clique na notificação para confirmar, e no X para pular essa hora de beber.'
  })

  return notification
}
