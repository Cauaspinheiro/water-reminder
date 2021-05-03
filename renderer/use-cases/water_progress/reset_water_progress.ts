import SetWaterProgress from './set_water_progress'

export default function ResetWaterProgress(achieved: number): void {
  SetWaterProgress({
    actual_progress: 0,
    last_progress: achieved
  })
}
