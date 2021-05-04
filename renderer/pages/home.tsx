import { useMemo } from 'react'

import HomeFooterCard from '../components/HomeFooterCard'
import LinearProgressIndicator from '../components/LinearProgressIndicator'
import Sidebar from '../components/Sidebar'
import WaterDrop from '../components/WaterDrop'
import { useWaterProgressContext } from '../context/water-progress'
import useHomeTitle from '../hooks/useHomeTitle'
import useIsServer from '../hooks/useIsServer'
import getTwoDigitsNumber from '../utils/getTwoDigitsNumber'

const Home: React.FC = () => {
  const { progress, percent, remainingTime } = useWaterProgressContext()

  const isServer = useIsServer()

  const homeTitle = useHomeTitle()

  const formattedRemainingTime = useMemo(() => {
    return {
      minutes: getTwoDigitsNumber(remainingTime.minutes),
      seconds: getTwoDigitsNumber(remainingTime.seconds)
    }
  }, [remainingTime])

  if (isServer) return <div />

  return (
    <div className="flex items-center justify-between flex-1 w-screen h-screen px-16 py-9 ">
      <Sidebar />

      <div className="flex flex-col items-center justify-between w-full h-full">
        <h1 className="mt-6 text-4xl font-semibold text-title">{homeTitle}</h1>

        <div className="relative flex items-center justify-center h-full ">
          <WaterDrop />

          <h1 className="absolute text-6xl font-semibold text-title bottom-28 font-poppins">
            {percent}%
          </h1>
        </div>

        <footer className="flex items-center justify-around w-full h-44 gap-x-16">
          <HomeFooterCard title="Seu nível de água">
            <LinearProgressIndicator percent={percent} />

            <span className="text-xl text-content">
              {progress.achieved}ml / {progress.meta}ml
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
