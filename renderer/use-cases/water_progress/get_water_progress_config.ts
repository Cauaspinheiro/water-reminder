import configStore, { ConfigSchema } from '../../store/config-store'

export default function GetWaterProgressConfig(): ConfigSchema['water_progress'] {
  return configStore.get('config.water_progress')
}
