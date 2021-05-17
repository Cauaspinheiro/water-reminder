export default function getTwoDigitsNumber(number: number): string {
  if (number >= 10) return String(number)

  return `0${number}`
}
