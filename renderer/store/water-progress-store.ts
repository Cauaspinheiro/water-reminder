import Store from 'electron-store'
import { JSONSchema, JSONSchemaType } from 'json-schema-typed'

export interface WaterProgressSchema {
  actual_progress: number
  last_progress: number
}

const storeProps: Record<keyof WaterProgressSchema, JSONSchema> = {
  actual_progress: {
    type: JSONSchemaType.Number,
    default: 0
  },
  last_progress: {
    type: JSONSchemaType.Number,
    default: 0
  }
}

export default new Store<{ water_progress: WaterProgressSchema }>({
  encryptionKey: '',
  name: 'progress',
  schema: {
    water_progress: {
      type: JSONSchemaType.Object,
      default: {},
      properties: storeProps
    }
  }
})
