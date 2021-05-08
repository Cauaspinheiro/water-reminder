import React from 'react'

import { motion, Variants } from 'framer-motion'

interface ConfigButtonProps {
  className?: string
}

const ConfigButton: React.FC<ConfigButtonProps> = props => {
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
    <motion.div
      initial="hidden"
      animate="visible"
      whileHover="onHover"
      transition={{ duration: 1 }}
      variants={analyticsVariants}
      className={`${props.className} flex items-center  gap-x-4 w-full px-5 border-2 cursor-pointer py-9 rounded-3xl bg-container`}
    >
      <img src="/images/config.svg" />

      <h3 className="text-2xl text-title">Configurações</h3>
    </motion.div>
  )
}

export default ConfigButton
