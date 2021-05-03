import waterProgressStore from '../../store/water-progress-store'

export default function GetWaterProgress(): number {
  return waterProgressStore.get('water_progress')
}
