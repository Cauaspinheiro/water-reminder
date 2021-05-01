export interface HomeFooterCard {
  title: string
}

const HomeFooterCard: React.FC<HomeFooterCard> = props => {
  return (
    <div
      className="flex flex-col items-center justify-between flex-1 h-full p-8 rounded-3xl bg-container"
    >
      <h3 className="text-2xl text-title">{props.title}</h3>
      {props.children}
    </div>
  )
}

export default HomeFooterCard
