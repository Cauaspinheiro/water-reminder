import GetWaterAnalytics from './get_water_analytics'

export default function GetDailyAverage(additionalNumber = 0): number {
  const { history } = GetWaterAnalytics()

  let sumHistory = 0

  history.forEach(value => (sumHistory += value))

  sumHistory += additionalNumber

  return Math.round(sumHistory / history.length)
}
