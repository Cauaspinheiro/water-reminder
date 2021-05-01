import { FC } from 'react'

import type { AppProps } from 'next/app'

import '../styles/globals.css'
import AppProvider from '../context'

const App: FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  )
}

export default App
