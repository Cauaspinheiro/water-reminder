import React, { FormEvent, useCallback, useRef } from 'react'

import { FormHandles, Scope } from '@unform/core'
import { Form } from '@unform/web'

import { ConfigSchema } from '../store/config-store'
import { secondsToTime } from '../utils/time_seconds_transform'
import validateSchema from '../validators/config_validator'
import ConfigValidationSchema from '../validators/schemas/config_validation_schema'
import UnformValidationError from '../validators/unform_validation_error'
import Input from './Input'
import SwitchInput from './switch_input'
import TimeInput from './time_input'

export interface ConfigFormProps {
  defaultValue: ConfigSchema
  onSubmit(config: ConfigSchema): void
  onReset(e: FormEvent<HTMLFormElement>): void
}

export type ConfigFormData = ConfigSchema & {
  water_progress: {
    drink_time: string
  }
}

const ConfigForm: React.FC<ConfigFormProps> = props => {
  const formRef = useRef<FormHandles>(null)

  const handleSubmit = useCallback(
    async (data: ConfigFormData) => {
      try {
        formRef.current?.setErrors({})

        const validatedData = await validateSchema(ConfigValidationSchema, data)

        props.onSubmit(validatedData)
      } catch (error) {
        if (error instanceof UnformValidationError) {
          return formRef.current?.setErrors(error.validationErrors)
        }

        return alert(error)
      }
    },
    [props]
  )

  const getInitialDataWithDrinkTime = () => {
    return {
      ...props.defaultValue,
      water_progress: {
        ...props.defaultValue.water_progress,
        drink_time: secondsToTime(
          props.defaultValue.water_progress.seconds_to_drink
        )
      }
    }
  }

  return (
    <Form
      ref={formRef}
      className="flex flex-col w-full mt-20 gap-y-8"
      onSubmit={handleSubmit}
      onReset={props.onReset}
      initialData={getInitialDataWithDrinkTime()}
    >
      <Scope path="water_progress">
        <div className="flex justify-between w-full gap-x-8 lg:gap-x-16">
          <Input label="Quanto quer beber? (ml)" name="quant_water_on_drink" />
          <Input label="Meta diária (ml)" name="meta" />
        </div>

        <div className="flex justify-between w-full gap-x-8 lg:gap-x-16">
          <TimeInput label="Tempo da notificação (MM:SS)" name="drink_time" />

          <TimeInput
            label="Tempo da reinicialização (HH:MM)"
            name="daily_reset_time"
          />
        </div>
      </Scope>

      <Scope path="general_config">
        <div className="flex w-full gap-x-6 lg:gap-x-11">
          <SwitchInput label="Iniciar com o computador" name="startup" />
          <SwitchInput label="Rodar em segundo plano" name="hide_tray" />
        </div>
      </Scope>

      <div className="flex w-full h-16 mt-8 gap-x-4">
        <button
          type="submit"
          className="h-full text-xl font-bold text-white transition-shadow shadow-none focus:outline-none w-44 bg-gradient rounded-2xl font-poppins hover:shadow-2xl"
        >
          Salvar
        </button>
        <button
          type="reset"
          className="h-full text-xl font-bold text-white transition-shadow shadow-none focus:outline-none w-44 bg-cancel-gradient rounded-2xl font-poppins hover:shadow-2xl"
        >
          Descartar
        </button>
      </div>
    </Form>
  )
}

export default ConfigForm
