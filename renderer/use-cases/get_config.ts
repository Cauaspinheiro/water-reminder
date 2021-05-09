import configStore, { ConfigSchema } from '../store/config-store'

export default function GetConfig(): ConfigSchema {
  return configStore.get('config')
}
