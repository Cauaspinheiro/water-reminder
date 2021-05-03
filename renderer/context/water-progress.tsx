import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'

import { ConfigSchema } from '../store/config-store'
import waterProgressStore from '../store/water-progress-store'
import CreateWaterNotification from '../use-cases/create_water_notification'
import GetWaterProgress from '../use-cases/water_progress/get_water_progress'
import GetWaterProgressConfig from '../use-cases/water_progress/get_water_progress_config'
import ResetWaterProgress from '../use-cases/water_progress/reset_water_progress'
import SetWaterProgress from '../use-cases/water_progress/set_water_progress'
import getTwoDigitsNumber from '../utils/getTwoDigitsNumber'

interface State {
  progress: {
    meta: number
    achieved: number
    lastProgress: number
  }
  remainingTime: {
    minutes: number
    seconds: number
  }
  percent: number
  config: ConfigSchema['water_progress']
  resetDay: boolean
}

interface Actions {
  addWater(water: number): void
  resetTimeout(): void
}

type WaterProgressContext = State & Actions

const Context = createContext<WaterProgressContext | null>(null)

export function useWaterProgressContext(): WaterProgressContext {
  const value = useContext(Context)

  if (value === null) throw new Error('WATER PROGRESS CONTEXT NOT PROVIDED')

  return value
}

let waterCountdown: NodeJS.Timeout

export const WaterProgressContext: React.FC = ({ children }) => {
  const config = useMemo(GetWaterProgressConfig, [])

  const [progress, setProgress] = useState(GetWaterProgress())
  const [timeInSeconds, setTimeInSeconds] = useState(config.seconds_to_drink)
  const [resetDay, setResetDay] = useState(false)
  const [checkResetTimer, setCheckResetTimer] = useState(false)

  const percent = useMemo<number>(() => {
    return Math.round((progress.actual_progress / config.meta) * 100)
  }, [config.meta, progress])

  const addWater = useCallback(
    (water: number) => {
      const sumWater = water + progress.actual_progress

      const newProgress = { ...progress, actual_progress: sumWater }

      SetWaterProgress(newProgress)

      setProgress(newProgress)
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
    ResetWaterProgress(progress.actual_progress)

    clearTimeout(waterCountdown)
    setTimeInSeconds(config.seconds_to_drink)

    setProgress(p => ({
      ...p,
      last_progress: p.actual_progress,
      actual_progress: 0
    }))
  }, [config.seconds_to_drink, progress.actual_progress])

  useEffect(() => {
    if (timeInSeconds > 0) {
      waterCountdown = setTimeout(() => {
        setTimeInSeconds(timeInSeconds - 1)
      }, 1000)

      return
    }

    notification?.show()
  }, [notification, timeInSeconds])

  const handleReset = useCallback(() => {
    const hours = getTwoDigitsNumber(new Date().getUTCHours() - 3)
    const minutes = getTwoDigitsNumber(new Date().getUTCMinutes())

    const resetHours = config.daily_reset_time.substring(0, 2)
    const resetMinutes = config.daily_reset_time.substring(3)

    const resetTime = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate(),
      Number(resetHours),
      Number(resetMinutes)
    ).getTime()

    const reset = () => {
      resetTimeout()
      setResetDay(!resetDay)

      setProgress(p => ({ ...p, last_reset: resetTime }))
      waterProgressStore.set('water_progress.last_reset', resetTime)
    }

    console.log(`resetTime: ${resetTime - 86400000} >= ${progress.last_reset}`)

    if (
      progress.last_reset &&
      resetTime - 1000 * 60 * 60 * 60 * 24 >= progress.last_reset
    ) {
      reset()
    }

    if (hours === resetHours && minutes === resetMinutes) {
      reset()
    }

    setCheckResetTimer(!checkResetTimer)
  }, [
    checkResetTimer,
    config.daily_reset_time,
    progress.last_reset,
    resetDay,
    resetTimeout
  ])

  useEffect(() => {
    handleReset()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const timeout = setTimeout(() => {
      handleReset()
    }, 1000 * 60)

    return () => clearTimeout(timeout)
  }, [handleReset])

  const value = useMemo<WaterProgressContext>(
    () => ({
      progress: {
        achieved: progress.actual_progress,
        meta: config.meta,
        lastProgress: progress.last_progress
      },
      addWater,
      remainingTime: {
        minutes: Math.floor(timeInSeconds / 60),
        seconds: timeInSeconds % 60
      },
      resetTimeout,
      percent,
      config,
      resetDay
    }),
    [addWater, config, percent, progress, resetDay, resetTimeout, timeInSeconds]
  )

  return <Context.Provider value={value}>{children}</Context.Provider>
}
