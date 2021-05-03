import Store from 'electron-store'
import { JSONSchema, JSONSchemaType } from 'json-schema-typed'

export interface WaterAnalyticsSchema {
  total: number
  history: Array<number>
}

const storeProps: Record<keyof WaterAnalyticsSchema, JSONSchema> = {
  total: {
    type: JSONSchemaType.Number,
    default: 0
  },
  history: {
    type: JSONSchemaType.Array,
    default: []
  }
}

export default new Store<{ water_analytics: WaterAnalyticsSchema }>({
  encryptionKey: '',
  name: 'analytics',
  schema: {
    water_analytics: {
      type: JSONSchemaType.Object,
      default: {},
      properties: storeProps
    }
  }
})
