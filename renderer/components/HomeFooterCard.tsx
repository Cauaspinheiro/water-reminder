import { motion, Variants } from 'framer-motion'

export interface HomeFooterCard {
  title: string
  variant: 'hover' | 'infinite'
}

const HomeFooterCard: React.FC<HomeFooterCard> = props => {
  const variants: Variants =
    props.variant === 'hover'
      ? {
          hidden: { borderColor: '#2D3948' },
          visible: { borderColor: '#2D3948' },
          onHover: { borderColor: '#0094FF' }
        }
      : {
          hidden: { borderColor: '#2D3948' },
          visible: { borderColor: '#0094FF' }
        }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      whileHover="onHover"
      transition={{
        duration: props.variant === 'infinite' ? 2 : 0.8,
        repeat: props.variant === 'infinite' ? Infinity : undefined,
        repeatType: 'reverse'
      }}
      variants={variants}
      className="flex flex-col items-center justify-between w-full h-full px-6 pt-6 pb-4 border-2 max-h-60 md:px-8 md:pt-8 md:pb-6 rounded-3xl bg-container"
    >
      <h3 className="text-2xl text-center text-title">{props.title}</h3>
      {props.children}
    </motion.div>
  )
}

export default HomeFooterCard
