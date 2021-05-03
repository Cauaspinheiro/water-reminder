import Store from 'electron-store'
import { JSONSchemaType } from 'json-schema-typed'

export default new Store<{ water_progress: number }>({
  encryptionKey: '',
  name: 'progress',
  schema: {
    water_progress: {
      type: JSONSchemaType.Number,
      default: 0
    }
  }
})
