import { FC } from 'react'

import { motion, Variants } from 'framer-motion'

import { useAppContext } from '../context/app'
import { useWaterAnalyticsContext } from '../context/water-analytics'
import styles from '../styles/components/sidebar.module.css'
import AnimatedNumber from './AnimatedNumber'
import ConfigButton from './ConfigButton'

const Sidebar: FC = () => {
  const { total, weeklyAverage, dailyAverage } = useWaterAnalyticsContext()

  const { toggleDrawer } = useAppContext()

  const variants: Variants = {
    hidden: { x: -20 },
    visible: { x: 0 }
  }

  const analyticsVariants: Variants = {
    hidden: {
      borderColor: '#2D3948'
    },
    visible: {
      borderColor: '#2D3948'
    },
    onHover: {
      borderColor: '#0094FF'
    }
  }

  return (
    <motion.aside
      initial="hidden"
      animate="visible"
      transition={{ duration: 1.4 }}
      variants={variants}
      className={`${styles.sidebar} flex-col justify-between hidden h-full my-16 mx-10 xl:flex min-w-max`}
    >
      <img src="/images/sidebar-logo.png" width="160" height="102" />

      <motion.div
        initial="hidden"
        animate="visible"
        whileHover="onHover"
        transition={{ duration: 1 }}
        variants={analyticsVariants}
        className={`${styles.analytics} flex flex-col w-full px-8 border-2 py-14 bg-container rounded-3xl gap-y-10`}
      >
        <h3 className="text-4xl text-title">Sua média</h3>

        <div className="flex flex-col gap-4">
          <div>
            <h4 className="text-2xl text-title">Diária</h4>

            <AnimatedNumber
              initialValue={dailyAverage}
              to={dailyAverage}
              textPattern="{number}ml"
              componentProps={{ className: 'text-lg text-content' }}
            >
              {motion.span}
            </AnimatedNumber>
          </div>

          <div>
            <h4 className="text-2xl text-title">Semanal</h4>

            <AnimatedNumber
              initialValue={weeklyAverage}
              to={weeklyAverage}
              textPattern="{number}ml"
              componentProps={{ className: 'text-lg text-content' }}
            >
              {motion.span}
            </AnimatedNumber>
          </div>
        </div>

        <div>
          <h3 className="mb-1 text-4xl text-title">Seu Total</h3>

          <AnimatedNumber
            initialValue={total}
            to={total}
            fixedNumbers={2}
            textPattern="{number} litros"
            componentProps={{ className: 'text-2xl text-content' }}
          >
            {motion.span}
          </AnimatedNumber>
        </div>
      </motion.div>

      <ConfigButton className="justify-around" setIsActive={toggleDrawer} />
    </motion.aside>
  )
}

export default Sidebar
