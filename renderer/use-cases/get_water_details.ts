import waterDetailsStore, {
  WaterDetailsSchema
} from '../store/water-details-store'

export default function GetWaterDetails(): WaterDetailsSchema {
  return waterDetailsStore.get('water_details')
}
