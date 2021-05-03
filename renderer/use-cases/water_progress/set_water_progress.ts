import waterProgressStore, {
  WaterProgressSchema
} from '../../store/water-progress-store'

export default function SetWaterProgress(
  progressData: WaterProgressSchema
): void {
  waterProgressStore.set('water_progress', progressData)
}
