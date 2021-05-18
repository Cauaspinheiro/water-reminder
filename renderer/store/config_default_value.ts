const ConfigDefaultValue: ConfigSchema = {
  water_progress: {
    seconds_to_drink: 5 * 60,
    meta: 2000,
    quant_water_on_drink: 150,
    daily_reset_time: '00:00'
  },
  general_config: {
    startup: true,
    hide_tray: true
  }
}

export default ConfigDefaultValue
