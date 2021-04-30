import { Notification, remote } from 'electron'

import GetWaterDetails from './get_water_details'

export default function CreateWaterNotification(): Notification {
  const { total_water } = GetWaterDetails()

  if (!remote) return null

  const notification = new remote.Notification({
    title: 'Hora de beber água!',
    body:
      `Você já bebeu ${total_water} litros de água\n\n` +
      'Clique na notificação para confirmar, e no X para pular essa hora de beber.'
  })

  return notification
}
