import Head from 'next/head'
import { css } from '@emotion/css'
import tw from '@tailwindcssinjs/macro'
import Header from './header';

const Layout = ({children, title, showPage}) => (
  <div>
    <Head>
      <title>{title} | Henrixounez</title>
      <meta name="Description" content={title}/>
      <meta name="google-site-verification" content="Xe9o0Xjf5IsRK8YWvMyPyo8PdvqRNXTCJXHy1A9obPM" />
    </Head>
    <Header title={title} showPage={showPage}/>
    <main className={css(tw`py-20 flex flex-col justify-center items-center max-w-full`)}>
      {children}
    </main>
  </div>
)
export default Layout;