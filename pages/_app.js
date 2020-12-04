import Head from 'next/head';
import { Global } from '@emotion/react';
import xw from 'xwind';

import '../styles/base.css';

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Tailwindcss Emotion Example</title>
      </Head>
      <Global styles={xw`XWIND_BASE XWIND_GLOBAL`}/>
      <Component {...pageProps} />
    </>
  )
}

export default App;