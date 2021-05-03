import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'

import useIsServer from '../hooks/useIsServer'
import GetDailyAverage from '../use-cases/water_analytics/get_daily_average'
import GetWaterAnalytics from '../use-cases/water_analytics/get_water_analytics'
import SetWaterAnalytics from '../use-cases/water_analytics/set_water_analytics'
import { useWaterProgressContext } from './water-progress'

interface State {
  total: number
  dailyAverage: number
  weeklyAverage: number
}

type WaterAnalyticsContext = State

const Context = createContext<WaterAnalyticsContext | null>(null)

export function useWaterAnalyticsContext(): WaterAnalyticsContext {
  const value = useContext(Context)

  if (value === null) throw new Error('WATER ANALYTICS CONTEXT NOT PROVIDED')

  return value
}

export const WaterAnalyticsContextProvider: React.FC = ({ children }) => {
  const {
    progress: { achieved: waterAchieved, lastProgress },
    config: { quant_water_on_drink },
    resetDay
  } = useWaterProgressContext()

  const [waterAnalytics, setWaterAnalytics] = useState(GetWaterAnalytics())

  const isFirstRender = useIsServer()

  const [dailyAverage, setDailyAverage] = useState(GetDailyAverage())
  const [weeklyAverage] = useState(0)

  useEffect(() => {
    if (isFirstRender) return

    const newAnalytics = {
      ...waterAnalytics,
      total: waterAnalytics.total + quant_water_on_drink
    }

    setWaterAnalytics(newAnalytics)

    SetWaterAnalytics(newAnalytics)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quant_water_on_drink, waterAchieved])

  useEffect(() => {
    if (isFirstRender) return

    setDailyAverage(GetDailyAverage(lastProgress))
    const newAnalytics = {
      ...waterAnalytics,
      history: [...waterAnalytics.history, lastProgress]
    }

    setWaterAnalytics(newAnalytics)

    SetWaterAnalytics(newAnalytics)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastProgress, resetDay])

  const value = useMemo<WaterAnalyticsContext>(
    () => ({ total: waterAnalytics.total, dailyAverage, weeklyAverage }),
    [dailyAverage, waterAnalytics.total, weeklyAverage]
  )

  return <Context.Provider value={value}>{children}</Context.Provider>
}
