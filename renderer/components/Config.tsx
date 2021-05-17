import { FC, FormEvent, useState } from 'react'

import { remote } from 'electron'
import { motion, Variants } from 'framer-motion'

import { useAppContext } from '../context/app'
import styles from '../styles/components/config.module.css'
import GetConfig from '../use-cases/get_config'
import SetConfigUseCase from '../use-cases/set_config'
import objectValuesAreEqual from '../utils/object_values_are_equal'
import { minutesTimeToSeconds } from '../utils/time_seconds_transform'
import ConfigForm, { ConfigFormData } from './ConfigForm'

const Config: FC = () => {
  const { isConfigActive, toggleDrawer } = useAppContext()

  const [config, setConfig] = useState(GetConfig())

  const handleSubmit = async (data: ConfigFormData) => {
    const secondsToDrink = minutesTimeToSeconds(data.water_progress.drink_time)

    const formattedData = {
      ...data,
      water_progress: {
        ...data.water_progress,
        seconds_to_drink: secondsToDrink,
        drink_time: undefined
      }
    }

    if (
      objectValuesAreEqual(
        formattedData.general_config,
        config.general_config
      ) &&
      objectValuesAreEqual(formattedData.water_progress, config.water_progress)
    ) {
      return toggleDrawer()
    }

    const isConfirmed = confirm('Salvar configurações?')

    if (!isConfirmed) return

    SetConfigUseCase(formattedData)

    remote.getCurrentWindow().reload()
  }

  const handleReset = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setConfig(GetConfig())

    console.log(config.water_progress.quant_water_on_drink)

    toggleDrawer()
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
          onClick={toggleDrawer}
        />

        <div className="flex items-center justify-between w-full mt-10">
          <h2 className="text-4xl font-semibold font-poppins text-title">
            Configurações
          </h2>

          <img
            src="/images/refresh.svg"
            width={18}
            height={18}
            className={`${styles.reset_default} transition-transform duration-500 transform cursor-pointer`}
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
        onClick={toggleDrawer}
      />
    </motion.div>
  )
}

export default Config
