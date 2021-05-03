import waterProgressStore from '../../store/water-progress-store'

export default function SetWaterProgress(progressData: number): void {
  waterProgressStore.set('water_progress', progressData)
}
