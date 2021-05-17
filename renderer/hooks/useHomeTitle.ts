import { useWaterProgressContext } from '../context/WaterProgress'

export default function useHomeTitle(): string {
  const { percent } = useWaterProgressContext()

  if (percent < 10) return 'Vamos começar a beber água...'
  if (percent < 50) return 'Continue bebendo água!'
  if (percent < 75) return 'Você está indo bem, não pare!'
  if (percent < 100) return 'Estamos quase lá!'

  return 'Um dia hidratado, bom trabalho!'
}
