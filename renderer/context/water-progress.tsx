import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'

import CreateWaterNotification from '../use-cases/create_water_notification'
import GetWaterProgress from '../use-cases/water_progress/get_water_progress'
import GetWaterProgressConfig from '../use-cases/water_progress/get_water_progress_config'
import SetWaterProgress from '../use-cases/water_progress/set_water_progress'

interface State {
  progress: {
    meta: number
    achieved: number
  }
  remainingTime: {
    minutes: number
    seconds: number
  }
  percent: number
}

interface Actions {
  addWater(water: number): void
  resetTimeout(): void
}

type WaterProgressContext = State & Actions

const Context = createContext<WaterProgressContext | null>(null)

export function useWaterProgressContext(): WaterProgressContext {
  const value = useContext(Context)

  if (value === null) throw new Error('WATER CONTEXT NOT PROVIDED')

  return value
}

let countdownTimeout: NodeJS.Timeout

export const WaterProgressContext: React.FC = ({ children }) => {
  const config = useMemo(GetWaterProgressConfig, [])

  const [progress, setProgress] = useState(GetWaterProgress())
  const [timeInSeconds, setTimeInSeconds] = useState(config.seconds_to_drink)

  const percent = useMemo<number>(() => {
    return Math.round((progress / config.meta) * 100)
  }, [config.meta, progress])

  const addWater = useCallback(
    (water: number) => {
      const sumWater = water + progress

      SetWaterProgress(sumWater)

      setProgress(sumWater)
    },
    [progress]
  )

  const notification = useMemo(() => {
    const waterNotification = CreateWaterNotification({
      percentAchieved: percent
    })

    if (!waterNotification) return undefined

    waterNotification.on('click', () => {
      setTimeInSeconds(config.seconds_to_drink)
      addWater(config.quant_water_on_drink)
    })

    waterNotification.on('close', () =>
      setTimeInSeconds(config.seconds_to_drink)
    )

    return waterNotification
  }, [addWater, config.quant_water_on_drink, config.seconds_to_drink, percent])

  const resetTimeout = useCallback(() => {
    clearTimeout(countdownTimeout)
    setTimeInSeconds(0)
  }, [])

  useEffect(() => {
    if (timeInSeconds > 0) {
      countdownTimeout = setTimeout(() => {
        setTimeInSeconds(timeInSeconds - 1)
      }, 1000)

      return
    }

    notification?.show()
  }, [notification, timeInSeconds])

  const value = useMemo<WaterProgressContext>(
    () => ({
      progress: {
        achieved: progress,
        meta: config.meta
      },
      addWater,
      remainingTime: {
        minutes: Math.floor(timeInSeconds / 60),
        seconds: timeInSeconds % 60
      },
      resetTimeout,
      percent
    }),
    [addWater, config.meta, percent, progress, resetTimeout, timeInSeconds]
  )

  return <Context.Provider value={value}>{children}</Context.Provider>
}
