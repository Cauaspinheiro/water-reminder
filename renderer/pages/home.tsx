import { motion, Variants } from 'framer-motion'

import AnimatedNumber from '../components/AnimatedNumber'
import Config from '../components/Config'
import ConfigButton from '../components/ConfigButton'
import HomeFooterCard from '../components/HomeFooterCard'
import LinearProgressIndicator from '../components/LinearProgressIndicator'
import Sidebar from '../components/Sidebar'
import WaterDrop from '../components/WaterDrop'
import { useAppContext } from '../context/app'
import { useWaterProgressContext } from '../context/WaterProgress'
import useHomeTitle from '../hooks/useHomeTitle'
import useIsServer from '../hooks/useIsServer'
import styles from '../styles/pages/home.module.css'

const Home: React.FC = () => {
  const {
    progress,
    percent,
    remainingTime: { minutes, seconds }
  } = useWaterProgressContext()
  const { toggleDrawer } = useAppContext()

  const isServer = useIsServer()

  const homeTitle = useHomeTitle()

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
    <motion.div
      initial="hidden"
      animate="visible"
      transition={{ duration: 1 }}
      variants={variants}
      className="flex items-center justify-between flex-1 h-screen py-6 pr-10 lg:pr-16"
    >
      <Sidebar />

      <div
        className={`${styles.content_container} pl-10 xl:pl-0 flex flex-col items-center justify-between w-full h-full xl:ml-24 content-container`}
      >
        <motion.h1
          className={`${styles.title} mt-6 text-4xl font-semibold text-title`}
        >
          {homeTitle}
        </motion.h1>

        <div className="relative items-center justify-center hidden xl:flex">
          <WaterDrop />

          <AnimatedNumber
            componentProps={{
              className:
                'absolute text-6xl font-semibold text-title font-poppins top-2/3 pt-4'
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
          className="flex flex-col-reverse items-center justify-around w-full h-full py-8 xl:flex-row xl:py-0 gap-y-12 xl:h-44 gap-x-4 lg:gap-x-16"
        >
          <ConfigButton
            setIsActive={toggleDrawer}
            className="justify-center block h-full p-6 xl:hidden md:p-8 config-button"
          />

          <HomeFooterCard title="Seu nível de água" variant="hover">
            <LinearProgressIndicator percent={percent} />

            <AnimatedNumber
              textPattern={`{number}ml / ${progress.meta}ml`}
              initialValue={progress.achieved}
              to={progress.achieved}
              componentProps={{
                className: 'text-xl text-content'
              }}
            >
              {motion.span}
            </AnimatedNumber>
          </HomeFooterCard>

          <HomeFooterCard title="Você irá beber água em" variant="infinite">
            <span className="text-6xl text-content">
              {minutes}:{seconds}
            </span>
          </HomeFooterCard>
        </motion.footer>
      </div>

      <Config />
    </motion.div>
  )
}

export default Home
