import waterAnalyticsStore, {
  WaterAnalyticsSchema
} from '../../store/water-analytics-store'

export default function SetWaterAnalytics(
  analytics: WaterAnalyticsSchema
): void {
  waterAnalyticsStore.set('water_analytics', analytics)
}
