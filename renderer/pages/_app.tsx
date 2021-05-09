import { FC } from 'react'

import type { AppProps } from 'next/app'

import '../styles/globals.css'
import GlobalContextProvider from '../context'

const App: FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
    <GlobalContextProvider>
      <Component {...pageProps} />
    </GlobalContextProvider>
  )
}

export default App
