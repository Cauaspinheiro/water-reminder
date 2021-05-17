import waterProgressStore from '../../store/water_progress_store'

export default function ResetWaterProgress(achieved: number): void {
  waterProgressStore.set('water_progress.actual_progress', 0)
  waterProgressStore.set('water_progress.last_progress', achieved)
}
