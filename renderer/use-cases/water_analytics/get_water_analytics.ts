import waterAnalyticsStore, {
  WaterAnalyticsSchema
} from '../../store/water-analytics-store'

export default function GetWaterAnalytics(): WaterAnalyticsSchema {
  return waterAnalyticsStore.get('water_analytics')
}
