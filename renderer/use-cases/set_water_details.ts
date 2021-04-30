import waterDetailsStore, {
  WaterDetailsSchema
} from '../store/water-details-store'

export default function SetWaterDetails(details: WaterDetailsSchema): void {
  waterDetailsStore.set('water_details', details)
}
