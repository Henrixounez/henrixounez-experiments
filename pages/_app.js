import Head from 'next/head';
import { Global } from '@emotion/react';
import xw from 'xwind';

import '../styles/base.css';
import '../styles/global.css';
import { checkDark } from '../components/dark_fn';

function App({ Component, pageProps }) {
  if (typeof window !== "undefined")
    checkDark();

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