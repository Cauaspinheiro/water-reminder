import { FC } from 'react'

import { motion, Variants } from 'framer-motion'

import { useWaterAnalyticsContext } from '../context/water-analytics'
import AnimatedNumber from './AnimatedNumber'

const Sidebar: FC = () => {
  const { total, weeklyAverage, dailyAverage } = useWaterAnalyticsContext()

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
      className="flex flex-col justify-between h-full my-16 mr-32 "
    >
      <img src="/images/sidebar-logo.png" width="160" height="102" />

      <motion.div
        initial="hidden"
        animate="visible"
        whileHover="onHover"
        transition={{ duration: 1 }}
        variants={analyticsVariants}
        className="flex flex-col px-8 border-2 py-14 w-72 bg-container rounded-3xl gap-y-10"
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
            textPattern="{number}ml"
            componentProps={{ className: 'text-2xl text-content' }}
          >
            {motion.span}
          </AnimatedNumber>
        </div>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        whileHover="onHover"
        transition={{ duration: 1 }}
        variants={analyticsVariants}
        className="flex items-center justify-around w-full px-5 border-2 cursor-pointer py-9 rounded-3xl bg-container"
      >
        <img src="/images/config.svg" />

        <h3 className="text-2xl text-title">Configurações</h3>
      </motion.div>
    </motion.aside>
  )
}

export default Sidebar
