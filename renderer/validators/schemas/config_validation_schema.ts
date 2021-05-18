import * as Yup from 'yup'

import { timeToObject } from '../../utils/time_seconds_transform'

const ConfigValidationSchema = Yup.object().shape({
  water_progress: Yup.object().shape({
    daily_reset_time: Yup.string()
      .required('Digite um tempo válido')
      .length(5, 'Digite um tempo válido')
      .test('datetime', 'Digite um tempo válido', value => {
        if (!value) return false

        const { left: hours, right: minutes } = timeToObject(value)

        if (Number.isNaN(hours)) return false
        if (Number(hours) > 24) return false

        if (Number.isNaN(minutes)) return false
        if (Number(minutes) > 60) return false

        return true
      }),
    meta: Yup.number()
      .required('Preencha esse campo')
      .min(1, 'Digite um número maior que 0')
      .integer('Digite um número inteiro')
      .typeError('Digite um número'),
    quant_water_on_drink: Yup.number()
      .required('Preencha esse campo')
      .min(1, 'Digite um número maior que 0')
      .integer('Digite um número inteiro')
      .typeError('Digite um número'),
    seconds_to_drink: Yup.number(),
    drink_time: Yup.string()
      .required('Digite um tempo válido')
      .length(5, 'Digite um tempo válido')
      .test('datetime', 'Digite um tempo válido', value => {
        if (!value) return false

        const { left: minutes, right: seconds } = timeToObject(value)

        if (Number.isNaN(minutes)) return false
        if (Number(minutes) > 60) return false

        if (Number.isNaN(seconds)) return false

        return true
      })
  })
})

export default ConfigValidationSchema
