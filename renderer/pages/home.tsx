import { useMemo } from 'react'

import { motion, Variants } from 'framer-motion'

import AnimatedNumber from '../components/AnimatedNumber'
import HomeFooterCard from '../components/HomeFooterCard'
import LinearProgressIndicator from '../components/LinearProgressIndicator'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
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

  const variants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  }

  const footerVariants: Variants = {
    hidden: { y: 20 },
    visible: { y: 0 }
  }

  if (isServer) return <div />

  return (
    <div className="w-screen h-screen ">
      <Topbar />

      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 1 }}
        variants={variants}
        className="flex items-center justify-between h-full px-10 pt-4 pb-12 lg:px-16"
      >
        <Sidebar />

        <div className="flex flex-col items-center justify-between w-full h-full xl:ml-24">
          <motion.h1 className="mt-6 text-4xl font-semibold text-title">
            {homeTitle}
          </motion.h1>

          <div className="relative flex items-center justify-center w-full water-drop">
            <WaterDrop />

            <AnimatedNumber
              componentProps={{
                className:
                  'absolute text-6xl font-semibold text-title font-poppins top-2/3'
              }}
              initialValue={percent}
              to={percent}
              textPattern="{number}%"
            >
              {motion.h1}
            </AnimatedNumber>
          </div>

          <motion.footer
            initial="hidden"
            animate="visible"
            variants={footerVariants}
            transition={{ duration: 1.4 }}
            className="flex items-center justify-around w-full h-44 gap-x-4 lg:gap-x-16"
          >
            <HomeFooterCard title="Seu nível de água" variant="hover">
              <LinearProgressIndicator percent={percent} />

              <AnimatedNumber
                textPattern={`{number}ml / ${progress.meta}ml`}
                initialValue={progress.achieved}
                to={progress.achieved}
                componentProps={{ className: 'text-xl text-content' }}
              >
                {motion.span}
              </AnimatedNumber>
            </HomeFooterCard>

            <HomeFooterCard title="Você irá beber água em" variant="infinite">
              <span className="text-5xl md:text-6xl text-content">
                {formattedRemainingTime.minutes}:
                {formattedRemainingTime.seconds}
              </span>
            </HomeFooterCard>
          </motion.footer>
        </div>
      </motion.div>
    </div>
  )
}

export default Home
