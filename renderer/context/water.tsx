import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'

import CreateWaterNotification from '../use-cases/create_water_notification'
import GetWaterDetails from '../use-cases/get_water_details'
import SetWaterDetails from '../use-cases/set_water_details'

interface State {
  totalWater: number
  remainingTime: {
    minutes: number
    seconds: number
  }
}

interface Actions {
  addWater(water: number): void
  resetTimeout(): void
}

type WaterContext = State & Actions

const Context = createContext<WaterContext | null>(null)

export function useWaterContext(): WaterContext {
  const value = useContext(Context)

  if (value === null) throw new Error('WATER CONTEXT NOT PROVIDED')

  return value
}

let countdownTimeout: NodeJS.Timeout

const INITIAL_SECONDS_TO_REMIND = 10

export const WaterContextProvider: React.FC = ({ children }) => {
  const [totalWater, setTotalWater] = useState(GetWaterDetails().total_water)

  const [timeInSeconds, setTimeInSeconds] = useState(INITIAL_SECONDS_TO_REMIND)

  const addWater = useCallback(
    (water: number) => {
      const sumWater = water + totalWater

      SetWaterDetails({ total_water: sumWater })

      setTotalWater(sumWater)
    },
    [totalWater]
  )

  const notification = useMemo(() => {
    const notification = CreateWaterNotification()

    if (!notification) return

    notification.on('click', () => {
      setTimeInSeconds(INITIAL_SECONDS_TO_REMIND)
      addWater(10)
    })

    notification.on('close', () => setTimeInSeconds(INITIAL_SECONDS_TO_REMIND))

    return notification
  }, [addWater])

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

  const value = useMemo<WaterContext>(
    () => ({
      totalWater,
      addWater,
      remainingTime: {
        minutes: Math.floor(timeInSeconds / 60),
        seconds: timeInSeconds % 60
      },
      resetTimeout
    }),
    [addWater, resetTimeout, timeInSeconds, totalWater]
  )

  return <Context.Provider value={value}>{children}</Context.Provider>
}
