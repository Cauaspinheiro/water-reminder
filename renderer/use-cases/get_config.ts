import configStore, { ConfigSchema } from '../store/config_store'

export default function GetConfig(): ConfigSchema {
  return configStore.get('config')
}
