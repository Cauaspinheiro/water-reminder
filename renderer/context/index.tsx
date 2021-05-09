import React from 'react'

import { AppContextProvider } from './app'
import { WaterAnalyticsContextProvider } from './water-analytics'
import { WaterProgressContext } from './water-progress'

const GlobalContextProvider: React.FC = ({ children }) => {
  return (
    <AppContextProvider>
      <WaterProgressContext>
        <WaterAnalyticsContextProvider>
          {children}
        </WaterAnalyticsContextProvider>
      </WaterProgressContext>
    </AppContextProvider>
  )
}

export default GlobalContextProvider
