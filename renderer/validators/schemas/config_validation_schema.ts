import * as Yup from 'yup'

const ConfigValidationSchema = Yup.object().shape({
  water_progress: Yup.object().shape({
    daily_reset_time: Yup.string()
      .required('Digite um tempo válido')
      .length(5, 'Digite um tempo válido')
      .test('datetime', 'Digite um tempo válido', value => {
        if (!value) return false

        const hours = Number(value.substring(0, 2))
        const minutes = Number(value.substring(3))

        if (Number.isNaN(hours) || Number.isNaN(minutes)) return false

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
    seconds_to_drink: Yup.number()
      .required('Preencha esse campo')
      .min(1, 'Digite um número maior que 0')
      .integer('Digite um número inteiro')
      .typeError('Digite um número')
  })
})

export default ConfigValidationSchema
