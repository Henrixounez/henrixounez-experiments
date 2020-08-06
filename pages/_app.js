import Head from 'next/head';
import Router from 'next/router';
import withGA from 'next-ga';
import '../styles/base.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Tailwindcss Emotion Example</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default (process.env.NODE_ENV === 'development') ? MyApp : withGA('UA-174263363-1', Router)(MyApp);