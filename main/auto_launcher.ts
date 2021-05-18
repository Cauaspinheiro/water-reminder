import AutoLaunch from 'auto-launch'

import isProd from './is_prod'
import ConfigStore from './store/config_store'

export default async function AutoLaunchByConfig(): Promise<void> {
  if (!isProd) return

  const {
    general_config: { startup }
  } = ConfigStore.get('config')

  const autoLauncher = new AutoLaunch({
    name: 'Water Reminder'
  })

  const isEnabled = await autoLauncher.isEnabled()

  if (startup) {
    if (isEnabled) return

    return autoLauncher.enable()
  }

  if (isEnabled) return autoLauncher.disable()
}
