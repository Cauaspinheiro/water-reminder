import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'

import CreateWaterNotification from '../use-cases/create_water_notification'
import GetWaterProgress from '../use-cases/get_water_progress'
import SetWaterProgress from '../use-cases/set_water_progress'

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

const INITIAL_SECONDS_TO_REMIND = 15

export const WaterProgressContext: React.FC = ({ children }) => {
  const [progress, setProgress] = useState(GetWaterProgress())

  const [timeInSeconds, setTimeInSeconds] = useState(INITIAL_SECONDS_TO_REMIND)

  const percent = useMemo(() => {
    return Math.round((progress.achieved / progress.meta) * 100)
  }, [progress])

  const addWater = useCallback(
    (water: number) => {
      const sumWater = water + progress.achieved

      const newProgress = { ...progress, achieved: sumWater }

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
      setTimeInSeconds(INITIAL_SECONDS_TO_REMIND)
      addWater(100)
    })

    waterNotification.on('close', () =>
      setTimeInSeconds(INITIAL_SECONDS_TO_REMIND)
    )

    return waterNotification
  }, [addWater, percent])

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

    notification.show()
  }, [notification, timeInSeconds])

  const value = useMemo<WaterProgressContext>(
    () => ({
      progress,
      addWater,
      remainingTime: {
        minutes: Math.floor(timeInSeconds / 60),
        seconds: timeInSeconds % 60
      },
      resetTimeout,
      percent
    }),
    [addWater, percent, progress, resetTimeout, timeInSeconds]
  )

  return <Context.Provider value={value}>{children}</Context.Provider>
}
