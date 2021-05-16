import { FC, useState } from 'react'

import { remote } from 'electron'
import { motion, Variants } from 'framer-motion'

import { useAppContext } from '../context/app'
import { ConfigSchema } from '../store/config-store'
import GetConfig from '../use-cases/get_config'
import SetConfigUseCase from '../use-cases/set_config'
import ConfigForm from './ConfigForm'

const Config: FC = () => {
  const { isConfigActive, toggleDrawer } = useAppContext()

  const [config, setConfig] = useState(GetConfig())

  const [isConfigChanged, setIsConfigChanged] = useState(false)

  const handleSubmit = async (data: ConfigSchema) => {
    console.log(data)
  }

  const handleReset = () => {
    setConfig(GetConfig())
    setIsConfigChanged(false)
    toggleDrawer()
  }

  const handleExit = () => {
    if (isConfigChanged) {
      const isConfirmed = confirm('Deseja sair? Você tem alterações não salvas')

      if (!isConfirmed) return

      setConfig(GetConfig())
      setIsConfigChanged(false)
    }

    return toggleDrawer()
  }

  const handleResetToDefault = () => {
    const isConfirmed = confirm(
      'Deseja deixar as configurações para as padrões do aplicativo?'
    )

    if (!isConfirmed) return

    SetConfigUseCase({} as never)

    remote.getCurrentWindow().reload()
  }

  const variants: Variants = {
    initial: {
      left: '-110vw'
    },
    active: {
      left: 0
    }
  }

  return (
    <motion.div
      initial="initial"
      variants={variants}
      animate={isConfigActive ? 'active' : 'initial'}
      transition={{ duration: 0.8, bounce: false }}
      className="absolute flex justify-between w-screen h-screen"
    >
      <div className="flex flex-col w-8/12 h-screen px-6 py-16 lg:px-16 min-w-max bg-container">
        <img
          src="/images/x.svg"
          width={18}
          height={18}
          className="cursor-pointer"
          onClick={handleExit}
        />

        <div className="flex items-center justify-between w-full mt-10">
          <h2 className="text-4xl font-semibold font-poppins text-title">
            Configurações
          </h2>

          <img
            src="/images/refresh.svg"
            width={18}
            height={18}
            className="cursor-pointer"
            onClick={handleResetToDefault}
          />
        </div>

        <ConfigForm
          defaultValue={config}
          onReset={handleReset}
          onSubmit={handleSubmit}
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={isConfigActive ? { opacity: 1 } : { opacity: 0 }}
        transition={{
          duration: 0.3,
          bounce: false,
          delay: isConfigActive ? 0.4 : 0
        }}
        className="flex flex-row-reverse w-4/12 h-screen bg-black bg-opacity-50"
        onClick={handleExit}
      />
    </motion.div>
  )
}

export default Config
