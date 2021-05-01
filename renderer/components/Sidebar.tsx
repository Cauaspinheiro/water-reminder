import { useWaterContext } from '../context/water'

const Sidebar: React.FC = () => {
  const { totalWater } = useWaterContext()

  return (
    <aside className="flex flex-col justify-between h-full my-16 mr-32 ">
      <img src="/images/sidebar-logo.png" width="160" height="102" />

      <div className="flex flex-col px-8 py-14 w-72 bg-container rounded-3xl gap-y-10">
        <h3 className="text-4xl text-title">Sua média</h3>

        <div className="flex flex-col gap-4">
          <div>
            <h4 className="text-2xl text-title">Diária</h4>
            <span className="text-lg text-content">{totalWater}ml</span>
          </div>

          <div>
            <h4 className="text-2xl text-title">Semanal</h4>
            <span className="text-lg text-content">{totalWater}ml</span>
          </div>
        </div>

        <div>
          <h3 className="mb-1 text-4xl text-title">Seu Total</h3>
          <span className="text-2xl text-content">{totalWater}ml</span>
        </div>
      </div>

      <div className="flex items-center justify-around w-full px-5 py-9 rounded-3xl bg-container">
        <img src="/images/config.svg" />

        <h3 className="text-2xl text-title">Configurações</h3>
      </div>
    </aside>
  )
}

export default Sidebar
