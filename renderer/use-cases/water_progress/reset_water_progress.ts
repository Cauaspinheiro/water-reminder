import waterProgressStore from "../../store/water-progress-store";

export default function ResetWaterProgress() : void{
  return waterProgressStore.set('water_progress', 0)
}
