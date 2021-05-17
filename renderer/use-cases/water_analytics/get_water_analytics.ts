import waterAnalyticsStore, {
  WaterAnalyticsSchema
} from '../../store/water_analytics_store'

export default function GetWaterAnalytics(): WaterAnalyticsSchema {
  return waterAnalyticsStore.get('water_analytics')
}
