import configStore, { ConfigSchema } from '../../store/config_store'

export default function SetWaterProgressConfig(
  waterProgressConfigData: ConfigSchema['water_progress']
): void {
  configStore.set('config.water_progress', waterProgressConfigData)
}
