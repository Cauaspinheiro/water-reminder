import { FC, FormEvent, useState } from 'react'

import { remote } from 'electron'
import { motion, Variants } from 'framer-motion'

import { useAppContext } from '../context/app'
import GetConfig from '../use-cases/get_config'
import SetConfigUseCase from '../use-cases/set_config'
import Input from './Input'

const Config: FC = () => {
  const { isConfigActive, toggleDrawer } = useAppContext()

  const [config, setConfig] = useState(GetConfig())

  const [isConfigChanged, setIsConfigChanged] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    SetConfigUseCase(config)

    remote.getCurrentWindow().reload()
  }

  const handleReset = (e: FormEvent) => {
    e.preventDefault()

    setConfig(GetConfig())
    setIsConfigChanged(false)
    toggleDrawer()
  }

  const handleChangeWaterProgressInput = (
    name: string,
    value: string | number
  ) => {
    if (!value) return

    setConfig(pastConfig => ({
      ...pastConfig,
      water_progress: { ...pastConfig.water_progress, [name]: value }
    }))
    setIsConfigChanged(true)
  }

  const handleExit = () => {
    if (isConfigChanged) {
      if (confirm('Deseja sair? Você tem alterações não salvas')) {
        setConfig(GetConfig())
        setIsConfigChanged(false)

        return toggleDrawer()
      }

      return
    }

    return toggleDrawer()
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

        <h2 className="mt-10 text-4xl font-semibold font-poppins text-title">
          Configurações
        </h2>

        <form
          className="flex flex-col w-full mt-20 gap-y-10"
          onSubmit={handleSubmit}
          onReset={handleReset}
        >
          <div className="flex justify-between w-full gap-x-16">
            <Input
              label="Quanto quer beber? (ml)"
              name="quant_water_on_drink"
              value={config.water_progress.quant_water_on_drink}
              onChangeText={value =>
                handleChangeWaterProgressInput(
                  'quant_water_on_drink',
                  Number(value)
                )
              }
            />
            <Input
              label="Meta diária (ml)"
              name="meta"
              value={config.water_progress.meta}
              onChangeText={value =>
                handleChangeWaterProgressInput('meta', Number(value))
              }
            />
          </div>

          <div className="flex justify-between w-full gap-x-16">
            <Input
              label="Tempo da notificação (segundos)"
              name="seconds_to_drink"
              value={config.water_progress.seconds_to_drink}
              onChangeText={value =>
                handleChangeWaterProgressInput(
                  'seconds_to_drink',
                  Number(value)
                )
              }
            />
            <Input
              label="Tempo da reinicialização"
              name="daily_reset_time"
              value={config.water_progress.daily_reset_time}
              onChangeText={value =>
                handleChangeWaterProgressInput('daily_reset_time', value)
              }
            />
          </div>

          <div className="flex w-full h-16 mt-8 gap-x-4">
            <button
              type="submit"
              className="h-full text-xl font-bold text-white transition-shadow shadow-none focus:outline-none w-44 bg-gradient rounded-2xl font-poppins hover:shadow-2xl"
            >
              Salvar
            </button>
            <button
              type="reset"
              value=""
              className="h-full text-xl font-bold text-white transition-shadow shadow-none focus:outline-none w-44 bg-cancel-gradient rounded-2xl font-poppins hover:shadow-2xl"
            >
              Descartar
            </button>
          </div>
        </form>
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
