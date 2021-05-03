import GetWaterAnalytics from './get_water_analytics'

export default function GetWeeklyAverage(additionalNumber = 0): number {
  const { history: storeList } = GetWaterAnalytics()

  const history = [...storeList, additionalNumber]

  let sumHistory = 0

  const weeklyAverages: number[] = []

  history.forEach((value, index) => {
    if ((index + 1) % 7 === 0 && index !== 0) {
      return weeklyAverages.push(sumHistory)
    }

    sumHistory += value
  })

  sumHistory = 0

  weeklyAverages.forEach(value => (sumHistory += value))

  return Math.round(sumHistory / weeklyAverages.length)
}
