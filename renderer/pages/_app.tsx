import { FC } from 'react'

import type { AppProps } from 'next/app'

import '../styles/globals.css'
import { WaterContextProvider } from '../context/water'

const App: FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
    <WaterContextProvider>
      <Component {...pageProps} />
    </WaterContextProvider>
  )
}

export default App
