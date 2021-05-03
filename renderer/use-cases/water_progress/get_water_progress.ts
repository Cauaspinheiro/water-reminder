import waterProgressStore, {
  WaterProgressSchema
} from '../../store/water-progress-store'

export default function GetWaterProgress(): WaterProgressSchema {
  return waterProgressStore.get('water_progress')
}
