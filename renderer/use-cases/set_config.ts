import configStore, { ConfigSchema } from '../store/config_store'

export default function SetConfigUseCase(config: ConfigSchema): void {
  configStore.set('config', config)
}
