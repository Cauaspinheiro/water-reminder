declare interface ConfigSchema {
  water_progress: {
    seconds_to_drink: number
    meta: number
    quant_water_on_drink: number
    daily_reset_time: string
  }
  general_config: {
    startup: boolean
    hide_tray: boolean
  }
}
