import waterProgressStore, {
  WaterProgressSchema
} from '../../store/water_progress_store'

export default function SetWaterProgress(
  progressData: WaterProgressSchema
): void {
  waterProgressStore.set('water_progress', progressData)
}
