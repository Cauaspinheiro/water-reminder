import waterProgressStore from '../../store/water-progress-store'

export default function ResetWaterProgress(achieved: number): void {
  waterProgressStore.set('water_progress.actual_progress', 0)
  waterProgressStore.set('water_progress.last_progress', achieved)
}
