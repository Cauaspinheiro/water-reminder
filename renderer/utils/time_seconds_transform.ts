import getTwoDigitsNumber from './get_two_digits_number'

export interface TimeData {
  left: string
  right: string
}

export function secondsToObject(value: number): TimeData {
  const left = getTwoDigitsNumber(Math.floor(value / 60))
  const right = getTwoDigitsNumber(value % 60)

  return { left, right }
}

export function secondsToTime(value: number): string {
  const { left, right } = secondsToObject(value)

  return `${left}:${right}`
}

export function timeToObject(value: string): TimeData {
  const left = getTwoDigitsNumber(Number(value.substring(0, 2)))
  const right = getTwoDigitsNumber(Number(value.substring(3)))

  return { left, right }
}

export function minutesTimeToSeconds(value: string): number {
  const { left, right } = timeToObject(value)

  return Number(left) * 60 + Number(right)
}
