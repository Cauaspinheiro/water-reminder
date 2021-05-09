import configStore, { ConfigSchema } from '../store/config-store'

export default function SetConfigUseCase(config: ConfigSchema): void {
  configStore.set('config', config)
}
