import { useMemo } from 'react'

import HomeFooterCard from '../components/HomeFooterCard'
import LinearProgressIndicator from '../components/LinearProgressIndicator'
import Sidebar from '../components/Sidebar'
import { useWaterContext } from '../context/water'

const Home: React.FC = () => {
  const { totalWater, remainingTime } = useWaterContext()

  const formattedRemainingTime = useMemo(() => {
    const minutes =
      remainingTime.minutes >= 10
        ? String(remainingTime.minutes)
        : `0${remainingTime.minutes}`

    const seconds =
      remainingTime.seconds >= 10
        ? String(remainingTime.seconds)
        : `0${remainingTime.seconds}`

    return { minutes, seconds }
  }, [remainingTime])

  return (
    <div className="flex items-center justify-between flex-1 w-screen h-screen px-20 py-9 ">
      <Sidebar />

      <div className="flex flex-col items-center justify-between w-full h-full">
        <h1 className="mt-6 text-5xl font-semibold text-title">
          Você está indo bem!
        </h1>

        <div></div>

        <footer className="flex items-center justify-around w-full h-44 gap-x-16">
          <HomeFooterCard title="Seu nível de água">
            <LinearProgressIndicator percent={80} />
            <span className="text-xl text-content">
              {totalWater}ml / 2000ml
            </span>
          </HomeFooterCard>

          <HomeFooterCard title="Você irá beber água em">
            <span className="text-6xl text-content">
              {formattedRemainingTime.minutes}:{formattedRemainingTime.seconds}
            </span>
          </HomeFooterCard>
        </footer>
      </div>
    </div>
  )
}

export default Home
