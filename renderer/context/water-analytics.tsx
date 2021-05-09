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
import GetWeeklyAverage from '../use-cases/water_analytics/get_weekly_average'
import SetWaterAnalytics from '../use-cases/water_analytics/set_water_analytics'
import { toLiter } from '../utils/water_transform'
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
    config: { quant_water_on_drink }
  } = useWaterProgressContext()

  const [waterAnalytics, setWaterAnalytics] = useState(GetWaterAnalytics())

  const isFirstRender = useIsServer()

  const [dailyAverage, setDailyAverage] = useState(GetDailyAverage())
  const [weeklyAverage, setWeeklyAverage] = useState(GetWeeklyAverage())

  useEffect(() => {
    if (isFirstRender) return

    const newAnalytics = {
      ...waterAnalytics,
      total: waterAnalytics.total + toLiter(quant_water_on_drink)
    }

    setWaterAnalytics(newAnalytics)

    SetWaterAnalytics(newAnalytics)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quant_water_on_drink, waterAchieved])

  useEffect(() => {
    if (isFirstRender) return

    setDailyAverage(GetDailyAverage(lastProgress))
    setWeeklyAverage(GetWeeklyAverage(lastProgress))

    const newAnalytics = {
      ...waterAnalytics,
      history: [...waterAnalytics.history, lastProgress]
    }

    setWaterAnalytics(newAnalytics)

    SetWaterAnalytics(newAnalytics)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastProgress])

  const value = useMemo<WaterAnalyticsContext>(
    () => ({ total: waterAnalytics.total, dailyAverage, weeklyAverage }),
    [dailyAverage, waterAnalytics.total, weeklyAverage]
  )

  return <Context.Provider value={value}>{children}</Context.Provider>
}
