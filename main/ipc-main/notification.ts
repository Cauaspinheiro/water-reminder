import { ipcMain, Notification } from 'electron'

ipcMain.on('create-notification', (e, percent) => {
  const notification = new Notification({
    title: 'Hora de beber água!',
    body:
      `Você já bebeu ${percent}% da meta de hoje!\n\n` +
      'Clique na notificação para confirmar, e no X para pular essa hora de beber.'
  })

  notification.show()

  notification.on('click', () => {
    e.reply('notification-clicked')
  })

  notification.on('close', () => {
    e.reply('notification-closed')
  })
})
