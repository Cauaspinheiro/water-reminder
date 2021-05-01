import React from 'react'

import { WaterProgressContext } from './water-progress'

const AppProvider: React.FC = ({ children }) => {
  return <WaterProgressContext>{children}</WaterProgressContext>
}

export default AppProvider
