import Store from 'electron-store'
import { JSONSchema, JSONSchemaType } from 'json-schema-typed'

export interface WaterProgressSchema {
  meta: number
  achieved: number
}

const storeProps: Record<keyof WaterProgressSchema, JSONSchema> = {
  achieved: {
    type: JSONSchemaType.Number,
    default: 0
  },
  meta: {
    type: JSONSchemaType.Number,
    default: 2000
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
