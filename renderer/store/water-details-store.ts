import Store from 'electron-store'
import { JSONSchema, JSONSchemaType } from 'json-schema-typed'

export interface WaterDetailsSchema {
  total_water: number
}

const storeProps: Record<keyof WaterDetailsSchema, boolean | JSONSchema> = {
  total_water: {
    type: JSONSchemaType.Number,
    default: 0
  }
}

export default new Store<{ water_details: WaterDetailsSchema }>({
  encryptionKey: '',
  name: 'data',
  schema: {
    water_details: {
      type: JSONSchemaType.Object,
      default: {},
      properties: storeProps
    }
  }
})
