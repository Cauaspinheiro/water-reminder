export function toLiter(ml: number): number {
  return ml / 1000
}

export function toFormattedLiters(ml: number): string {
  return toLiter(ml).toFixed(2)
}

export function toMilliliters(liter: number): number {
  return Math.round(liter * 1000)
}
