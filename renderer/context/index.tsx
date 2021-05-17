import React from 'react'

import { AppContextProvider } from './app'
import { WaterAnalyticsContextProvider } from './WaterAnalytics'
import { WaterProgressContext } from './WaterProgress'

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
