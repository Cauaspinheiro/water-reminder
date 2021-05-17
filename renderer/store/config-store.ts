import Store from 'electron-store'
import { JSONSchema, JSONSchemaType } from 'json-schema-typed'

export interface ConfigSchema {
  water_progress: {
    seconds_to_drink: number
    meta: number
    quant_water_on_drink: number
    daily_reset_time: string
  }
  general_config: {
    startup: boolean
    hide_tray: boolean
  }
}

const storeProps: Record<keyof ConfigSchema, JSONSchema> = {
  water_progress: {
    type: JSONSchemaType.Object,
    default: {},
    properties: {
      seconds_to_drink: {
        type: JSONSchemaType.Number,
        default: 15 * 60
      },
      meta: {
        type: JSONSchemaType.Number,
        default: 2000
      },
      quant_water_on_drink: {
        type: JSONSchemaType.Number,
        default: 150
      },
      daily_reset_time: {
        type: JSONSchemaType.String,
        default: '00:00'
      }
    }
  },
  general_config: {
    type: JSONSchemaType.Object,
    default: {},
    properties: {
      startup: { type: JSONSchemaType.Boolean, default: true },
      hide_tray: { type: JSONSchemaType.Boolean, default: true }
    }
  }
}

export default new Store<{ config: ConfigSchema }>({
  encryptionKey: '',
  name: 'config',
  schema: {
    config: {
      type: JSONSchemaType.Object,
      default: {},
      properties: storeProps
    }
  }
})
