import { FC, Fragment } from 'react'

import type { AppProps } from 'next/app'

import '../styles/globals.css'

const App: FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
    <Fragment>
      <Component {...pageProps} />
    </Fragment>
  )
}

export default App
