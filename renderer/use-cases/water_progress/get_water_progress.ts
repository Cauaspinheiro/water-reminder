import waterProgressStore, {
  WaterProgressSchema
} from '../../store/water_progress_store'

export default function GetWaterProgress(): WaterProgressSchema {
  return waterProgressStore.get('water_progress')
}
