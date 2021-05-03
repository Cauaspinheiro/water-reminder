import React from 'react'

import { WaterAnalyticsContextProvider } from './water-analytics'
import { WaterProgressContext } from './water-progress'

const AppProvider: React.FC = ({ children }) => {
  return (
    <WaterProgressContext>
      <WaterAnalyticsContextProvider>{children}</WaterAnalyticsContextProvider>
    </WaterProgressContext>
  )
}

export default AppProvider
