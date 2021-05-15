import React, { useRef } from 'react'

import { FormHandles, Scope } from '@unform/core'
import { Form } from '@unform/web'

import { ConfigSchema } from '../store/config-store'
import Input from './Input'

export interface ConfigFormProps {
  defaultValue: ConfigSchema
  onSubmit(config: ConfigSchema): void
  onReset(): void
}

const ConfigForm: React.FC<ConfigFormProps> = props => {
  const formRef = useRef<FormHandles>(null)

  return (
    <Form
      ref={formRef}
      className="flex flex-col w-full mt-20 gap-y-10"
      onSubmit={props.onSubmit}
      onReset={props.onReset}
      initialData={props.defaultValue}
    >
      <Scope path="water_progress">
        <div className="flex justify-between w-full gap-x-16">
          <Input label="Quanto quer beber? (ml)" name="quant_water_on_drink" />
          <Input label="Meta diária (ml)" name="meta" />
        </div>

        <div className="flex justify-between w-full gap-x-16">
          <Input
            label="Tempo da notificação (segundos)"
            name="seconds_to_drink"
          />
          <Input label="Tempo da reinicialização" name="daily_reset_time" />
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
