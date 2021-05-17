import waterAnalyticsStore, {
  WaterAnalyticsSchema
} from '../../store/water_analytics_store'

export default function SetWaterAnalytics(
  analytics: WaterAnalyticsSchema
): void {
  waterAnalyticsStore.set('water_analytics', analytics)
}
